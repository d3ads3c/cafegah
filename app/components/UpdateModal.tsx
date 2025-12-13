'use client';

import { useState, useEffect } from 'react';

type UpdateModalProps = {
    serial?: string;
    onActivate?: (serial?: string) => void;
    onClose?: () => void;
};

export default function UpdateModal({ serial: initialSerial, onActivate, onClose }: UpdateModalProps) {
    const [activeStep, setActiveStep] = useState<number>(-1);
    const [isActivating, setIsActivating] = useState(false);
    const [serial, setSerial] = useState<string | undefined>(initialSerial);

    const steps = [
        'تنظیمات امنیتی',
        'فعال سازی کاربر',
        'ساخت پایگاه داده',
        'فعال سازی قابلیت ها',
    ];

    useEffect(() => {
        if (!isActivating) return;

        if (activeStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setActiveStep(prev => prev + 1);
            }, 3000);

            return () => clearTimeout(timer);
        } else if (activeStep === steps.length - 1) {
            // All steps complete, now check the result and refresh if successful
            (async () => {
                try {
                    const res = await fetch("/api/subscriptions/activate", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ "Serial": serial }),
                    });

                    const data = await res.json();
                    console.log('Activation result:', data);

                    if (data.Status === "Success") {
                        // Refresh the page
                        window.location.reload();
                    }
                } catch (err) {
                    console.error("[UpdateModal] activation error:", err);
                }

                setIsActivating(false);
            })();
        }
    }, [activeStep, isActivating, steps.length, serial]);

    const handleStartActivation = () => {
        // Use the serial value when starting activation
        console.log('Starting activation for serial:', serial);
        onActivate?.(serial);
        setActiveStep(0);
        setIsActivating(true);
    };

    return (
        <div className="w-full h-screen max-h-screen p-1 flex items-center justify-center backdrop-blur-lg bg-black/20 z-30 fixed top-0 right-0">
            <div className="w-full xl:w-[30%] xl:max-w-[30%] rounded-3xl p-8 bg-white relative">
                <button
                    type="button"
                    aria-label="Close"
                    onClick={() => onClose?.()}
                    disabled={isActivating}
                    className={`absolute top-4 left-4 text-2xl rounded-md p-2 text-gray-600 hover:bg-gray-100 ${isActivating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    ×
                </button>
                <div className="flex items-center gap-2">
                    <div className="size-16 rounded-full bg-emerald-100 text-emerald-400 flex items-center justify-center text-[2rem]">
                        <i className="fi fi-sr-module mt-4.5"></i>
                    </div>
                    <div>
                        <h2 className="font-bold">شروع و راه اندازی اولیه</h2>
                        <p className="text-sm text-gray-400">نسخه 1.02</p>
                    </div>
                </div>
                <div className="w-full text-center bg-teal-100 text-teal-500 p-5 rounded-2xl font-bold mt-5">
                    <p>از اینکه نرم افزار گافه گاه را انتخاب و تهیه کردید از شما سپاسگزاریم.</p>
                </div>
                <div className="w-full gap-3 mt-3 rounded-2xl p-3">
                    <h2 className="text-sm font-bold">راه اندازی اولیه</h2>
                    <ul className="space-y-2 text-sm mt-2 max-h-[300px] overflow-auto">
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                className={`flex gap-1 px-2 py-3 rounded-xl transition-colors duration-300 ${index <= activeStep && activeStep >= 0
                                    ? 'bg-teal-100'
                                    : 'bg-gray-50'
                                    }`}
                            >
                                {/* <i className="fi fi-sr-dot-circle text-teal-600 mt-1"></i> */}
                                <p className={`${index <= activeStep && activeStep >= 0
                                    ? 'text-teal-600 font-semibold'
                                    : 'text-gray-500'
                                    }`}>
                                    {step}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-5">
                    <div className="rounded-xl p-3 text-red-400 bg-red-100 text-sm font-bold">
                        <h3>در هنگام را اندازی مرورگر و یا صفحه سایت را نبدید</h3>
                    </div>
                </div>
                <div className="mt-5 space-y-3">
                    <button
                        type="button"
                        onClick={handleStartActivation}
                        disabled={isActivating}
                        className={`py-3 w-full rounded-xl font-bold duration-150 ${isActivating
                            ? 'bg-teal-400 text-white cursor-not-allowed'
                            : 'bg-teal-600 text-white hover:shadow-xl hover:shadow-teal-600/40 cursor-pointer'
                            }`}
                    >
                        {isActivating ? 'در حال فعالسازی...' : 'شروع فعالسازی'}
                    </button>
                </div>
            </div>
        </div>
    )
}