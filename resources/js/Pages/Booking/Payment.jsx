import React from "react";
import { usePage, Link } from "@inertiajs/react";

export default function Payment() {
  const { booking, whatsapp_number } = usePage().props;

  const handlePay = () => {
    const message = encodeURIComponent(
      `Halo, saya ingin konfirmasi pembayaran booking rental mobil #${booking.id} untuk mobil ${booking.car.name}, total Rp ${booking.total_price}.`
    );
    window.open(`https://wa.me/${whatsapp_number}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 relative flex items-center justify-center">
      {/* Ornamen background sama dengan Home */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-green-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-52 h-52 bg-green-300 rounded-full opacity-40"></div>
      <div className="absolute top-1/3 right-0 w-1/2 h-64 bg-green-100 opacity-20 transform rotate-12"></div>

      {/* Konten */}
      <div className="max-w-2xl w-full mx-auto sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Detail Pembayaran</h1>
            <Link
              href={route("bookings.index")}
              className="text-sm text-green-600 hover:text-green-800 font-medium"
            >
              ← Kembali
            </Link>
          </div>

          {/* Detail */}
          <div className="space-y-3 text-gray-700">
            <p>
              Mobil: <strong>{booking.car.name}</strong>
            </p>
            <p>
              Tanggal: {booking.start_date} s/d {booking.end_date}
            </p>
            <p>
              Total Harga:{" "}
              <strong className="text-lg text-green-700">
                Rp {booking.total_price}
              </strong>
            </p>
          </div>

          {/* Tombol */}
          <button
            onClick={handlePay}
            className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-600 transition"
          >
            Bayar Sekarang via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
