'use client';

export default function Dashboard() {

    // Subscription details mock
    const activeSubscription = {
        cafeName: "کافه لبخند",
        plan: "حرفه‌ای",
        status: "فعال",
        createDate: "۱۵ شهریور ۱۴۰۲",
        expireDate: "۱۵ آبان ۱۴۰۲",
        daysLeft: 27,
        totalDays: 60,
        price: "499,000",
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

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900">داشبورد</h1>
                <p className="mt-2 text-gray-600">خلاصه وضعیت کافه شما</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-50 rounded-xl">
                            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">فروش امروز</p>
                            <h3 className="text-2xl font-bold text-gray-900">۲,۵۴۰,۰۰۰ تومان</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-50 rounded-xl">
                            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">سفارشات امروز</p>
                            <h3 className="text-2xl font-bold text-gray-900">۴۵ سفارش</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-50 rounded-xl">
                            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">مشتریان امروز</p>
                            <h3 className="text-2xl font-bold text-gray-900">۳۲ نفر</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-bold mb-2">جزئیات اشتراک</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <p><span className="font-semibold">نام کافه:</span> {activeSubscription.cafeName}</p>
                        <p><span className="font-semibold">پلن:</span> {activeSubscription.plan}</p>
                        <p><span className="font-semibold">وضعیت:</span> {activeSubscription.status}</p>
                        <p><span className="font-semibold">تاریخ شروع:</span> {activeSubscription.createDate}</p>
                        <p><span className="font-semibold">تاریخ پایان:</span> {activeSubscription.expireDate}</p>
                        <p><span className="font-semibold">روزهای باقی‌مانده:</span> {activeSubscription.daysLeft} از {activeSubscription.totalDays}</p>
                        <p><span className="font-semibold">قیمت:</span> {activeSubscription.price} تومان</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">امکانات:</p>
                        <ul className="list-disc pr-5 text-gray-700">
                            {activeSubscription.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-bold mb-2">تاریخچه پرداخت</h2>
                <div className="space-y-3">
                    {activeSubscription.paymentHistory.map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                                <p className="font-semibold">{payment.amount} تومان</p>
                                <p className="text-sm text-gray-500">{payment.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                                    {payment.status}
                                </span>
                                <span className="text-xs text-gray-400">{payment.invoiceId}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
