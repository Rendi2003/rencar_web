import { Head, Link, useForm } from '@inertiajs/react';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Register() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => reset('password', 'password_confirmation');
    }, []);

    useEffect(() => {
        if (wasSuccessful) {
            toast.success('Pendaftaran berhasil! Anda akan dialihkan.');
        }
    }, [wasSuccessful]);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onError: (errs) => {
                const firstError = Object.values(errs)[0];
                toast.error(firstError || 'Pendaftaran gagal. Periksa kembali data Anda.');
            },
        });
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center bg-white">
            <Head title="Register" />

            {/* ====== HEADER HIJAU (SAMA DENGAN LOGIN) ====== */}
            <div
                className="
                absolute top-0 left-0 w-full h-[55vh]
                bg-green-600 rounded-b-full overflow-hidden
            "
            >
                <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-green-700/30"></div>
                <div className="absolute -right-24 top-10 w-72 h-72 rounded-full bg-green-500/20"></div>

                {/* Corak Titik-titik */}
                <div className="absolute top-16 left-16 grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-green-400/40"></div>
                    ))}
                </div>
                <div className="absolute top-24 right-16 grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-green-400/40"></div>
                    ))}
                </div>
            </div>

            {/* ====== LOGO (UKURAN SAMA LOGIN) ====== */}
            <div className="relative mt-10 flex w-full justify-center z-10">
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-white bg-green-600 text-white shadow-lg">
                    <h1 className="text-xl font-extrabold">FALAH</h1>
                    <p className="text-sm font-semibold">RENT CAR</p>
                </div>
            </div>

            {/* ====== CARD REGISTER (SAMA STYLE LOGIN) ====== */}
            <div className="relative z-20 mt-10 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-xl font-semibold text-gray-700">
                    Sign up to join
                </h2>

                <form onSubmit={submit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <div className="flex items-center rounded-full border px-4 py-2">
                            <UserIcon className="mr-2 h-5 w-5 text-gray-400" />
                            <input
                                id="full_name"
                                type="text"
                                name="full_name"
                                value={data.full_name}
                                className="w-full border-none text-gray-700 focus:outline-none focus:ring-0"
                                placeholder="Full Name"
                                onChange={(e) => setData('full_name', e.target.value)}
                                required
                            />
                        </div>
                        {errors.full_name && (
                            <p className="mt-1 text-sm text-red-500">{errors.full_name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <div className="flex items-center rounded-full border px-4 py-2">
                            <EnvelopeIcon className="mr-2 h-5 w-5 text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full border-none text-gray-700 focus:outline-none focus:ring-0"
                                placeholder="Email Address"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center rounded-full border px-4 py-2">
                            <LockClosedIcon className="mr-2 h-5 w-5 text-gray-400" />
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full border-none text-gray-700 focus:outline-none focus:ring-0"
                                placeholder="Password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <div className="flex items-center rounded-full border px-4 py-2">
                            <LockClosedIcon className="mr-2 h-5 w-5 text-gray-400" />
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full border-none text-gray-700 focus:outline-none focus:ring-0"
                                placeholder="Confirm Password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                        {errors.password_confirmation && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-full bg-blue-900 py-3 font-semibold text-white shadow transition hover:bg-blue-800"
                    >
                        {processing ? 'Registering...' : 'Sign up'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Have an account?{' '}
                    <Link
                        href={route('login')}
                        className="font-semibold text-blue-700 hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            </div>

            {/* ====== TAGLINE (SAMA LOGIN) ====== */}
            <div className="mt-6 text-center text-sm text-gray-500">
                cepat, mudah dan solusi keluarga
            </div>
        </div>
    );
}
