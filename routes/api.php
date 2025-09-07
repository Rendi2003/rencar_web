
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import controllers dari direktori Admin
use App\Http\Controllers\Admin\AuthController;
// use App\Http\Controllers\Admin\CarController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Api\CarController;    // <-- Tambahkan ini
use App\Http\Controllers\Api\BannerController;


/*
|--------------------------------------------------------------------------
| Rute-rute API Publik (Tidak memerlukan autentikasi)
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Route::get('/cars', [CarController::class, 'index']);
// Route::get('/cars/{car}', [CarController::class, 'show']);

// Route untuk data publik (tidak perlu login)
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{car}', [CarController::class, 'show']);
Route::get('/banners', [BannerController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Rute-rute API Terproteksi (Memerlukan autentikasi Sanctum)
|--------------------------------------------------------------------------
| File migrasi 'personal_access_tokens' Anda akan mendukung ini.
|
*/
Route::middleware('auth:sanctum')->group(function () {
    // Rute Otentikasi
    Route::get('/user', [AuthController::class, 'user']);

    // Rute untuk mendapatkan daftar mobil
    Route::get('/cars', [CarController::class, 'index']);

    // Rute untuk mendapatkan detail mobil
    Route::get('/cars/{car}', [CarController::class, 'show']);

    // Rute untuk mendapatkan banner
    Route::get('/banners', [BannerController::class, 'index']);

    // Rute untuk mendapatkan riwayat pesanan (contoh)
    Route::get('/my-bookings', function (Request $request) {
        // Logika untuk mengambil pesanan user
        // Misalnya: return $request->user()->bookings;
    });

    // Rute untuk logout
    Route::post('/logout', [AuthController::class, 'logout']);
});
