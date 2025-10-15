"use client"
import React, { useState } from "react";

const features = [
    {
        id: 1,
        category: "مدیریت منو",
        name: "مدیریت منو دیجیتال",
        desc: "ایجاد و مدیریت منو دیجیتال با قابلیت آپدیت آنی",
        plans: ["پایه", "حرفه‌ای", "ویژه"]
    },
    {
        id: 2,
        category: "مدیریت منو",
        name: "دسته‌بندی هوشمند",
        desc: "دسته‌بندی منو با قابلیت فیلترینگ پیشرفته",
        plans: ["پایه", "حرفه‌ای", "ویژه"]
    },
    {
        id: 3,
        category: "مدیریت منو",
        name: "عکس و توضیحات",
        desc: "افزودن تصاویر و توضیحات کامل برای هر آیتم",
        plans: ["پایه", "حرفه‌ای", "ویژه"]
    },
    {
        id: 4,
        category: "مالی",
        name: "ثبت فاکتور",
        desc: "ثبت و مدیریت فاکتورها به صورت دیجیتال",
        plans: ["پایه", "حرفه‌ای", "ویژه"]
    },
    {
        id: 5,
        category: "مالی",
        name: "گزارش‌های مالی",
        desc: "گزارش‌های جامع از عملکرد مالی کافه",
        plans: ["حرفه‌ای", "ویژه"]
    },
    {
        id: 6,
        category: "مالی",
        name: "حسابداری پیشرفته",
        desc: "سیستم حسابداری کامل با قابلیت صدور اسناد",
        plans: ["ویژه"]
    },
    {
        id: 7,
        category: "مدیریت سفارشات",
        name: "ثبت سفارش دیجیتال",
        desc: "ثبت سفارشات به صورت دیجیتال و ارسال به آشپزخانه",
        plans: ["پایه", "حرفه‌ای", "ویژه"]
    },
    {
        id: 8,
        category: "مدیریت سفارشات",
        name: "پیگیری سفارشات",
        desc: "امکان پیگیری وضعیت سفارشات در لحظه",
        plans: ["پایه", "حرفه‌ای", "ویژه"]
    },
    {
        id: 9,
        category: "مدیریت سفارشات",
        name: "سفارش آنلاین",
        desc: "امکان ثبت سفارش آنلاین توسط مشتریان",
        plans: ["حرفه‌ای", "ویژه"]
    },
    {
        id: 10,
        category: "مشتریان",
        name: "مدیریت مشتریان",
        desc: "سیستم مدیریت ارتباط با مشتری (CRM)",
        plans: ["حرفه‌ای", "ویژه"]
    },
    {
        id: 11,
        category: "مشتریان",
        name: "برنامه وفاداری",
        desc: "سیستم امتیازدهی و پاداش به مشتریان",
        plans: ["حرفه‌ای", "ویژه"]
    },
    {
        id: 12,
        category: "مشتریان",
        name: "نظرسنجی مشتریان",
        desc: "جمع‌آوری و مدیریت بازخورد مشتریان",
        plans: ["حرفه‌ای", "ویژه"]
    },
    {
        id: 13,
        category: "اپلیکیشن",
        name: "اپلیکیشن موبایل",
        desc: "دسترسی به سیستم از طریق اپلیکیشن موبایل",
        plans: ["حرفه‌ای", "ویژه"]
    },
    {
        id: 14,
        category: "اپلیکیشن",
        name: "اپلیکیشن اختصاصی",
        desc: "اپلیکیشن موبایل اختصاصی با برند شما",
        plans: ["ویژه"]
    },
    {
        id: 15,
        category: "گزارشات",
        name: "گزارشات پایه",
        desc: "گزارش‌های اولیه از عملکرد کافه",
        plans: ["پایه", "حرفه‌ای", "ویژه"]
    },
    {
        id: 16,
        category: "گزارشات",
        name: "گزارشات پیشرفته",
        desc: "گزارش‌های تحلیلی و آماری پیشرفته",
        plans: ["حرفه‌ای", "ویژه"]
    },
    {
        id: 17,
        category: "گزارشات",
        name: "داشبورد مدیریتی",
        desc: "داشبورد جامع مدیریتی با نمودارهای تحلیلی",
        plans: ["ویژه"]
    },
    {
        id: 18,
        category: "پشتیبانی",
        name: "پشتیبانی پایه",
        desc: "پشتیبانی از طریق تیکت و ایمیل",
        plans: ["پایه", "حرفه‌ای", "ویژه"]
    },
    {
        id: 19,
        category: "پشتیبانی",
        name: "پشتیبانی ویژه",
        desc: "پشتیبانی تلفنی و آنلاین 12 ساعته",
        plans: ["حرفه‌ای", "ویژه"]
    },
    {
        id: 20,
        category: "پشتیبانی",
        name: "پشتیبانی اختصاصی",
        desc: "پشتیبانی 24/7 با کارشناس اختصاصی",
        plans: ["ویژه"]
    }
];

const plans = [
    {
        title: "پلن پایه",
        key: "پایه",
        price: "2.999,000",
        period: "سالانه",
        description: "مناسب برای کافه‌های کوچک",
        highlight: false
    },
    {
        title: "پلن حرفه‌ای",
        key: "حرفه‌ای",
        price: "3,999,000",
        period: "سالانه",
        description: "مناسب برای کافه‌های متوسط",
        highlight: true
    },
    {
        title: "پلن ویژه",
        key: "ویژه",
        price: "5,999,000",
        period: "سالانه",
        description: "مناسب برای کافه‌های بزرگ",
        highlight: false
    }
];

