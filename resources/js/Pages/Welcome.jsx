import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-zinc-900 dark:via-zinc-900 dark:to-black text-slate-700 dark:text-slate-200">
                {/* ===== Header ===== */}
                <header className="mx-auto max-w-7xl px-6 py-6 lg:py-8">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-md bg-[#FF2D20] p-2 shadow-md">
                                <svg className="h-8 w-8 text-white" viewBox="0 0 62 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253Z" fill="white" />
                                </svg>
                            </div>

                            <div>
                                <h1 className="text-lg font-semibold tracking-tight">RentalPro</h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Smart car rental platform</p>
                            </div>
                        </div>

                        <nav className="hidden items-center gap-4 md:flex">
                            <a href="#features" className="text-sm hover:text-slate-900 dark:hover:text-white">Features</a>
                            <a href="#pricing" className="text-sm hover:text-slate-900 dark:hover:text-white">Pricing</a>
                            <a href="#about" className="text-sm hover:text-slate-900 dark:hover:text-white">About</a>
                        </nav>

                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-[#FF2D20] px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FF2D20]/50"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF2D20]/30"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-[#FF2D20] px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FF2D20]/50"
                                    >
                                        Get started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* ===== Hero ===== */}
                <main className="mx-auto max-w-7xl px-6 pb-20">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <section className="order-2 lg:order-1">
                            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                Solusi Sewa Mobil yang Cepat, Aman, dan Terpercaya
                            </h2>
                            <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
                                Kelola armada, pemesanan, dan pembayaran dalam satu dashboard yang intuitif. Cocok untuk rental kecil hingga enterprise.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-2 rounded-md bg-[#FF2D20] px-5 py-3 text-sm font-semibold text-white shadow-md hover:brightness-95 focus:outline-none"
                                    >
                                        Buka Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center gap-2 rounded-md bg-[#FF2D20] px-5 py-3 text-sm font-semibold text-white shadow-md hover:brightness-95 focus:outline-none"
                                        >
                                            Coba Sekarang — Gratis
                                        </Link>

                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-200"
                                        >
                                            Masuk
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-3">
                                <div className="rounded-lg bg-white/80 p-3 text-center shadow-sm dark:bg-zinc-900/60">
                                    <div className="text-sm font-semibold">99.9% Uptime</div>
                                    <div className="mt-1 text-xs text-slate-500">Infrastruktur andal</div>
                                </div>
                                <div className="rounded-lg bg-white/80 p-3 text-center shadow-sm dark:bg-zinc-900/60">
                                    <div className="text-sm font-semibold">Keamanan Terjamin</div>
                                    <div className="mt-1 text-xs text-slate-500">Encrypt & audit logs</div>
                                </div>
                                <div className="rounded-lg bg-white/80 p-3 text-center shadow-sm dark:bg-zinc-900/60">
                                    <div className="text-sm font-semibold">Pembayaran Mudah</div>
                                    <div className="mt-1 text-xs text-slate-500">Transfer, e-wallet, kas</div>
                                </div>
                            </div>
                        </section>

                        <aside className="order-1 relative mx-auto w-full max-w-xl lg:order-2">
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF2D20]/10 to-transparent p-8 shadow-lg">
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/60 to-transparent blur-xl opacity-30 dark:from-zinc-800/30"></div>
                                <div className="relative grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs font-medium text-slate-500">Armada tersedia</div>
                                            <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">+150 kendaraan</div>
                                        </div>
                                        <div className="rounded-full bg-white/90 p-2 text-sm font-medium shadow-sm dark:bg-zinc-900/70">TERBARU</div>
                                    </div>

                                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-900/60">
                                        <div className="flex items-center gap-4">
                                            <img src="/images/car-sample.png" alt="Car sample" className="h-14 w-20 rounded-md object-cover" />
                                            <div>
                                                <div className="font-semibold">Toyota Avanza • 2021</div>
                                                <div className="text-sm text-slate-500">Mulai dari <span className="font-medium text-slate-900 dark:text-white">Rp 350.000 / hari</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2 grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-white p-4 text-sm shadow-sm dark:bg-zinc-900/60">
                                            <div className="font-medium">Rating</div>
                                            <div className="mt-1 text-slate-500">4.7 / 5 (dari 1.2k+ ulasan)</div>
                                        </div>
                                        <div className="rounded-lg bg-white p-4 text-sm shadow-sm dark:bg-zinc-900/60">
                                            <div className="font-medium">Reservasi</div>
                                            <div className="mt-1 text-slate-500">Instant confirmation</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* ===== Features section (replacing default cards) ===== */}
                    <section id="features" className="mt-16">
                        <h3 className="text-xl font-semibold">Kenapa memilih RentalPro?</h3>

                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900/60">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-[#FF2D20]/10 p-2">
                                        <svg className="h-6 w-6 text-[#FF2D20]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L3 6v6c0 5 3 9 9 10 6-1 9-5 9-10V6l-9-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Platform terintegrasi</div>
                                        <div className="text-sm text-slate-500">Booking, pembayaran, dan laporan dalam satu tempat.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900/60">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-[#FF2D20]/10 p-2">
                                        <svg className="h-6 w-6 text-[#FF2D20]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Keamanan & Verifikasi</div>
                                        <div className="text-sm text-slate-500">Dokumen terverifikasi, transaksi terenkripsi.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900/60">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-[#FF2D20]/10 p-2">
                                        <svg className="h-6 w-6 text-[#FF2D20]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Laporan real-time</div>
                                        <div className="text-sm text-slate-500">Lihat performa armada & pendapatan kapan saja.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== Footer ===== */}
                    <footer className="mt-20 rounded-lg border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
                            <div>
                                <div className="text-sm font-medium">RentalPro — built with Laravel</div>
                                <div className="text-xs text-slate-500">Laravel v{laravelVersion} • PHP v{phpVersion}</div>
                            </div>

                            <div className="mt-3 flex items-center gap-3 sm:mt-0">
                                <a href="#about" className="text-sm hover:text-slate-900 dark:hover:text-white">About</a>
                                <a href="/docs" className="text-sm hover:text-slate-900 dark:hover:text-white">Docs</a>
                                <a href="/support" className="rounded-md bg-[#FF2D20] px-3 py-2 text-sm font-medium text-white hover:brightness-95">Contact</a>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
}
