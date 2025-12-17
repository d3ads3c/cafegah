"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type RegForm = {
    Fname: string,
    Lname: string,
    Phone: string,
    Email: string,
    Password1: string,
    Password2: string,
}


export default function Register() {
    const [regForm, setRegForm] = useState<RegForm>({
        Fname: "",
        Lname: "",
        Phone: "",
        Email: "",
        Password1: "",
        Password2: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [login, setLogin] = useState<boolean>(false)
    const router = useRouter();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        // If phone input, sanitize to ASCII digits and limit to 11 chars
        if (name === 'Phone') {
            const digitsOnly = value.replace(/[^0-9]/g, '');
            const truncated = digitsOnly.slice(0, 11);
            setRegForm(prev => ({ ...prev, [name]: truncated }));
            return;
        }
        setRegForm(prev => ({ ...prev, [name]: value }));
    }

    // Email validation function
    function isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage(null);

        // Basic validation
        if (!regForm.Phone || !regForm.Email || !regForm.Password1) {
            setMessage('لطفاً تمام فیلدهای ضروری را پر کنید');
            return;
        }
        // Phone must be 10 or 11 ASCII digits
        if (!/^[0-9]{11}$/.test(regForm.Phone)) {
            setMessage('شماره موبایل باید شامل 11 رقم انگلیسی باشد');
            return;
        }
        // Email validation
        if (!isValidEmail(regForm.Email)) {
            setMessage('لطفاً یک آدرس ایمیل معتبر وارد کنید');
            return;
        }
        // Password min length
        if (regForm.Password1.length < 8) {
            setMessage('رمز عبور باید حداقل 8 کاراکتر باشد');
            return;
        }
        if (regForm.Password1 !== regForm.Password2) {
            setMessage('رمزهای وارد شده با هم مطابقت ندارند');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ username: regForm.Phone, password: regForm.Password1, fname: regForm.Fname, lname: regForm.Lname, Email: regForm.Email })
            });

            const data = await res.json();
            if (data.msg === 'LoggedIn') {
                setLogin(true)
                setMessage('ثبت‌نام با موفقیت انجام شد. درحال انتقال...');
                // Redirect to login or dashboard after short delay
                setTimeout(() => router.push('/dashboard'), 800);
            } else if (data.msg === 'Failed') {
                setMessage('اطلاعات نامعتبر است');
            } else if (data.msg === 'Duplicate') {
                setMessage('کاربری با این شماره موبایل ثبت شده است');
            } else {
                setMessage(data.msg || 'عملیات انجام شد');
            }
        } catch {
            setMessage('خطا در ارتباط با سرور');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-1 sm:px-6 lg:px-8">
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
                    ایجاد حساب کاربری
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    قبلاً ثبت‌نام کرده‌اید؟{' '}
                    <Link
                        href="/login"
                        className="font-medium text-teal-600 hover:text-teal-500"
                    >
                        وارد شوید
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10">
                    {message && (
                        <div
                            className={`text-sm text-center w-full mb-10 p-3 rounded-lg ${login ? "text-emerald-700 bg-emerald-50 border border-emerald-200" : "text-red-700 bg-red-50 border border-red-200"}`}
                        >
                            {message}
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    نام
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="Fname"
                                        id="first-name"
                                        autoComplete="given-name"
                                        required
                                        value={regForm.Fname}
                                        onChange={handleChange}
                                        className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    نام خانوادگی
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="Lname"
                                        id="last-name"
                                        autoComplete="family-name"
                                        required
                                        value={regForm.Lname}
                                        onChange={handleChange}
                                        className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                شماره موبایل
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone"
                                    name="Phone"
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]{10,11}"
                                    maxLength={11}
                                    autoComplete="tel"
                                    required
                                    value={regForm.Phone}
                                    onChange={handleChange}
                                    className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                آدرس ایمیل
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="Email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={regForm.Email}
                                    onChange={handleChange}
                                    className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    dir="ltr"
                                    placeholder="example@domain.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                رمز عبور
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="Password1"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={regForm.Password1}
                                    onChange={handleChange}
                                    className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
                                تکرار رمز عبور
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password-confirm"
                                    name="Password2"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={regForm.Password2}
                                    onChange={handleChange}
                                    className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded ml-2"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-900">
                                <Link href="/terms" className="text-teal-600 hover:text-teal-500">
                                    قوانین و مقررات
                                </Link>
                                {' '}را می‌پذیرم
                            </label>
                        </div> */}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-4 shadow-xl shadow-teal-600/40 border border-transparent rounded-xl duration-150 cursor-pointer text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-60"
                            >
                                {loading ? 'منتظر بمانید ...' : 'ثبت‌نام'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
