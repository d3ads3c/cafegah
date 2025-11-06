"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


type LoginForm = {
    Phone: string,
    Password: string,
}

export default function Login() {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        Phone: "",
        Password: ""
    })
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        // If phone input, sanitize to ASCII digits and limit to 11 chars
        if (name === 'Phone') {
            const digitsOnly = value.replace(/[^0-9]/g, '');
            const truncated = digitsOnly.slice(0, 11);
            setLoginForm(prev => ({ ...prev, [name]: truncated }));
            return;
        }
        setLoginForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Basic validation
        if (!loginForm.Phone) {
            return;
        }
        // Phone must be 10 or 11 ASCII digits
        if (!/^[0-9]{11}$/.test(loginForm.Phone)) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ username: loginForm.Phone, password: loginForm.Password })
            });

            const data = await res.json();
            if (data.msg === 'LoggedIn') {
                setTimeout(() => router.push('/dashboard'), 400);
            } else if (data.msg === 'Failed') {
                setMessage('خطا در عملیات، مجدد تلاش کنید');
            } else if (data.msg === 'invalid') {
                setMessage('نام کاربری / رمز عبور اشتباه است');
            }
        } catch {
            setMessage('خطا در ارتباط با سرور');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <Image
                            src="/img/logo/192.png"
                            alt="کافه گاه"
                            width={48}
                            height={48}
                            className="rounded-xl"
                        />
                        <span className="text-2xl font-black text-gray-900">کافه گاه</span>
                    </Link>
                </div>

                <h2 className="mt-6 text-center text-3xl font-black text-gray-900">
                    خوش آمدید
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    حساب کاربری ندارید؟{' '}
                    <Link
                        href="/register"
                        className="font-medium text-teal-600 hover:text-teal-500"
                    >
                        ثبت‌نام کنید
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10">
                    {message && (
                        <div
                            className={`text-sm text-center w-full mb-10 p-3 rounded-lg text-red-700 bg-red-50 border border-red-200`}
                        >
                            {message}
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                شماره موبایل
                            </label>
                            <div className="mt-1">
                                <input
                                    id="Phone"
                                    name="Phone"
                                    type="text"
                                    value={loginForm.Phone}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                رمز عبور
                            </label>
                            <div className="mt-1">
                                <input
                                    id="Password"
                                    name="Password"
                                    type="password"
                                    value={loginForm.Password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                                    مرا به خاطر بسپار
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    href="/auth/forgot-password"
                                    className="font-medium text-teal-600 hover:text-teal-500"
                                >
                                    رمز عبور را فراموش کرده‌اید؟
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-4 shadow-xl shadow-teal-600/40 border border-transparent rounded-xl duration-150 cursor-pointer text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-60"
                            >
                                {loading ? 'منتظر بمانید ...' : 'ورود'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
