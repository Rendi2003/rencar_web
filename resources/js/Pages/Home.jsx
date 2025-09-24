import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CarCard from '@/Components/CarCard';

export default function Home({ auth, cars }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Mobil Tersedia
                </h2>
            }
        >
            <Head title="Home" />

            {/* Background hijau full + ornamen */}
            <div className="min-h-screen bg-green-600 relative">
                <div className="absolute top-10 left-10 w-40 h-40 bg-green-500 rounded-full opacity-30"></div>
                <div className="absolute bottom-20 right-20 w-52 h-52 bg-green-700 rounded-full opacity-40"></div>
                <div className="absolute top-1/3 right-0 w-1/2 h-64 bg-green-500 opacity-20 transform rotate-12"></div>

                {/* Konten */}
                <div className="py-12 relative z-10">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {cars.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cars.map((car) => (
                                    <div
                                        key={car.id}
                                        className="bg-white rounded-xl shadow-lg p-4"
                                    >
                                        <CarCard car={car} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-white text-center">
                                Saat ini tidak ada mobil yang tersedia.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
