import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

// Helper function
const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

// Feature Icon Mapping
const featureIcons = {
    ac: '❄️',
    gps: '🛰️',
    bluetooth: '🎵',
    usb: '🔌',
    airbag: '🛡️',
};

export default function Show({ auth, car }) {
    const [mainImage, setMainImage] = useState(car.image_urls[0]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail {car.brand} {car.model}</h2>}
        >
            <Head title={`Detail ${car.brand} ${car.model}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Galeri Gambar */}
                            <div>
                                <img src={`/storage/${mainImage}`} alt="Main car view" className="w-full h-80 object-cover rounded-lg shadow-md mb-4" />
                                <div className="flex space-x-2">
                                    {car.image_urls.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`/storage/${image}`}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === image ? 'border-indigo-500' : 'border-transparent'}`}
                                            onClick={() => setMainImage(image)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Detail Mobil dan Aksi */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{car.brand} {car.model}</h1>
                                    <p className="text-lg text-gray-600 mb-4">Tahun {car.year}</p>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-2">Deskripsi</h3>
                                        <p className="text-gray-700">{car.description}</p>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-2">Fitur Utama</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {car.features && Object.entries(car.features).map(([key, value]) => (
                                                value && (
                                                    <span key={key} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                                                        {featureIcons[key] || '✔️'} <span className="ml-2 capitalize">{key.replace('_', ' ')}</span>
                                                    </span>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-3xl font-bold text-indigo-600 mb-4">{formatCurrency(car.price_per_day)} / hari</p>
                                    {/* GANTI NAMA ROUTE DI BAWAH INI */}
                                    <Link
                                        href={route('booking.create', car.id)}
                                        className="block text-center w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
                                    >
                                        Pesan Sekarang
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}