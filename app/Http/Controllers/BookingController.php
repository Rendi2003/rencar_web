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
    /**
     * Menampilkan halaman form pemesanan.
     */
    public function create(\App\Models\Car $car)
    {
        // Ambil booking mendatang untuk mobil ini (kecuali yang dibatalkan)
        $futureBookings = Booking::where('car_id', $car->id)
            ->where('status', '!=', 'cancelled')
            ->get(['start_date', 'end_date'])
            ->map(function ($b) {
                // Pastikan format yang dikirim ke frontend mudah dipakai DatePicker
                return [
                    'start_date' => \Carbon\Carbon::parse($b->start_date)->toDateString(),
                    'end_date'   => \Carbon\Carbon::parse($b->end_date)->toDateString(),
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

        // Arahkan ke halaman "My Bookings" (akan kita buat nanti)
        return Redirect::route('home')->with('success', 'Pemesanan berhasil dibuat dan menunggu konfirmasi.');
    }
}
