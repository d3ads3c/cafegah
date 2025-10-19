'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import ProgressBar from '@/app/components/ui/ProgressBar';

interface SubscriptionStatus {
    daysLeft: number;
    totalDays: number;
}

interface Plan {
    id: string;
    name: string;
    price: number;
    features: string[];
    recommended?: boolean;
}

interface PaymentMethod {
    id: string;
    name: string;
    icon: string;
    lastDigits: string;
}

const plans: Plan[] = [
    {
        id: 'basic',
        name: 'پایه',
        price: 299000,
        features: [
            'مدیریت ۱ شعبه',
            'تا ۵۰ منوی فعال',
            'گزارش‌های پایه',
            'پشتیبانی ایمیلی'
        ]
    },
    {
        id: 'pro',
        name: 'حرفه‌ای',
        price: 499000,
        recommended: true,
        features: [
            'مدیریت ۳ شعبه',
            'منوی نامحدود',
            'گزارش‌های پیشرفته',
            'پشتیبانی تلفنی ۱۲/۷',
            'اپلیکیشن موبایل'
        ]
    },
    {
        id: 'enterprise',
        name: 'سازمانی',
        price: 999000,
        features: [
            'شعبه‌های نامحدود',
            'منوی نامحدود',
            'گزارش‌های سفارشی',
            'پشتیبانی اختصاصی',
            'API اختصاصی'
        ]
    }
];

const paymentMethods: PaymentMethod[] = [
    {
        id: 'card1',
        name: 'بانک ملت',
        lastDigits: '6104',
        icon: '/img/payment/mellat.png'
    },
    {
        id: 'card2',
        name: 'بانک سامان',
        lastDigits: '5022',
        icon: '/img/payment/saman.png'
    }
];

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

function formatPrice(price: number): string {
    return price.toLocaleString();
}


