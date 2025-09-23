@extends('layouts.app')

@section('content')
<div class="max-w-3xl mx-auto mt-10">
    @if(session('success'))
        <div class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {{ session('success') }}
        </div>
    @endif

    <div class="bg-white shadow rounded-xl p-6">
        <div class="flex items-center space-x-6">
            <img src="{{ $user->profile_photo ? asset('storage/'.$user->profile_photo) : asset('images/default-avatar.png') }}" 
                 class="w-24 h-24 rounded-full border-2 border-gray-200 shadow" 
                 alt="Profile Picture">

            <div>
                <h2 class="text-2xl font-semibold text-gray-800">{{ $user->name }}</h2>
                <p class="text-gray-500">{{ $user->email }}</p>
                <span class="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                    {{ ucfirst($user->role ?? 'User') }}
                </span>
            </div>
        </div>

        <div class="mt-6 border-t pt-4 grid grid-cols-2 gap-6 text-gray-700">
            <div>
                <h3 class="text-sm text-gray-500">No. HP</h3>
                <p class="font-medium">{{ $user->phone ?? '-' }}</p>
            </div>
            <div>
                <h3 class="text-sm text-gray-500">Alamat</h3>
                <p class="font-medium">{{ $user->address ?? '-' }}</p>
            </div>
            <div>
                <h3 class="text-sm text-gray-500">Tanggal Bergabung</h3>
                <p class="font-medium">{{ $user->created_at->format('d M Y') }}</p>
            </div>
        </div>

        <div class="mt-6 flex justify-end">
            <a href="{{ route('profile.edit') }}" 
               class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit Profil
            </a>
        </div>
    </div>
</div>
@endsection
