import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const StatusBadge = ({ status }) => {
    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        active: 'bg-indigo-100 text-indigo-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

export default function Show({ auth, booking }) {
    const { car } = booking;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route('bookings.index')} className="text-indigo-600 hover:text-indigo-900 mr-2">
                        &larr; Kembali
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail Pesanan #{booking.id}
                    </h2>
                </div>
            }
        >
            <Head title={`Detail Pesanan #${booking.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Kolom Kiri - Detail Mobil */}
                    <div className="md:col-span-2 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Mobil</h3>

                            {/* === KODE YANG DIPERBAIKI ADA DI SINI === */}
                            {car.image_urls && car.image_urls.length > 0 ? (
                                <img
                                    src={`/storage/${car.image_urls[0]}`}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-gray-500">Tidak ada gambar</span>
                                </div>
                            )}
                            {/* === AKHIR DARI KODE YANG DIPERBAIKI === */}

                            <h4 className="text-xl font-bold">{car.brand} {car.model}</h4>
                            <p className="text-sm text-gray-500 mb-4">{car.year}</p>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                <p><strong>Tipe:</strong> {car.type}</p>
                                <p><strong>Transmisi:</strong> {car.transmission}</p>
                                <p><strong>Kapasitas:</strong> {car.capacity} orang</p>
                                <p><strong>Bahan Bakar:</strong> {car.fuel_type}</p>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan - Detail Booking & Harga */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Rincian Pesanan</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <StatusBadge status={booking.status} />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tanggal Mulai:</span>
                                    <span className="font-medium">{format(new Date(booking.start_date), 'dd MMM yyyy')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tanggal Selesai:</span>
                                    <span className="font-medium">{format(new Date(booking.end_date), 'dd MMM yyyy')}</span>
                                </div>
                                <hr className="my-3" />
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800 font-bold text-lg">Total Harga:</span>
                                    <span className="font-bold text-lg">{formatCurrency(booking.total_price)}</span>
                                </div>

                                {/* Opsi Aksi untuk User */}
                                {booking.status === 'pending' && (
                                    <div className="pt-4">
                                        <Link
                                            href={route("bookings.payment", booking.id)}
                                            className="w-full text-center inline-flex justify-center items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                                        >
                                            Lanjutkan Pembayaran
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}