export default function SubscriptionPage() {
    const [selectedPlan, setSelectedPlan] = useState('pro');
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [showRenewModal, setShowRenewModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);

    const activeSubscription = {
        cafeName: "کافه لبخند",
        plan: "حرفه‌ای",
        status: "فعال",
        createDate: new Date('2025-09-01'),
        expireDate: new Date('2025-11-01'),
        daysLeft: 27,
        totalDays: 60,
        price: 499000,
        features: [
            "مدیریت منو دیجیتال",
            "ثبت سفارش آنلاین",
            "مدیریت موجودی",
            "گزارش‌های پیشرفته",
            "پشتیبانی ۲۴/۷",
        ],
        paymentHistory: [
            {
                date: '۱۵ شهریور ۱۴۰۲',
                amount: '499,000',
                status: 'موفق',
                invoiceId: 'INV-1402-001'
            },
            {
                date: '۱۵ مرداد ۱۴۰۲',
                amount: '499,000',
                status: 'موفق',
                invoiceId: 'INV-1402-002'
            }
        ]
    };

    const handleRenew = () => {
        setShowRenewModal(true);
    };

    const handleUpgrade = () => {
        setShowUpgradeModal(true);
    };

    const getPlanPrice = (planId: string): string => {
        const plan = plans.find(p => p.id === planId);
        return plan ? plan.price.toLocaleString() : '0';
    };

    return (
        <main className="w-full mx-auto">
            <div className="my-5">
                <div className="">
                    <h2 className="text-lg font-bold text-gray-900">اشتراک های من</h2>
                </div>
                <div className="mt-4 flex w-full overflow-auto gap-5">
                    <div className="w-[450px] min-w-[450px] rounded-2xl bg-white border border-gray-100 p-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <div className="size-16 rounded-2xl bg-teal-100 flex items-center justify-center">
                                    <i className="fi fi-sr-store-alt text-2xl text-teal-500 mt-2"></i>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-bold">کافه ای</h2>
                                        <p className="text-gray-400 text-xs">پلن ویژه</p>
                                    </div>
                                    <div className="bg-teal-100 text-teal-500 rounded-xl py-1 px-3">
                                        <p className="font-bold text-sm">فعال</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <ProgressBar progress={70} />
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-5">
                            <div className="">
                                <p className="text-xs text-gray-400">نسخه نرم افزار</p>
                                <p className="text-sm font-bold">۱.۳</p>
                            </div>
                            <button type="button" className="flex items-center justify-center gap-1 border border-teal-600 text-teal-600 rounded-xl py-1 px-3 hover:bg-teal-600 hover:text-white duration-150 cursor-pointer">
                                <i className="fi fi-sr-refresh mt-1.5 text-sm"></i>
                                <p className="text-sm">به‌روزرسانی</p>
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-5">
                            <Link href={"#"} className="bg-teal-600 text-white rounded-xl py-3 w-1/2 text-center font-bold text-sm">ورود به پنل</Link>
                            <Link href={"#"} className="border border-teal-600 text-teal-600 rounded-xl py-3 w-1/2 text-center font-bold text-sm">مدیریت اشتراک</Link>
                        </div>
                    </div>

                    <Link href={"/dashboard/subscription/new"} className="w-[450px] min-w-[450px] duration-150 rounded-2xl bg-teal-50 cursor-pointer border border-teal-500 border-dashed p-4 flex items-center justify-center hover:border-solid hover:bg-teal-600 hover:[&_*>*]:text-white">
                        <div className="text-center">
                            <i className="fi fi-sr-add text-teal-600 text-2xl"></i>
                            <h3 className="font-bold text-lg -mt-1 mb-1">اشتراک جدید</h3>
                            <p className="text-xs text-gray-400">جهت دریافت اشتراک نرم افزار جدید برای کافه</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Renewal Modal */}
            {showRenewModal && (
                <div className="fixed inset-0 backdrop-blur-xl bg-black/20 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">تمدید اشتراک</h2>
                                <button onClick={() => setShowRenewModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Current Plan Info */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-bold mb-2">اشتراک فعلی</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">نوع اشتراک:</span>
                                        <span className="font-semibold mr-2">{activeSubscription.plan}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">تاریخ پایان:</span>
                                        <span className="font-semibold mr-2">{formatDate(activeSubscription.expireDate)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Subscription Details */}
                            <div className="mb-6">
                                <div className="p-4 rounded-lg bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">تمدید اشتراک {activeSubscription.plan}</h3>
                                            <p className="text-gray-600">دوره یک ماهه</p>
                                        </div>
                                        <div className="text-xl font-bold text-teal-600">
                                            {activeSubscription.price.toLocaleString()} تومان
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="font-bold">جزئیات پرداخت</h3>
                                        <p className="text-sm text-gray-600">لطفاً روش پرداخت را انتخاب کنید</p>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-teal-600">
                                            {activeSubscription.price.toLocaleString()} تومان
                                        </div>
                                        <div className="text-sm text-gray-500 text-left">
                                            ماهانه
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className="flex items-center justify-between p-3 border rounded-lg bg-white hover:border-teal-500 cursor-pointer"
                                            onClick={() => setSelectedPaymentMethod(method.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 relative rounded-lg overflow-hidden border">
                                                    <Image
                                                        src={method.icon}
                                                        alt={method.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{method.name}</p>
                                                    <p className="text-sm text-gray-500">**** {method.lastDigits}</p>
                                                </div>
                                            </div>
                                            <input
                                                type="radio"
                                                checked={selectedPaymentMethod === method.id}
                                                onChange={() => setSelectedPaymentMethod(method.id)}
                                                className="w-4 h-4 text-teal-600"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowRenewModal(false)}
                                    className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                    انصراف
                                </button>
                                <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                                    پرداخت و تمدید اشتراک
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Upgrade Modal */}
            {showUpgradeModal && (
                <div className="fixed inset-0 backdrop-blur-xl bg-black/20 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">ارتقا اشتراک</h2>
                                <button onClick={() => setShowUpgradeModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">


                            {/* Plans */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {plans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        className={`relative rounded-xl border p-6 ${selectedPlan === plan.id
                                                ? 'border-teal-500 ring-2 ring-teal-500'
                                                : 'border-gray-200'
                                            }`}
                                    >
                                        {plan.recommended && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                                                    پیشنهاد ویژه
                                                </span>
                                            </div>
                                        )}
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                            <div className="text-3xl font-bold text-gray-900">
                                                {plan.price.toLocaleString()}
                                                <span className="text-sm text-gray-500"> تومان / ماه</span>
                                            </div>
                                        </div>
                                        <ul className="space-y-3 mb-6">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => setSelectedPlan(plan.id)}
                                            className={`w-full py-2 rounded-lg ${selectedPlan === plan.id
                                                    ? 'bg-teal-600 text-white'
                                                    : 'border border-teal-600 text-teal-600'
                                                }`}
                                        >
                                            {selectedPlan === plan.id ? 'پلن انتخاب شده' : 'انتخاب این پلن'}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Payment Selection */}
                            <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="font-bold">جزئیات پرداخت</h3>
                                        <p className="text-sm text-gray-600">لطفاً روش پرداخت را انتخاب کنید</p>
                                    </div>
                                    <div className="text-xl font-bold text-teal-600">
                                        {plans.find(p => p.id === selectedPlan)?.price.toLocaleString()} تومان
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className="flex items-center justify-between p-3 border rounded-lg bg-white hover:border-teal-500 cursor-pointer"
                                            onClick={() => setSelectedPaymentMethod(method.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 relative rounded-lg overflow-hidden border">
                                                    <Image
                                                        src={method.icon}
                                                        alt={method.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{method.name}</p>
                                                    <p className="text-sm text-gray-500">**** {method.lastDigits}</p>
                                                </div>
                                            </div>
                                            <input
                                                type="radio"
                                                checked={selectedPaymentMethod === method.id}
                                                onChange={() => setSelectedPaymentMethod(method.id)}
                                                className="w-4 h-4 text-teal-600"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowUpgradeModal(false)}
                                    className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                    انصراف
                                </button>
                                <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                                    پرداخت و ارتقا
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
