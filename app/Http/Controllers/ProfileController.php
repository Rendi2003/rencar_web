<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Tampilkan form profil user.
     */
    public function edit(Request $request): Response
    {
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
            ],
        ]);
    }

    /**
     * Update data profil user.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $user = $request->user();
        $user->fill($validated);

        // Reset verifikasi email jika email diubah
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Kirim flash status untuk notifikasi sukses
        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Upload dokumen KTP & SIM.
     */
    public function uploadDocuments(Request $request): RedirectResponse
    {
        $request->validate([
            'ktp' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'sim' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = Auth::user();

        if ($request->hasFile('ktp')) {
            if ($user->ktp_path) {
                Storage::disk('public')->delete($user->ktp_path);
            }
            $path = $request->file('ktp')->store('documents', 'public');
            $user->ktp_path = $path;
        }

        if ($request->hasFile('sim')) {
            if ($user->sim_path) {
                Storage::disk('public')->delete($user->sim_path);
            }
            $path = $request->file('sim')->store('documents', 'public');
            $user->sim_path = $path;
        }

        $user->verification_status = 'pending';
        $user->save();

        return Redirect::route('profile.edit')->with('status', 'documents-uploaded');
    }

    /**
     * Hapus akun user.
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
