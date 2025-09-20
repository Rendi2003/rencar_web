<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Menyimpan dokumen baru yang diunggah oleh pengguna.
     */
    public function store(Request $request)
    {
        $request->validate([
            'document_type' => 'required|in:ktp,sim',
            'document_file' => 'required|file|image|mimes:jpg,jpeg,png|max:2048', // Maks 2MB
        ]);

        $user = Auth::user();
        $type = $request->document_type;

        // Hapus dokumen lama jika ada, agar hanya ada satu per jenis
        if ($user->documents()->where('type', $type)->exists()) {
            $oldDocument = $user->documents()->where('type', $type)->first();
            Storage::disk('public')->delete($oldDocument->path);
            $oldDocument->delete();
        }

        // Simpan file baru
        $path = $request->file('document_file')->store('documents', 'public');

        // Buat record baru di database
        Document::create([
            'user_id' => $user->id,
            'type' => $type,
            'path' => $path,
            'status' => 'pending', // Status awal menunggu verifikasi
        ]);

        return Redirect::route('profile.edit')->with('status', 'document-uploaded');
    }
}