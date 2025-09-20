import React, { useEffect, useCallback, useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Payment({ booking, snapToken, midtransClientKey }) {
  const [snapReady, setSnapReady] = useState(false);
  const [showMethods, setShowMethods] = useState(false);

  const methods = [
    { name: "Transfer Bank", code: "bank_transfer" },
    { name: "E-Wallet (OVO, Gopay, Dana)", code: "ewallet" },
    { name: "Virtual Account", code: "va" },
    { name: "Kartu Kredit/Debit", code: "credit_card" },
    { name: "Bayar di Tempat", code: "cod" },
  ];

  useEffect(() => {
    if (snapToken && !document.getElementById("midtrans-script")) {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", midtransClientKey);
      script.id = "midtrans-script";
      script.onload = () => setSnapReady(true);
      document.body.appendChild(script);
    } else {
      setSnapReady(true);
    }
  }, [snapToken, midtransClientKey]);

  const handlePayment = useCallback(
    (method) => {
      if (method.code === "cod") {
        alert("Silakan bayar langsung di tempat.");
        Inertia.visit(`/bookings/${booking.id}`);
        return;
      }

      if (!snapToken) {
        alert("Token pembayaran tidak tersedia.");
        return;
      }

      if (!snapReady || !window.snap) {
        alert("Midtrans Snap belum siap. Tunggu sebentar...");
        return;
      }

      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log("✅ Success:", result);
          Inertia.visit(`/bookings/${booking.id}`);
        },
        onPending: (result) => {
          console.log("⏳ Pending:", result);
          Inertia.visit(`/bookings/${booking.id}`);
        },
        onError: (result) => {
          console.error("❌ Error:", result);
          alert("Terjadi kesalahan saat pembayaran. Silakan coba lagi.");
        },
        onClose: () => {
          alert("Anda menutup popup tanpa menyelesaikan pembayaran.");
        },
      });
    },
    [snapToken, snapReady, booking.id]
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Lanjutkan Pembayaran
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Info Mobil */}
        <div className="bg-white shadow rounded-2xl p-6">
          <img
            src={booking.car?.image_url || "/images/car-placeholder.png"}
            alt={booking.car_name || "Mobil"}
            className="w-full h-48 object-contain mb-4"
          />
          <h2 className="text-lg font-semibold">{booking.car_name}</h2>
          <p className="text-gray-500 text-sm">{booking.car_year}</p>
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">Tipe:</span>{" "}
              {booking.car_type || "-"}
            </p>
            <p>
              <span className="font-semibold">Transmisi:</span>{" "}
              {booking.transmission || "-"}
            </p>
            <p>
              <span className="font-semibold">Kapasitas:</span>{" "}
              {booking.capacity || "-"} orang
            </p>
            <p>
              <span className="font-semibold">Bahan Bakar:</span>{" "}
              {booking.fuel_type || "-"}
            </p>
          </div>
        </div>

        {/* Info Pembayaran */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-3">Rincian Pembayaran</h2>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : booking.status === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {booking.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Tanggal Mulai:</span>{" "}
              {formatDate(booking.start_date)}
            </p>
            <p>
              <span className="font-semibold">Tanggal Selesai:</span>{" "}
              {formatDate(booking.end_date)}
            </p>
            {booking.days && (
              <p>
                <span className="font-semibold">Durasi:</span> {booking.days}{" "}
                hari
              </p>
            )}
            <hr className="my-2" />
            <p className="text-lg font-bold">
              Total Harga: Rp{" "}
              {Number(booking.total_price).toLocaleString("id-ID")}
            </p>
          </div>

          {/* Tombol Bayar */}
          <button
            onClick={() => setShowMethods(true)}
            disabled={booking.status !== "pending" || !snapReady}
            className={`w-full mt-6 py-3 rounded-lg shadow font-semibold transition ${
              booking.status === "pending" && snapReady
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Pilih Metode Pembayaran
          </button>
        </div>
      </div>

      {/* Modal Pilihan Metode */}
      {showMethods && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Pilih Metode Pembayaran</h3>
            <div className="space-y-3">
              {methods.map((method, index) => (
                <button
                  key={index}
                  onClick={() => handlePayment(method)}
                  className="w-full py-3 px-4 rounded-lg border hover:bg-gray-100 text-left"
                >
                  {method.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowMethods(false)}
              className="mt-4 w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
