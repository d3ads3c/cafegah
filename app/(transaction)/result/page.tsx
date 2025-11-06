"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

// Types
type PaymentStatus = {
    message: string;
    isSuccess: boolean;
};

type TransactionParams = Record<string, string | undefined>;

// Payment status codes mapping
const PAYMENT_STATUS_MESSAGES: Record<number, PaymentStatus> = {
    [-1]: { message: "در انتظار پرداخت", isSuccess: false },
    [-2]: { message: "خطای داخلی", isSuccess: false },
    [1]: { message: "پرداخت با موفقیت انجام شد", isSuccess: true },
    [2]: { message: "پرداخت شده انجام شد اما تایید نشد", isSuccess: false },
    [3]: { message: "لغوشده توسط کاربر", isSuccess: false },
    [4]: { message: "شماره کارت نامعتبر می‌باشد", isSuccess: false },
    [5]: { message: "موجودی حساب کافی نمی‌باشد", isSuccess: false },
    [6]: { message: "رمز واردشده اشتباه می‌باشد", isSuccess: false },
    [7]: { message: "تعداد درخواست‌ها بیش از حد مجاز می‌باشد", isSuccess: false },
    [8]: { message: "تعداد پرداخت اینترنتی روزانه بیش از حد مجاز می‌باشد", isSuccess: false },
    [9]: { message: "مبلغ پرداخت اینترنتی روزانه بیش از حد مجاز می‌باشد", isSuccess: false },
    [10]: { message: "صادرکننده‌ی کارت نامعتبر می‌باشد", isSuccess: false },
    [11]: { message: "خطای سوییچ", isSuccess: false },
    [12]: { message: "کارت قابل دسترسی نمی‌باشد", isSuccess: false },
    [15]: { message: "تراکنش استرداد شده", isSuccess: false },
    [16]: { message: "تراکنش در حال استرداد", isSuccess: false },
    [18]: { message: "تراکنش ریورس شده", isSuccess: false }
};

function parseSearchParams(sp: URLSearchParams): TransactionParams {
    const out: TransactionParams = {};
    for (const [k, v] of sp.entries()) out[k] = v;
    return out;
}

function getTransactionStatus(params: TransactionParams): PaymentStatus {
    const statusCode = params.status ? parseInt(params.status) : -1;
    const isSuccess = params.success === "1";
    return (
        PAYMENT_STATUS_MESSAGES[statusCode] ?? {
            message: isSuccess ? "پرداخت موفقیت آمیز بود" : "پرداخت ناموفق بود",
            isSuccess
        }
    );
}

function StatusIcon({ isSuccess }: { isSuccess: boolean }) {
    return isSuccess ? (
        <i className="fi fi-sr-badge-check text-[6rem] text-emerald-400 mx-auto" />
    ) : (
        <i className="fi fi-sr-cross-circle text-[6rem] text-red-500 mx-auto" />
    );
}

function TransactionDetails({ params }: { params: TransactionParams }) {
    return (
        <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="w-full border-l border-gray-100">
                <p className="text-sm text-gray-400">فاکتور</p>
                <h3 className="font-bold">{params.orderId || "-"}</h3>
            </div>
            <div className="w-full border-l border-gray-100">
                <p className="text-sm text-gray-400">مبلغ</p>
                <h3 className="font-bold">{params.amount || "-"}</h3>
            </div>
            <div className="w-full">
                <p className="text-sm text-gray-400">شماره تراکنش</p>
                <h3 className="font-bold">{params.trackId || "-"}</h3>
            </div>
        </div>
    );
}

export default function PayResult() {
    const sp = useSearchParams();

    // Memoize parsed params for stability
    const params = useMemo(() => parseSearchParams(sp ?? new URLSearchParams()), [sp]);

    const status = getTransactionStatus(params);

    return (
        <div className="h-screen max-h-screen w-full flex items-center justify-center bg-[#fafafa]">
            <div className="w-[40%] max-w-[40%] bg-white rounded-2xl p-10 border border-gray-100">
                <div className="text-center">
                    <StatusIcon isSuccess={status.isSuccess} />
                    <h1 className={`${status.isSuccess ? "text-emerald-400" : "text-red-500"} text-xl font-black -mt-7 mb-3`}>
                        {status.message}
                    </h1>
                    {!status.isSuccess && (
                        <p>در صورتی که پول از حساب شما کم شده باشد پول به مدت حداکثر ۷۲ ساعت با حساب شما توسط بانک باز میگردد. در غیر این صورت با پشتیبانی کافه گاه در ارتباط باشید.</p>
                    )}
                </div>

                {status.isSuccess && <TransactionDetails params={params} />}

                <div className="text-center mt-14">
                    <Link href="/dashboard" className="bg-teal-600 text-white rounded-2xl text-center py-3 px-10 font-bold duration-150 hover:shadow-xl hover:shadow-teal-600/40">
                        بازگشت به داشبورد
                    </Link>
                </div>
            </div>
        </div>
    );
}
