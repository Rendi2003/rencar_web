import React from "react";
import { usePage } from "@inertiajs/react";

export default function Payment() {
  const { booking, whatsapp_number } = usePage().props;

  const handlePay = () => {
    const message = encodeURIComponent(
      `Halo, saya ingin konfirmasi pembayaran booking rental mobil #${booking.id} untuk mobil ${booking.car.name}, total Rp ${booking.total_price}.`
    );
    window.open(`https://wa.me/${whatsapp_number}?text=${message}`, "_blank");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Detail Pembayaran</h1>

      <p className="mb-2">Mobil: <strong>{booking.car.name}</strong></p>
      <p className="mb-2">Tanggal: {booking.start_date} s/d {booking.end_date}</p>
      <p className="mb-4">Total Harga: <strong>Rp {booking.total_price}</strong></p>

      <button
        onClick={handlePay}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Bayar Sekarang via WhatsApp
      </button>
    </div>
  );
}
