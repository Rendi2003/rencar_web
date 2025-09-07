<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Menampilkan halaman utama untuk penyewa dengan daftar mobil yang tersedia.
     */
    public function index()
    {
        $cars = Car::where('status', 'available')->latest()->get();
        return Inertia::render('Home', [
            'cars' => $cars,
        ]);
    }

    /**
     * Menampilkan halaman detail untuk satu mobil.
     */
    public function show(Car $car)
    {
        return Inertia::render('Car/Show', [
            'car' => $car
        ]);
    }
}