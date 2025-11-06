'use client';
import Link from "next/link";
import ModalView from "@/app/components/ui/Modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/ui/Toast";
import { UserInfo } from "@/types/AllTypes";
import MySubs from "@/app/components/MySubs";
import MyInvoices from "@/app/components/UserInvoices";

// National ID validator function
const validateNationalId = (nationalId: string) => {
    // Remove any whitespace or dashes
    const code = nationalId.replace(/[^0-9]/g, "");

    // Basic length check
    if (code.length !== 10) return false;

    // All digits can't be the same
    if (/^(\d)\1{9}$/.test(code)) return false;

    // Check the control digit
    const check = +code[9];
    const sum = Array.from(code.slice(0, 9))
        .reverse()
        .reduce((acc, x, i) => acc + (+x * (i + 2)), 0) % 11;

    return sum < 2 ? check === sum : check + sum === 11;
};

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nationalId, setNationalId] = useState("");
    const [isValidId, setIsValidId] = useState<boolean | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const router = useRouter()

    const [info, setInfo] = useState<UserInfo>({
        Fname: "",
        Lname: "",
        Email: "",
        Phone: "",
        Status: "",
        Meli: ""
    })

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
            setInfo(data)
        } catch (err) {
            console.error("[AuthChecker] fetch error:", err);
        }
    };
    useEffect(() => {
        checkInfo();
    }, []);

    const handleNationalIdChange = (value: string) => {
        // Convert Persian/Arabic numbers to English and remove any non-digits
        const englishValue = value
            .replace(/[۰-۹]/g, d => String('0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]))
            .replace(/[٠-٩]/g, d => String('0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]))
            .replace(/[^0-9]/g, '');

        // Only update if the result contains valid English digits
        if (/^[0-9]*$/.test(englishValue)) {
            setNationalId(englishValue);
            if (englishValue.length === 10) {
                setIsValidId(validateNationalId(englishValue));
            } else {
                setIsValidId(null);
            }
        }
    };

    // Show success toast
    const handleSuccess = () => {
        setToastMessage('عملیات با موفقیت انجام شد');
        setToastType('success');
        setShowToast(true);
    };

    // Show error toast
    const handleError = () => {
        setToastMessage('عملیات با خطا مواجه شد. دوباره تلاش کنید');
        setToastType('error');
        setShowToast(true);
    };

    async function SubmitMeli(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await fetch('/api/user/info/meli', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ meli: nationalId })
            });

            const data = await res.json();
            if (data.msg === 'Success') {
                setIsModalOpen(false)
                checkInfo();
                handleSuccess();
            } else if (data.msg === 'Failed') {
                handleError()
            } else if (data.msg === "LoggedOut") {
                setTimeout(() => router.push('/login'));
            }
        } catch {
            handleError()
        }
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900">داشبورد</h1>
                <p className="mt-2 text-gray-600">مدیریت نرم افزار</p>
            </div>
            {info.Meli === "0" ? (
                <div className="w-full my-5 rounded-2xl p-4 bg-orange-100 text-orange-400 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="relative flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-orange-500"></span>
                        </span>
                        <h3 className="font-bold text-sm">جهت فعالسازی و خرید اشتراک اطلاعات اکانت خود را کامل کنید.</h3>
                    </div>
                    <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white rounded-xl py-2 px-5 text-orange-500 text-sm font-bold"
                        >
                            تکمیل اطلاعات
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full my-5 rounded-2xl p-4 bg-emerald-100 text-emerald-400 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="relative flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-emerald-500"></span>
                        </span>
                        <h3 className="font-bold text-sm mt-1">اکانت شما فعال و آماده تهیه لایسنس می باشد.</h3>
                    </div>
                </div>
            )}
            <MySubs />
            <div className="flex gap-5 my-7">
                <div className="w-2/3">
                    <MyInvoices />
                </div>
                <div className="w-1/3 rounded-2xl border border-gray-100 bg-white">
                    <div className="border-b border-gray-100 pb-3 p-4">
                        <h2 className="font-bold text-gray-900">به روزرسانی ها</h2>
                    </div>
                    <div className="space-y-4 max-h-[300px] h-[300px] overflow-auto pt-5 p-4">
                        <div className="w-full gap-3 shadow-xl rounded-2xl p-3">
                            <h2 className="text-sm font-bold">نسخه ۱.۳۱</h2>
                            <ul className="space-y-1 text-sm mt-2">
                                <li className="flex gap-1">
                                    <i className="fi fi-sr-dot-circle text-teal-600 mt-1"></i>
                                    <p className="text-gray-500">افزودن تخفیف بر هر مشتری تعریف شده</p>
                                </li>
                                <li className="flex gap-1">
                                    <i className="fi fi-sr-dot-circle text-teal-600 mt-1"></i>
                                    <p className="text-gray-500">افزودن تخفیف به صورت مبلغ تعریف شده برای مشتریان تعریف شده</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Complete Information Modal */}
            <ModalView
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="w-[600px]"
                height="h-auto"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">تکمیل اطلاعات کاربری</h2>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <i className="fi fi-sr-cross text-lg"></i>
                        </button>
                    </div>

                    <form className="space-y-4" onSubmit={SubmitMeli}>
                        <div>
                            <label className="block text-sm mb-1">کد ملی</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="meliID"
                                    maxLength={10}
                                    value={nationalId}
                                    onChange={(e) => handleNationalIdChange(e.target.value)}
                                    className={`w-full border rounded-xl p-3 text-sm focus:outline-none ${isValidId === true ? 'border-green-500 focus:border-green-600 pl-10' :
                                        isValidId === false ? 'border-red-500 focus:border-red-600 pl-10' :
                                            'border-gray-200 focus:border-teal-600'
                                        }`}
                                    placeholder="کد ملی خود را وارد کنید"
                                    dir="ltr"
                                />
                                {nationalId.length === 10 && (
                                    <div className="absolute left-3 top-6.5 -translate-y-1/2">
                                        {isValidId ? (
                                            <i className="fi fi-sr-check text-green-500"></i>
                                        ) : (
                                            <i className="fi fi-sr-cross text-red-500"></i>
                                        )}
                                    </div>
                                )}
                            </div>
                            {isValidId === false && nationalId.length === 10 && (
                                <p className="text-red-500 text-xs mt-1">کد ملی وارد شده معتبر نیست</p>
                            )}
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-teal-600 text-white rounded-xl py-3 font-bold hover:bg-teal-700 transition-colors"
                            >
                                ذخیره اطلاعات
                            </button>
                        </div>
                    </form>
                </div>
            </ModalView>
            <Toast
                message={toastMessage}
                type={toastType}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
}
