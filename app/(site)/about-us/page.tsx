import React from 'react';
import Image from 'next/image';

const teamMembers = [
    {
        name: 'علی محمدی',
        role: 'مدیرعامل',
        image: '/img/team/ali.jpg',
        description: 'بیش از ۱۰ سال تجربه در صنعت نرم‌افزار و مدیریت کسب و کار'
    },
    {
        name: 'سارا حسینی',
        role: 'مدیر محصول',
        image: '/img/team/sara.jpg',
        description: 'متخصص در طراحی محصول و تجربه کاربری با ۸ سال سابقه'
    },
    {
        name: 'محمد رضایی',
        role: 'مدیر فنی',
        image: '/img/team/mohammad.jpg',
        description: 'متخصص در توسعه نرم‌افزارهای تحت وب و معماری نرم‌افزار'
    },
    {
        name: 'مریم کریمی',
        role: 'مدیر پشتیبانی',
        image: '/img/team/maryam.jpg',
        description: 'کارشناس ارشد مدیریت ارتباط با مشتری و پشتیبانی فنی'
    }
];

const stats = [
    { name: 'کافه‌های فعال', value: '137' },
    { name: 'سفارش‌های روزانه', value: '5,000+' },
    { name: 'رضایت مشتریان', value: '98٪' },
    { name: 'درخواست های انجام شده', value: '19' },
];

export default function About() {
    return (
        <main>
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/90 to-teal-800/90 z-0" />
                <div className="absolute inset-0 bg-[url('/img/about-hero.jpg')] bg-cover bg-center mix-blend-overlay" />
                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <h1 className="text-4xl font-black text-white mb-6">
                        داستان کافه گاه
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        ما با هدف ساده‌سازی مدیریت کافه‌ها شروع کردیم. امروز، به یکی از پیشگامان صنعت نرم‌افزارهای مدیریت کافه تبدیل شده‌ایم.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 mb-6">
                                مأموریت ما
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    در کافه گاه، ما معتقدیم که مدیریت کافه باید ساده، هوشمند و کارآمد باشد. ما به دنبال ارائه راهکارهایی هستیم که به صاحبان کافه‌ها کمک می‌کند تا بر روی مهمترین بخش کارشان تمرکز کنند: ارائه تجربه‌ای عالی به مشتریان.
                                </p>
                                <p>
                                    با استفاده از فناوری‌های پیشرفته و طراحی کاربرپسند، ما پلتفرمی را توسعه داده‌ایم که تمام جنبه‌های مدیریت کافه را یکپارچه می‌کند و به شما امکان می‌دهد تا کسب و کار خود را با اطمینان مدیریت کنید.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/img/about-us.jpg"
                                alt="مأموریت کافه گاه"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.name}
                                className="text-center"
                            >
                                <dt className="text-sm font-semibold text-gray-600">
                                    {stat.name}
                                </dt>
                                <dd className="mt-2 text-3xl font-black text-teal-600">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Team Section */}
            {/* <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">
                            تیم ما
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            تیم ما متشکل از متخصصان با تجربه در زمینه‌های مختلف است که با اشتیاق برای بهبود صنعت کافه‌داری تلاش می‌کنند.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="text-center">
                                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                <p className="text-teal-600 font-medium mb-2">{member.role}</p>
                                <p className="text-sm text-gray-600">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Values Section */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">
                            ارزش‌های ما
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            ارزش‌های ما هسته اصلی فرهنگ سازمانی و محصولات ما را تشکیل می‌دهند.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200">
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">نوآوری</h3>
                            <p className="text-gray-600">
                                همواره به دنبال راه‌های جدید و خلاقانه برای بهبود تجربه کاربری و کارایی سیستم هستیم.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-200">
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">مشتری‌مداری</h3>
                            <p className="text-gray-600">
                                رضایت و موفقیت مشتریان ما اولویت اصلی ماست و تمام تلاش خود را برای تحقق این هدف انجام می‌دهیم.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-200">
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">قابل اعتماد</h3>
                            <p className="text-gray-600">
                                با ارائه خدمات پایدار و امن، اعتماد مشتریان را جلب می‌کنیم و به تعهدات خود پایبند هستیم.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
