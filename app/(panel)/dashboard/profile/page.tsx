"use client"

import { useState, useEffect } from "react";
import { UserInfo } from "@/types/AllTypes";

export default function Profile() {

    const [info, setInfo] = useState<UserInfo>({
        Fname: "",
        Lname: "",
        Email: "",
        Phone: "",
        Status: ""
    })

    useEffect(() => {
        const checkInfo = async () => {
            try {
                const res = await fetch("/api/user/info", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                });

                const data = await res.json();
                console.log(data)
                setInfo(data)
            } catch (err) {
                console.error("[AuthChecker] fetch error:", err);
            }
        };

        checkInfo();
    }, []);


    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900">پروفایل</h1>
                <p className="mt-2 text-gray-600">مدیریت اطلاعات حساب کاربری</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                {/* Profile Info */}
                <div className="p-6 border-b border-gray-200">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    نام
                                </label>
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    defaultValue={info.Fname}
                                    className="bg-gray- border mt-1 block w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3.5"
                                />
                            </div>

                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    نام خانوادگی
                                </label>
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    defaultValue={info.Lname}
                                    className="bg-gray- border mt-1 block w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3.5"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                ایمیل
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                defaultValue={info.Email}
                                className="bg-gray- border mt-1 block w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                شماره موبایل
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                defaultValue={info.Phone}
                                dir="ltr"
                                className="bg-gray- border mt-1 block w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3.5"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                ذخیره تغییرات
                            </button>
                        </div>
                    </form>
                </div>

                {/* Change Password */}
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">تغییر رمز عبور</h3>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                                رمز عبور فعلی
                            </label>
                            <input
                                type="password"
                                name="current-password"
                                id="current-password"
                                className="bg-gray- border mt-1 block w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                رمز عبور جدید
                            </label>
                            <input
                                type="password"
                                name="new-password"
                                id="new-password"
                                className="bg-gray- border mt-1 block w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                تکرار رمز عبور جدید
                            </label>
                            <input
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                className="bg-gray- border mt-1 block w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3.5"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                تغییر رمز عبور
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}