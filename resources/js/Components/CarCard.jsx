import React from 'react';
import PrimaryButton from './PrimaryButton';
import { Link } from '@inertiajs/react';

// Fungsi untuk memformat harga ke format Rupiah
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

export default function CarCard({ car }) {
    // HAPUS JSON.parse(). Sekarang car.image_urls sudah menjadi array.
    const imageUrl = car.image_urls && car.image_urls.length > 0
        ? `/storage/${car.image_urls[0]}`
        : 'https://via.placeholder.com/300x200?text=No+Image';

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img className="w-full h-48 object-cover" src={imageUrl} alt={`${car.brand} ${car.model}`} />
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{car.brand} {car.model}</h3>
                <p className="text-sm text-gray-500 mb-2">Tahun {car.year}</p>
                <p className="text-xl font-semibold text-indigo-600 mb-4">
                    {formatCurrency(car.price_per_day)} / hari
                </p>
                <Link href={route('cars.show', car.id)} className="inline-block w-full text-center bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300">
                    Lihat Detail
                </Link>
            </div>
        </div>
    );
}