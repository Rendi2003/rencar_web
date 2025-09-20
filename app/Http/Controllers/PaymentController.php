<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;

class PaymentController extends Controller
{
    /**
     * Menampilkan halaman form pembayaran untuk sebuah booking.
     * Ini yang akan dipanggil oleh rute /payment/create
     */
    public function create(Request $request)
    {
        // 1. Validasi: Pastikan URL memiliki parameter 'booking' yang valid.
        $request->validate([
            'booking' => 'required|integer|exists:bookings,id',
        ]);

        // 2. Ambil data booking, termasuk data mobil dan gambarnya.
        $booking = Booking::with('car.images')->findOrFail($request->query('booking'));

        // 3. Otorisasi: Pastikan hanya pemilik booking yang bisa bayar.
        if ($booking->user_id !== Auth::id()) {
            abort(403, 'AKSES DITOLAK');
        }

        // 4. Render halaman React untuk pembayaran.
        return Inertia::render('Payment/Create', [
            'booking' => $booking
        ]);
    }

    /**
     * Menyimpan data pembayaran dan memperbarui status booking.
     */
    public function store(Request $request)
    {
        // 1. Validasi input dari form pembayaran.
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'payment_method' => 'required|string|in:credit_card,bank_transfer,e_wallet',
        ]);

        $booking = Booking::findOrFail($request->booking_id);

        // 2. Otorisasi: Cek sekali lagi apakah pengguna adalah pemilik booking.
        if ($booking->user_id !== Auth::id()) {
            return Redirect::route('dashboard')->with('error', 'Akses tidak sah.');
        }

        // 3. Buat entri baru di tabel 'payments'.
        Payment::create([
            'booking_id' => $booking->id,
            'amount' => $booking->total_price,
            'payment_method' => $request->payment_method,
            'status' => 'success', // Asumsikan pembayaran langsung berhasil
            'paid_at' => Carbon::now(),
        ]);

        // 4. Update status booking menjadi 'confirmed' atau 'paid'.
        $booking->update(['status' => 'confirmed']);

        // 5. Arahkan pengguna ke halaman detail booking dengan pesan sukses.
        return Redirect::route('bookings.show', $booking->id)->with('success', 'Pembayaran berhasil dikonfirmasi!');
    }
    public function methods($id)
{
    $booking = Booking::with('car')->findOrFail($id);

    // Daftar metode pembayaran bisa hardcode atau ambil dari DB
    $methods = [
        ['name' => 'Transfer Bank', 'code' => 'bank_transfer'],
        ['name' => 'E-Wallet (OVO, Gopay, Dana)', 'code' => 'ewallet'],
        ['name' => 'Virtual Account', 'code' => 'va'],
        ['name' => 'Kartu Kredit/Debit', 'code' => 'credit_card'],
        ['name' => 'Bayar di Tempat', 'code' => 'cod'],
    ];

    return Inertia::render('Payment/Methods', [
        'booking' => $booking,
        'methods' => $methods,
    ]);
}

}
