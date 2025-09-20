import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

// Komponen kecil untuk badge status
const StatusBadge = ({ status }) => {
    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

export default function Index({ auth, bookings }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Bookings</h2>}
        >
            <Head title="My Bookings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {bookings.data.length > 0 ? (
                                <div className="space-y-4">
                                    {bookings.data.map((booking) => (
                                        <div key={booking.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={booking.car && booking.car.image_urls ? `/storage/${booking.car.image_urls[0]}` : 'https://via.placeholder.com/150'}
                                                    alt={booking.car ? booking.car.brand : 'Mobil'}
                                                    className="w-24 h-16 object-cover rounded-md hidden sm:block"
                                                />
                                                <div>
                                                    <h3 className="font-bold text-lg">{booking.car ? `${booking.car.brand} ${booking.car.model}`: 'Data Mobil Dihapus'}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {format(new Date(booking.start_date), 'dd MMM yyyy')} - {format(new Date(booking.end_date), 'dd MMM yyyy')}
                                                    </p>
                                                    <p className="font-semibold mt-1">{formatCurrency(booking.total_price)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 md:mt-0">
                                                <StatusBadge status={booking.status} />

                                                {/* === KODE YANG DIPERBAIKI ADA DI SINI === */}
                                                <Link href={route('booking.show', booking.id)} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                                                    Lihat Detail
                                                 </Link>
                                                {/* === AKHIR DARI KODE YANG DIPERBAIKI === */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Anda belum memiliki pesanan.</p>
                            )}

                            {/* Tambahkan Paginasi jika ada */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}