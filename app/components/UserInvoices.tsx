"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MyInvoicesType } from "@/types/AllTypes";
export default function MyInvoices() {
    const [invoices, setInvoices] = useState<MyInvoicesType[] | null>(null)
    const GetInvoices = async () => {
        try {
            const res = await fetch("/api/invoices/my", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            const data = await res.json();
            setInvoices(data)
        } catch (err) {
            console.error("[AuthChecker] fetch error:", err);
        }
    };

    useEffect(() => {
        GetInvoices()
    }, [])

    const formatPrice = (price?: string) => {
        if (!price) return '-';
        // strip any non-digit characters (commas, spaces, currency symbols)
        const digits = String(price).replace(/[^0-9.-]+/g, '');
        const num = Number(digits);
        if (Number.isNaN(num)) return price;
        // use en-US to get comma as thousands separator (e.g. 4,999,000)
        return num.toLocaleString('en-US');
    }
    return (

        <div className="w-full rounded-2xl border border-gray-100 p-4 bg-white">
            <div className="border-b border-gray-100 pb-3">
                <h2 className="font-bold text-gray-900">فاکتور های من</h2>
            </div>
            <div className="space-y-4 max-h-[300px] h-[300px] overflow-auto pt-5">
                {invoices && invoices.length > 0 ? (
                    invoices.map((inv) => (
                        <div key={inv.ID} className="w-full flex gap-3 items-center">
                            <div className="w-1/5">
                                <p className="text-xs text-gray-400">شماره فاکتور</p>
                                <p className="text-sm font-bold">{inv.ID}</p>
                            </div>
                            <div className="w-1/5">
                                <p className="text-xs text-gray-400">تاریخ صدور</p>
                                <p className="text-sm font-bold">{inv.Date || inv.BuyDate || '-'}</p>
                            </div>
                            <div className="w-1/5">
                                <p className="text-xs text-gray-400">مبلغ</p>
                                <p className="text-sm font-bold">{formatPrice(inv.Price)} تومان</p>
                            </div>
                            <div className="w-1/5">
                                <p className="text-xs text-gray-400">وضعیت</p>
                                <div className={`${inv.Status === 'paid' || inv.Status === 'پرداخت شده' ? 'bg-emerald-100 text-emerald-500' : inv.Status === 'pending' || inv.Status === 'در انتظار' ? 'bg-orange-100 text-orange-500' : 'bg-gray-100 text-gray-500'} rounded-lg py-1 px-3.5 font-bold w-fit text-xs`}>
                                    <p>{inv.Status === 'paid' ? 'پرداخت شده' : inv.Status === 'pending' ? 'در انتظار' : inv.Status}</p>
                                </div>
                            </div>
                            <div className="w-1/5">
                                <Link href={`/invoice/${inv.ID}`} className="border border-teal-600 text-teal-600 rounded-xl py-1 px-4 text-xs font-bold">مشاهده</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-400">فاکتوری یافت نشد</div>
                )}
            </div>
        </div>
    )
}