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
            ->with('car')
            ->latest()
            ->paginate(10);

        return Inertia::render('Booking/Index', [
            'bookings' => $bookings
        ]);
    }

    public function create(Car $car)
    {
        $futureBookings = Booking::where('car_id', $car->id)
            ->where('status', '!=', 'cancelled')
            ->get(['start_date', 'end_date'])
            ->map(function ($b) {
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

        $numberOfDays = $startDate->diffInDays($endDate) + 1;
        $totalPrice = $numberOfDays * $car->price_per_day;

        Booking::create([
            'user_id' => Auth::id(),
            'car_id' => $car->id,
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        return Redirect::route('bookings.index')->with('success', 'Pemesanan berhasil dibuat dan menunggu konfirmasi.');
    }

    public function show(Booking $booking)
    {
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }

        $booking->load('car');

        return Inertia::render('Booking/Show', [
            'booking' => $booking
        ]);
    }

    public function payment($id)
    {
        $booking = Booking::with('car')->findOrFail($id);

        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Booking/Payment', [
            'booking' => $booking,
            'whatsapp_number' => '+6281215991314', // Ganti dengan nomor WA admin
        ]);
    }
}