const PricingTable: React.FC = () => {
    const [modalPlan, setModalPlan] = useState<null | typeof plans[0]>(null);
    // Get features for a plan
    const getPlanFeatures = (planKey: string) => {
        return features.filter(f => f.plans.includes(planKey));
    };
    return (
        <section id="prices" className="mx-2 sm:mx-6 md:mx-16 lg:mx-40 my-10 sm:my-14 md:my-16 relative">
            {/* Header and pricing cards */}
            <div className="sticky top-0 z-10 pt-4 sm:pt-6 pb-6 sm:pb-8 -mx-2 sm:-mx-6 md:-mx-8 px-2 sm:px-6 md:px-8 rounded-2xl backdrop-blur-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="col-span-1 mb-4 md:mb-0">
                        <div className="w-full min-h-full bg-teal-600 shadow-xl shadow-teal-600/40 text-white rounded-3xl p-5 sm:p-8 flex items-center justify-center">
                            <div>
                                <h3 className="font-bold text-lg sm:text-xl text-center">نیاز به مشاوره دارید؟</h3>
                                <p className="text-justify my-2 sm:my-3 text-xs sm:text-base">میتوانید به صورت رایگان برای سیستم مدیریت کافه خود مشاوره دریافت کنید</p>
                                <div className="text-center">
                                    <button className="text-teal-600 bg-white rounded-2xl py-2 px-4 sm:py-2.5 sm:px-6 shadow-xl shadow-white/20 font-bold text-xs sm:text-base">تماس با ما</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`col-span-1 bg-white rounded-3xl border border-gray-200 p-5 sm:p-8 shadow-xl ${plan.highlight ? "border-teal-600 md:scale-105" : ""}`}
                        >
                            <h3 className={`text-lg sm:text-xl font-bold mb-2 ${plan.highlight ? "text-teal-600" : ""}`}>{plan.title}</h3>
                            <div className="text-2xl sm:text-3xl font-black mb-1">{plan.price}</div>
                            <div className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">تومان / {plan.period}</div>
                            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">{plan.description}</p>
                            <button
                                className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${plan.highlight
                                    ? "bg-teal-600 text-white hover:bg-teal-700"
                                    : "border border-teal-600 text-teal-600 hover:bg-teal-50"
                                    }`}
                            >
                                انتخاب پلن
                            </button>
                            {/* Mobile: Show features button */}
                            <button
                                className="block sm:hidden w-full mt-2 py-3 rounded-xl font-bold border border-teal-600 text-teal-600 bg-white hover:bg-teal-50 transition-all text-sm"
                                onClick={() => setModalPlan(plan)}
                            >
                                مشاهده امکانات
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {/* End sticky header */}

            {/* Features comparison table */}
            <div className="bg-white hidden md:block rounded-3xl border border-gray-200 p-2 sm:p-4 md:p-8 overflow-x-auto">
                <div className="min-w-[600px] md:min-w-0">
                    <div className="grid grid-cols-4 gap-4 sm:gap-6">
                        <div className="col-span-1">
                            <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">امکانات و ویژگی‌ها</h3>
                        </div>
                        {plans.map((plan, idx) => (
                            <div key={idx} className="col-span-1">
                                <h4 className={`text-sm sm:text-md font-bold mb-4 sm:mb-6 ${plan.highlight ? "text-teal-600" : "text-gray-700"}`}>{plan.title}</h4>
                            </div>
                        ))}
                    </div>

                    {Object.entries(
                        features.reduce((acc, feature) => {
                            if (!acc[feature.category]) {
                                acc[feature.category] = [];
                            }
                            acc[feature.category].push(feature);
                            return acc;
                        }, {} as Record<string, typeof features>)
                    ).map(([category, categoryFeatures], categoryIndex, categoriesArray) => (
                        <div key={category} className={categoryIndex !== categoriesArray.length - 1 ? "border-b border-gray-100" : ""}>
                            <div className="grid grid-cols-4 gap-4 sm:gap-6 py-4 sm:py-6">
                                <div className="col-span-1">
                                    <h4 className="text-sm sm:text-md font-bold text-teal-600 mb-2 sm:mb-4">{category}</h4>
                                </div>
                            </div>
                            {categoryFeatures.map((feature, featureIndex) => (
                                <div key={feature.id} className="grid grid-cols-4 gap-4 sm:gap-6 py-2 sm:py-3">
                                    <div className="col-span-1">
                                        <div className="font-bold text-gray-700 mb-1 text-xs sm:text-base">{feature.name}</div>
                                        <p className="text-xs sm:text-sm text-gray-500">{feature.desc}</p>
                                    </div>
                                    {plans.map((plan) => (
                                        <div key={plan.key} className="col-span-1 flex items-center">
                                            {feature.plans.includes(plan.key) ? (
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm text-gray-700 mr-2">دارد</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm text-gray-400 mr-2">ندارد</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal for plan features (mobile) */}
            {modalPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full mx-2 h-[70%] relative animate-fade-in">
                        <button
                            className="absolute left-4 top-4 text-gray-400 hover:text-gray-700 text-2xl"
                            onClick={() => setModalPlan(null)}
                            aria-label="بستن"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold mb-4 text-gray-900 text-center">امکانات {modalPlan.title}</h2>
                        <ul className="space-y-3 max-h-[90%] overflow-y-auto pr-2">
                            {getPlanFeatures(modalPlan.key).map((feature) => (
                                <li key={feature.id} className="border-b border-gray-200 last:border-b-0 pb-2">
                                    <div className="font-bold text-gray-700 text-sm mb-1">{feature.name}</div>
                                    <div className="text-xs text-gray-500">{feature.desc}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
}

export default PricingTable;
