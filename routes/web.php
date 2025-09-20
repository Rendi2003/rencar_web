<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Controllers (public)
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;

// Controllers (admin)
use App\Http\Controllers\Admin\CarController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\VerificationController;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SettingController;

// API controllers
use App\Http\Controllers\Api\BookingController as ApiBookingController;
use App\Http\Controllers\Api\PaymentController as ApiPaymentController;

use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Semua rute yang membutuhkan autentikasi
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard / Profile
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ... (Rute Admin tidak diubah) ...
    Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
        // Users & Cars (admin)
        Route::resource('users', UserController::class)->except(['create', 'edit', 'show']);
        Route::resource('cars', CarController::class)->except(['show']);
        Route::post('cars/bulk-update-status', [CarController::class, 'bulkUpdateStatus'])->name('cars.bulkUpdateStatus');
        Route::post('bookings/bulk-update-status', [AdminBookingController::class, 'bulkUpdateStatus'])->name('bookings.bulkUpdateStatus');
        Route::resource('bookings', AdminBookingController::class);
        Route::get('payments', [PaymentController::class, 'index'])->name('payments.index');
        Route::put('payments/{payment}', [PaymentController::class, 'update'])->name('payments.update');
        Route::get('verifications', [VerificationController::class, 'index'])->name('verifications.index');
        Route::put('verifications/documents/{document}', [VerificationController::class, 'updateDocumentStatus'])->name('verifications.document.update');
        Route::get('content', [ContentController::class, 'index'])->name('content.index');
        Route::post('content/promotions', [ContentController::class, 'storePromotion'])->name('content.promotions.store');
        Route::put('content/promotions/{promotion}', [ContentController::class, 'updatePromotion'])->name('content.promotions.update');
        Route::delete('content/promotions/{promotion}', [ContentController::class, 'destroyPromotion'])->name('content.promotions.destroy');
        Route::post('content/banners', [ContentController::class, 'storeBanner'])->name('content.banners.store');
        Route::post('content/banners/{banner}', [ContentController::class, 'updateBanner'])->name('content.banners.update');
        Route::delete('content/banners/{banner}', [ContentController::class, 'destroyBanner'])->name('content.banners.destroy');
        Route::put('content/banners/{banner}/status', [ContentController::class, 'updateBannerStatus'])->name('content.banners.updateStatus');
        Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
        Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
        Route::put('settings/password', [SettingController::class, 'changePassword'])->name('settings.change_password');
    });

    // -----------------------
    // Rute Publik / User (di luar admin)
    // -----------------------
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    // Daftar & detail mobil untuk user/public
    Route::get('/cars', [HomeController::class, 'index'])->name('cars.index');
    Route::get('/cars/{car}', [HomeController::class, 'show'])->name('cars.show');

    // Booking (publik/penyewa)
    // === KODE YANG DIPERBAIKI ADA DI SINI ===
    Route::get('/my-bookings', [BookingController::class, 'index'])->name('booking.index');
    Route::get('/cars/{car}/book', [BookingController::class, 'create'])->name('booking.create');
    Route::post('/bookings', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');

    // Pastikan nama route ini adalah 'booking.show' (tunggal)
    Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('booking.show');
    Route::get('/bookings/{id}/payment', [BookingController::class, 'payment'])
    ->name('bookings.payment');
    Route::get('/bookings/{id}/payment/methods', [PaymentController::class, 'methods'])->name('payment.methods');
    Route::get('/bookings/{id}/methods', [BookingController::class, 'methods'])->name('bookings.methods');
    Route::post('/bookings/{id}/choose-method', [BookingController::class, 'chooseMethod'])
    ->name('bookings.chooseMethod');
    




    
    // === AKHIR DARI KODE YANG DIPERBAIKI ===
});

// Memuat rute-rute otentikasi standar dari Laravel
require __DIR__ . '/auth.php';