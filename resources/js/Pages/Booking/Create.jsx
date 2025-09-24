import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, eachDayOfInterval } from 'date-fns';

const formatCurrency = (amount) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);

export default function Create({ auth, car, futureBookings }) {
    const { data, setData, post, processing, errors } = useForm({
        car_id: car.id,
        start_date: new Date(),
        end_date: addDays(new Date(), 1),
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [numberOfDays, setNumberOfDays] = useState(2);

    // Menghitung tanggal yang sudah dibooking untuk dinonaktifkan di kalender
    const disabledDates = futureBookings.flatMap((booking) =>
        eachDayOfInterval({
            start: new Date(booking.start_date),
            end: new Date(booking.end_date),
        })
    );

    useEffect(() => {
        if (data.start_date && data.end_date) {
            const start = new Date(data.start_date);
            const end = new Date(data.end_date);
            if (end >= start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                setNumberOfDays(diffDays);
                setTotalPrice(diffDays * car.price_per_day);
            } else {
                setNumberOfDays(0);
                setTotalPrice(0);
            }
        }
    }, [data.start_date, data.end_date, car.price_per_day]);

    const handleStartDateChange = (date) => {
        setData('start_date', date);
        if (date > data.end_date) {
            setData('end_date', date);
        }
    };

    const handleEndDateChange = (date) => {
        setData('end_date', date);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('booking.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Form Pemesanan
                </h2>
            }
        >
            <Head title={`Pesan ${car.brand} ${car.model}`} />

            {/* Background hijau + ornamen */}
            <div className="min-h-screen bg-green-600 relative py-12">
                <div className="absolute top-10 left-10 w-40 h-40 bg-green-500 rounded-full opacity-30"></div>
                <div className="absolute bottom-20 right-20 w-52 h-52 bg-green-700 rounded-full opacity-40"></div>
                <div className="absolute top-1/3 right-0 w-1/2 h-64 bg-green-500 opacity-20 transform rotate-12"></div>

                {/* Konten */}
                <div className="relative z-10 max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form
                        onSubmit={submit}
                        className="bg-white overflow-hidden shadow-lg sm:rounded-xl p-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Info Mobil */}
                            <div>
                                <img
                                    src={`/storage/${car.image_urls[0]}`}
                                    alt={car.brand}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-2xl font-bold">
                                    {car.brand} {car.model}
                                </h3>
                                <p className="text-lg text-gray-600">
                                    Tahun {car.year}
                                </p>
                                <p className="text-xl font-semibold text-indigo-600 mt-2">
                                    {formatCurrency(car.price_per_day)} / hari
                                </p>
                            </div>

                            {/* Form Input */}
                            <div>
                                <h3 className="text-xl font-bold mb-4">
                                    Pilih Tanggal Sewa
                                </h3>
                                <div className="flex flex-col space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tanggal Mulai
                                        </label>
                                        <DatePicker
                                            selected={data.start_date}
                                            onChange={handleStartDateChange}
                                            selectsStart
                                            startDate={data.start_date}
                                            endDate={data.end_date}
                                            minDate={new Date()}
                                            excludeDates={disabledDates}
                                            dateFormat="dd/MM/yyyy"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tanggal Selesai
                                        </label>
                                        <DatePicker
                                            selected={data.end_date}
                                            onChange={handleEndDateChange}
                                            selectsEnd
                                            startDate={data.start_date}
                                            endDate={data.end_date}
                                            minDate={data.start_date}
                                            excludeDates={disabledDates}
                                            dateFormat="dd/MM/yyyy"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                </div>
                                {errors.date && (
                                    <p className="text-sm text-red-600 mt-2">
                                        {errors.date}
                                    </p>
                                )}

                                {/* Ringkasan Biaya */}
                                <div className="mt-8 pt-4 border-t">
                                    <h3 className="text-xl font-bold mb-2">
                                        Ringkasan Biaya
                                    </h3>
                                    <div className="flex justify-between">
                                        <span>
                                            {formatCurrency(car.price_per_day)} x{' '}
                                            {numberOfDays} hari
                                        </span>
                                        <span>{formatCurrency(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg mt-2">
                                        <span>Total</span>
                                        <span>{formatCurrency(totalPrice)}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing || totalPrice <= 0}
                                    className="mt-6 w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-300"
                                >
                                    {processing
                                        ? 'Memproses...'
                                        : 'Konfirmasi Pemesanan'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
