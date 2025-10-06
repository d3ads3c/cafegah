import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ثبت‌نام در کافه گاه',
    description: 'ایجاد حساب کاربری در کافه گاه',
};

export default function Register() {
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
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10">
                    <form className="space-y-6" action="#" method="POST">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    نام
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        required
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
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        required
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
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    dir="ltr"
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
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
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
                                    name="password-confirm"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
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
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 shadow-xl shadow-teal-600/40 border border-transparent rounded-xl duration-150 cursor-pointer text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                ثبت‌نام
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
