import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CarCard from '@/Components/CarCard'; // Kita akan buat komponen ini selanjutnya

export default function Home({ auth, cars }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Mobil Tersedia</h2>}
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {cars.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {cars.map((car) => (
                                        <CarCard key={car.id} car={car} />
                                    ))}
                                </div>
                            ) : (
                                <p>Saat ini tidak ada mobil yang tersedia.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}