<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage; // Penting untuk mengelola file
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        // Kita tambahkan data profil tambahan untuk dikirim ke frontend
        $user = $request->user();

        return Inertia::render('Profile/Edit', [
            'status' => session('status'),
            'profileData' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
                'ktp_path' => $user->ktp_path ? Storage::url($user->ktp_path) : null,
                'sim_path' => $user->sim_path ? Storage::url($user->sim_path) : null,
                'verification_status' => $user->verification_status,
            ]
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        // Validasi data yang masuk
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $user = $request->user();
        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Handle document uploads.
     */
    public function uploadDocuments(Request $request): RedirectResponse
    {
        $request->validate([
            'ktp' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Maks 2MB
            'sim' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Maks 2MB
        ]);

        $user = Auth::user();

        if ($request->hasFile('ktp')) {
            // Hapus file lama jika ada
            if ($user->ktp_path) {
                Storage::disk('public')->delete($user->ktp_path);
            }
            $path = $request->file('ktp')->store('documents', 'public');
            $user->ktp_path = $path;
        }

        if ($request->hasFile('sim')) {
            // Hapus file lama jika ada
            if ($user->sim_path) {
                Storage::disk('public')->delete($user->sim_path);
            }
            $path = $request->file('sim')->store('documents', 'public');
            $user->sim_path = $path;
        }
        
        // Ubah status verifikasi menjadi pending setelah upload
        $user->verification_status = 'pending';
        $user->save();

        return Redirect::route('profile.edit')->with('status', 'documents-uploaded');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}