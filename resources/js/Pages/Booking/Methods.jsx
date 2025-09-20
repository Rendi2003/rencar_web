export default function Methods({ booking, methods, payment_token }) {
    const handleSelect = (method) => {
        if (!payment_token) {
            alert("Token pembayaran tidak tersedia.");
            return;
        }

        alert(`Kamu pilih ${method.name}\nToken: ${payment_token}`);
        // TODO: kirim ke API pembayaran sesuai metode
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Pilih Metode Pembayaran</h1>
            <div className="grid gap-4">
                {methods.map((method, index) => (
                    <button 
                        key={index} 
                        className="p-4 border rounded-lg hover:bg-gray-100"
                        onClick={() => handleSelect(method)}
                    >
                        {method.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
