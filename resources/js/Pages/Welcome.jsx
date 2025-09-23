import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Falah Rent Car" />
            <div className="relative flex min-h-screen flex-col items-center justify-center bg-green-600 text-white overflow-hidden">
                
                {/* === Dekorasi background === */}
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* lingkaran besar */}
                    <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-green-700/40"></div>
                    <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-green-800/30"></div>

                    {/* titik kiri atas */}
                    <div className="absolute top-12 left-12 grid grid-cols-3 gap-2 opacity-30">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-green-200"
                            ></div>
                        ))}
                    </div>

                    {/* titik kanan tengah */}
                    <div className="absolute top-1/3 right-12 grid grid-cols-3 gap-2 opacity-30">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-green-200"
                            ></div>
                        ))}
                    </div>
                </div>

                {/* === Konten utama === */}
                <main className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                    
                    {/* Logo bulat dengan background hijau dan border putih */}
                    <div className="mb-12">
                        <div className="w-48 h-48 rounded-full border-4 border-white flex flex-col items-center justify-center shadow-lg bg-green-600 text-white">
                            <h1 className="text-2xl font-extrabold">FALAH</h1>
                            <p className="text-lg font-medium mt-1">RENT CAR</p>
                        </div>
                    </div>

                    {/* Tagline */}
                    <h2 className="text-lg font-semibold mb-10">
                        CEPAT, MUDAH DAN <br /> SOLUSI KELUARGA
                    </h2>

                    {/* Tombol GET STARTED + LOGIN */}
                    <div className="flex gap-4">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="bg-blue-900 px-8 py-3 rounded-lg font-bold text-white shadow hover:bg-blue-800"
                            >
                                GO TO DASHBOARD
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("register")}
                                    className="bg-blue-900 px-8 py-3 rounded-lg font-bold text-white shadow hover:bg-blue-800"
                                >
                                    GET STARTED
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="bg-white px-8 py-3 rounded-lg font-bold text-green-600 shadow hover:bg-gray-100"
                                >
                                    LOGIN
                                </Link>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
