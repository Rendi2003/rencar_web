import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import { User, Mail, MapPin, Phone, Lock, Eye } from "lucide-react";
import { useState } from "react";

export default function Edit() {
    const { auth } = usePage().props;
    const user = auth.user;

    // ganti put → patch
    const { data, setData, patch, processing } = useForm({
        name: user.name || "",
        email: user.email || "",
        city: user.city || "",
        phone: user.phone || "",
        password: "",
        avatar: null,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        // panggil PATCH agar sesuai dengan Route::patch('/profile', ...)
        patch(route("profile.update"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="relative min-h-screen flex items-center justify-center bg-green-600 overflow-hidden px-4">
                {/* Background shapes */}
                <div className="absolute top-10 left-5 w-32 h-32 bg-green-500 rounded-full opacity-40"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-500 rounded-full opacity-30"></div>
                <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-green-400 rounded-full opacity-20"></div>

                <div className="relative w-full max-w-sm">
                    <form
                        onSubmit={submit}
                        className="bg-transparent flex flex-col items-center"
                    >
                        {/* Avatar */}
                        <label className="relative w-24 h-24 rounded-xl bg-black flex items-center justify-center mb-4 shadow-lg overflow-hidden cursor-pointer">
                            {data.avatar ? (
                                <img
                                    src={URL.createObjectURL(data.avatar)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="text-white w-10 h-10" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    setData("avatar", e.target.files[0])
                                }
                            />
                        </label>

                        {/* Nama & Email */}
                        <h2 className="text-lg font-bold text-white">
                            {user.name}
                        </h2>
                        <p className="text-xs text-white/90 mb-6">
                            {user.email}
                        </p>

                        {/* Input fields */}
                        <div className="w-full space-y-3">
                            <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow text-sm">
                                <User className="text-gray-500 w-4 h-4 mr-2" />
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Nama"
                                    className="flex-1 outline-none bg-transparent"
                                />
                            </div>

                            <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow text-sm">
                                <Mail className="text-gray-500 w-4 h-4 mr-2" />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Email"
                                    className="flex-1 outline-none bg-transparent"
                                />
                            </div>

                            <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow text-sm">
                                <MapPin className="text-gray-500 w-4 h-4 mr-2" />
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                    placeholder="Kota"
                                    className="flex-1 outline-none bg-transparent"
                                />
                            </div>

                            <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow text-sm">
                                <Phone className="text-gray-500 w-4 h-4 mr-2" />
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    placeholder="Nomor HP"
                                    className="flex-1 outline-none bg-transparent"
                                />
                            </div>

                            <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow text-sm relative">
                                <Lock className="text-gray-500 w-4 h-4 mr-2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Password Baru"
                                    className="flex-1 outline-none bg-transparent"
                                />
                                <Eye
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="text-gray-400 w-4 h-4 absolute right-3 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Tombol Save */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-5 w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 rounded-full shadow text-sm"
                        >
                            SAVE
                        </button>

                        {/* Tombol Logout */}
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="mt-2 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-full shadow text-sm text-center"
                        >
                            LOGOUT
                        </Link>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
