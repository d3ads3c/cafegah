"use client"
import React, { useState } from 'react';

const faqs = [
    {
        id: 1,
        question: "چگونه می‌توانم از کافه گاه استفاده کنم؟",
        answer: "استفاده از کافه گاه بسیار ساده است. پس از ثبت‌نام و انتخاب پلن مناسب، می‌توانید بلافاصله شروع به استفاده از سیستم کنید. ما یک راهنمای کامل و آموزش‌های ویدیویی برای شروع کار در اختیار شما قرار می‌دهیم."
    },
    {
        id: 2,
        question: "آیا نیاز به نصب نرم‌افزار خاصی دارم؟",
        answer: "خیر، کافه گاه یک نرم‌افزار تحت وب است و تنها به یک مرورگر و اینترنت نیاز دارید. برای استفاده از اپلیکیشن موبایل، می‌توانید آن را مستقیماً از فروشگاه‌های اپلیکیشن دانلود کنید."
    },
    {
        id: 3,
        question: "آیا می‌توانم پلن خود را ارتقا دهم؟",
        answer: "بله، شما می‌توانید در هر زمان پلن خود را به نسخه‌های بالاتر ارتقا دهید. تفاوت قیمت برای دوره باقی‌مانده محاسبه خواهد شد."
    },
    {
        id: 4,
        question: "چه مدت زمانی برای راه‌اندازی نیاز است؟",
        answer: "راه‌اندازی اولیه کافه گاه معمولاً کمتر از یک ساعت زمان می‌برد. تیم پشتیبانی ما در تمام مراحل راه‌اندازی در کنار شما خواهد بود."
    },
    {
        id: 5,
        question: "آیا امکان سفارشی‌سازی وجود دارد؟",
        answer: "بله، در پلن‌های حرفه‌ای و ویژه امکان سفارشی‌سازی بخش‌های مختلف سیستم وجود دارد. در پلن ویژه می‌توانید از خدمات سفارشی‌سازی کامل استفاده کنید."
    },
    {
        id: 6,
        question: "داده‌های من چگونه محافظت می‌شوند؟",
        answer: "امنیت داده‌های شما برای ما بسیار مهم است. ما از پروتکل‌های رمزنگاری پیشرفته و سیستم‌های پشتیبان‌گیری خودکار استفاده می‌کنیم. همچنین، تمام داده‌ها در مراکز داده امن نگهداری می‌شوند."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mx-40 my-16" id='faq'>
            <div className="text-center mb-12">
                <h2 className="text-2xl font-black text-teal-600 mb-4">سوالات متداول</h2>
                <p className="text-gray-500">پاسخ سوالات رایج شما درباره کافه گاه</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                    <div 
                        key={faq.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className={`w-full text-right p-6 flex items-start justify-between gap-4 transition-all duration-200 ${
                                openIndex === index 
                                    ? "bg-teal-600 hover:bg-teal-700" 
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex-grow">
                                <h3 className={`font-bold mb-2 ${
                                    openIndex === index ? "text-white" : "text-gray-700"
                                }`}>{faq.question}</h3>
                                <div 
                                    className={`text-sm overflow-hidden transition-all duration-300 ${
                                        openIndex === index ? "max-h-40 text-white/90" : "max-h-0 text-gray-500"
                                    }`}
                                >
                                    {faq.answer}
                                </div>
                            </div>
                            <div className="flex-shrink-0 mt-1">
                                <svg 
                                    className={`w-5 h-5 transition-transform duration-200 ${
                                        openIndex === index ? "transform rotate-180 text-white" : "text-teal-600"
                                    }`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
