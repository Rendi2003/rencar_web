<?php

namespace App\Http\Controllers; 

use App\Models\Car;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class BookingController extends Controller
{

    public function index()
    {
        $bookings = Booking::where('user_id', Auth::id())
            ->with('car') // Mengambil relasi data mobil
            ->latest()    // Urutkan dari yang terbaru
            ->paginate(10); // Gunakan paginasi

        return Inertia::render('Booking/Index', [
            'bookings' => $bookings
        ]);
    }
    public function methods($id)
{
    $booking = Booking::with('car')->findOrFail($id);

    // Daftar metode pembayaran
    $methods = [
        ['name' => 'Transfer Bank (BCA)', 'code' => 'bank_bca'],
        ['name' => 'Transfer Bank (BRI)', 'code' => 'bank_bri'],
        ['name' => 'Transfer Bank (BNI)', 'code' => 'bank_bni'],
        ['name' => 'Transfer Bank (Mandiri)', 'code' => 'bank_mandiri'],
        ['name' => 'Dompet Elektronik (OVO, Gopay, Dana)', 'code' => 'ewallet'],
        ['name' => 'Akun Virtual', 'code' => 'va'],
        ['name' => 'Kartu Kredit/Debit', 'code' => 'credit_card'],
        ['name' => 'Bayar di Tempat', 'code' => 'cod'],
        ['name' => 'Bayar via WhatsApp', 'code' => 'whatsapp'],
    ];

    return Inertia::render('Methods', [
        'booking' => $booking,
        'methods' => $methods,
    ]);
}


    /**
     * Menampilkan halaman form pemesanan.
     */
    public function create(Car $car)
    {
        // Ambil booking mendatang untuk mobil ini (kecuali yang dibatalkan)
        $futureBookings = Booking::where('car_id', $car->id)
            ->where('status', '!=', 'cancelled')
            ->get(['start_date', 'end_date'])
            ->map(function ($b) {
                // Pastikan format yang dikirim ke frontend mudah dipakai DatePicker
                return [
                    'start_date' => Carbon::parse($b->start_date)->toDateString(),
                    'end_date'   => Carbon::parse($b->end_date)->toDateString(),
                ];
            })->values();

        return Inertia::render('Booking/Create', [
            'car' => $car,
            'futureBookings' => $futureBookings,
        ]);
    }

    /**
     * Menyimpan data pemesanan baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $car = Car::findOrFail($request->car_id);
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);

        // Validasi ketersediaan mobil
        $isBooked = Booking::where('car_id', $car->id)
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('start_date', [$startDate, $endDate])
                    ->orWhereBetween('end_date', [$startDate, $endDate])
                    ->orWhere(function ($query) use ($startDate, $endDate) {
                        $query->where('start_date', '<', $startDate)
                            ->where('end_date', '>', $endDate);
                    });
            })->exists();

        if ($isBooked) {
            return Redirect::back()->withErrors(['date' => 'Mobil tidak tersedia pada rentang tanggal yang dipilih.']);
        }

        // Hitung total harga
        $numberOfDays = $startDate->diffInDays($endDate) + 1;
        $totalPrice = $numberOfDays * $car->price_per_day;

        // Buat booking baru
        Booking::create([
            'user_id' => Auth::id(),
            'car_id' => $car->id,
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'total_price' => $totalPrice,
            'status' => 'pending', // Status awal adalah pending
        ]);

        // Arahkan ke halaman "My Bookings"
        return Redirect::route('bookings.index')->with('success', 'Pemesanan berhasil dibuat dan menunggu konfirmasi.');
    }

    /**
     * Menampilkan detail spesifik dari sebuah pesanan.
     */
    public function show(Booking $booking)
    {
        // Pastikan pengguna hanya bisa melihat booking miliknya sendiri
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }

        // Load relasi car agar datanya tersedia di frontend
        $booking->load('car');

        return Inertia::render('Booking/Show', [
            'booking' => $booking
        ]);
    }
    public function payment($id)
{
    $booking = Booking::findOrFail($id);
    return Inertia::render('Booking/Payment', [
        'booking' => $booking,
    ]);
}
public function chooseMethod(Request $request, $id)
{
    $request->validate([
        'method' => 'required|string',
    ]);

    $booking = Booking::findOrFail($id);

    // pastikan hanya pemilik booking yang bisa update
    if ($booking->user_id !== Auth::id()) {
        abort(403);
    }

    // update metode pembayaran
    $booking->update([
        'payment_method' => $request->method,
        'status' => 'waiting_payment',
    ]);

    // redirect ke halaman detail booking (atau bisa ke halaman instruksi pembayaran)
    return Redirect::route('bookings.show', $booking->id)
        ->with('success', 'Metode pembayaran berhasil dipilih.');
}


}