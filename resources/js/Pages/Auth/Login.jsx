import { Head, Link, useForm } from '@inertiajs/react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center bg-white">
            <Head title="Login" />

            {/* ======= BAGIAN ATAS HIJAU LENGKUNG ======= */}
            <div
                className="
                absolute top-0 left-0 w-full h-[55vh]
                bg-green-600 rounded-b-full overflow-hidden
            "
            >
                {/* Corak Lingkaran Besar Transparan */}
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

            {/* ======= LOGO BULAT ======= */}
            <div className="relative mt-10 flex w-full justify-center z-10">
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-white bg-green-600 text-white shadow-lg">
                    <h1 className="text-xl font-extrabold">FALAH</h1>
                    <p className="text-sm font-semibold">RENT CAR</p>
                </div>
            </div>

            {/* ======= CARD LOGIN ======= */}
            <div className="relative z-20 mt-10 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-xl font-semibold text-gray-700">
                    Sign in to join
                </h2>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
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
                                autoComplete="username"
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-full bg-blue-900 py-3 font-semibold text-white shadow transition hover:bg-blue-800"
                    >
                        {processing ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account yet?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-blue-700 hover:underline"
                    >
                        Sign up now
                    </Link>
                </div>
            </div>

            {/* ======= TAGLINE ======= */}
            <div className="mt-6 text-center text-sm text-gray-500">
                cepat, mudah dan solusi keluarga
            </div>
        </div>
    );
}
