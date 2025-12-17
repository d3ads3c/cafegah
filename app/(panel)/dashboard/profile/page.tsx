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

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwdMessage, setPwdMessage] = useState<string | null>(null);
    const [pwdStatus, setPwdStatus] = useState<"success" | "error" | null>(null);
    const [pwdLoading, setPwdLoading] = useState(false);

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

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPwdMessage(null);
        setPwdStatus(null);

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPwdMessage("همه فیلدها الزامی هستند");
            setPwdStatus("error");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPwdMessage("رمز عبور جدید و تکرار آن یکسان نیست");
            setPwdStatus("error");
            return;
        }
        if (newPassword.length < 12) {
            setPwdMessage("رمز عبور باید حداقل 12 کاراکتر باشد");
            setPwdStatus("error");
            return;
        }

        try {
            setPwdLoading(true);
            const res = await fetch("/api/user/change-password", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });
            const data = await res.json();
            if (data.Status === "Success") {
                setPwdMessage("رمز عبور با موفقیت تغییر کرد");
                setPwdStatus("success");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else if (data.msg === "LoggedOut") {
                setPwdMessage("لطفاً دوباره وارد شوید");
                setPwdStatus("error");
            } else {
                setPwdMessage(data.msg || "تغییر رمز عبور ناموفق بود");
                setPwdStatus("error");
            }
        } catch (err) {
            console.error("[ChangePassword] error:", err);
            setPwdMessage("خطا در تغییر رمز عبور");
            setPwdStatus("error");
        } finally {
            setPwdLoading(false);
        }
    };


    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900">پروفایل</h1>
                <p className="mt-2 text-gray-600">مدیریت اطلاعات حساب کاربری</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                {/* Profile Info */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                ذخیره تغییرات
                            </button>
                        </div>
                    </form>
                </div>

                {/* Change Password */}
                <div className="p-4 sm:p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">تغییر رمز عبور</h3>
                    <form className="space-y-6" onSubmit={handleChangePassword}>
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                                رمز عبور فعلی
                            </label>
                            <input
                                type="password"
                                name="current-password"
                                id="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
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
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="bg-gray- border mt-1 block w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-3.5"
                            />
                        </div>

                        {pwdMessage && (
                            <div className={`text-sm ${pwdStatus === "success" ? "text-emerald-600" : "text-red-500"}`}>
                                {pwdMessage}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={pwdLoading}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-60"
                            >
                                {pwdLoading ? "در حال تغییر..." : "تغییر رمز عبور"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}