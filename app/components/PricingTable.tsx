import React from "react";

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

export default function PricingTable() {
    return (
        <section id="prices" className="mx-40 my-16 relative">
            {/* Header and pricing cards */}
            <div className="sticky top-0 z-10 pt-6 pb-8 -mx-8 px-8 rounded-2xl backdrop-blur-xl">
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-1">
                        <div className="w-full min-h-full bg-teal-600 shadow-xl shadow-teal-600/40 text-white rounded-3xl p-8 flex items-center justify-center">
                            <div>
                                <h3 className="font-bold text-xl text-center">نیاز به مشاوره دارید؟</h3>
                                <p className="text-justify my-3">میتوانید به صورت رایگان برای سیستم مدیریت کافه خود مشاوره دریافت کنید</p>
                                <div className="text-center">
                                    <button className="text-teal-600 bg-white rounded-2xl py-2.5 px-6 shadow-xl shadow-white/20 font-bold">تماس با ما</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`col-span-1 bg-white rounded-3xl border border-gray-200 p-8 shadow-xl ${plan.highlight ? "border-teal-600 scale-105" : ""
                                }`}
                        >
                            <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? "text-teal-600" : ""}`}>
                                {plan.title}
                            </h3>
                            <div className="text-3xl font-black mb-1">{plan.price}</div>
                            <div className="text-gray-500 text-sm mb-4">تومان / {plan.period}</div>
                            <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                            <button
                                className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${plan.highlight
                                    ? "bg-teal-600 text-white hover:bg-teal-700"
                                    : "border border-teal-600 text-teal-600 hover:bg-teal-50"
                                    }`}
                            >
                                انتخاب پلن
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {/* End sticky header */}

            {/* Features comparison table */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-1">
                        <h3 className="text-lg font-bold text-gray-700 mb-6">امکانات و ویژگی‌ها</h3>
                    </div>
                    {plans.map((plan, idx) => (
                        <div key={idx} className="col-span-1">
                            <h4 className={`text-md font-bold mb-6 ${plan.highlight ? "text-teal-600" : "text-gray-700"}`}>
                                {plan.title}
                            </h4>
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
                        <div className="grid grid-cols-4 gap-6 py-6">
                            <div className="col-span-1">
                                <h4 className="text-md font-bold text-teal-600 mb-4">{category}</h4>
                            </div>
                        </div>
                        {categoryFeatures.map((feature, featureIndex) => (
                            <div key={feature.id} className="grid grid-cols-4 gap-6 py-3">
                                <div className="col-span-1">
                                    <div className="font-bold text-gray-700 mb-1">{feature.name}</div>
                                    <p className="text-sm text-gray-500">{feature.desc}</p>
                                </div>
                                {plans.map((plan) => (
                                    <div key={plan.key} className="col-span-1 flex items-center">
                                        {feature.plans.includes(plan.key) ? (
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm text-gray-700 mr-2">دارد</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <span className="text-sm text-gray-400 mr-2">ندارد</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
