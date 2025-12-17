"use client"
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { InvoiceDetail } from "@/types/AllTypes";
import ModalView from "@/app/components/ui/Modal";
import { useRouter } from "next/navigation";
export default function InvoicePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const [invoice, setInvoice] = useState<InvoiceDetail | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()



    useEffect(() => {
        const GetInvoice = async () => {
            try {
                const res = await fetch("/api/invoices/detail", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "Invoice": id }),
                });

                const data = await res.json();
                setInvoice(data)
            } catch (err) {
                console.error("[AuthChecker] fetch error:", err);
            }
        };
        GetInvoice()
    }, [id])

    const formatPrice = (price?: string | number) => {
        if (!price) return '-';
        // normalize to number while allowing existing formatted strings
        const digits = String(price).replace(/[^0-9.-]+/g, '');
        const num = Number(digits);
        if (Number.isNaN(num)) return String(price);
        // use en-US to get comma as thousands separator (e.g. 4,999,000)
        return num.toLocaleString('en-US');
    }

    const SubmitOrder = async () => {
        try {
            const res = await fetch("/api/payment/submit", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "Invoice": id }),
            });
            const data = await res.json();
            console.log(data)
            if (data.msg === 'Success') {
                router.push(`https://gateway.zibal.ir/start/${data.trackid}`)
            }
        } catch (err) {
            console.error("[AuthChecker] fetch error:", err);
        }
    }

    if (invoice) {
        return (
            <div className="h-screen max-h-screen w-full flex items-center justify-center bg-[#fafafa]">
                <div className="w-full xl:w-[60%] rounded-2xl p-3 bg-white">
                    <div className="bg-[#fafafa] rounded-2xl p-5">
                        <div className="">
                            <Image src={"/img/logo/FullLogo.png"} width={1000} height={1000} quality={100} className="mx-auto max-w-[150px]" alt="CafeGah Logo"></Image>
                        </div>
                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-5 border border-gray-200 rounded-2xl px-4 py-6 relative">
                            <div className="w-full">
                                <p className="text-xs text-gray-400">شماره فاکتور</p>
                                <h2 className="font-bold xl:text-sm text-xs">{invoice.Invoice.ID}</h2>
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray-400">نام مشتری</p>
                                <h2 className="font-bold xl:text-sm text-xs">{invoice.Sub.Owner}</h2>
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray-400">شماره تماس</p>
                                <h2 className="font-bold xl:text-sm text-xs">{invoice.Sub.Phone}</h2>
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray-400">کدملی</p>
                                <h2 className="font-bold xl:text-sm text-xs">{invoice.Invoice.Meli}</h2>
                            </div>
                            <div className="absolute -top-3 right-1 bg-[#fafafa] px-3">
                                <h2>اطلاعات مشتری</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-5 border border-gray-200 rounded-2xl px-4 py-6 relative">
                            <div className="w-full">
                                <p className="text-xs text-gray-400">استان</p>
                                <h2 className="font-bold xl:text-sm text-xs">{invoice.Sub.State}</h2>
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray-400">شهر</p>
                                <h2 className="font-bold xl:text-sm text-xs">{invoice.Sub.City}</h2>
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray-400">کدپستی</p>
                                <h2 className="font-bold xl:text-sm text-xs">{invoice.Sub.PostalCode}</h2>
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray-400">آدرس</p>
                                <h2 className="font-bold xl:text-sm text-xs">{invoice.Sub.Address}</h2>
                            </div>
                            <div className="absolute -top-3 right-1 bg-[#fafafa] px-3">
                                <h2>آدرس صورتحساب</h2>
                            </div>
                        </div>
                    </div>
                    <div className="my-5">
                        <div>
                            <table className="table-auto w-full">
                                <thead className="border-b border-gray-100 text-xs text-light text-gray-500">
                                    <tr>
                                        <th className="pb-3">
                                            #
                                        </th>
                                        <th className="pb-3">
                                            کالا / خدمات
                                        </th>
                                        <th className="pb-3">
                                            نام کافه
                                        </th>
                                        <th className="pb-3">
                                            قیمت
                                        </th>
                                        <th className="pb-3">
                                            توضیحات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center xl:text-sm text-xs">
                                        <td className="py-3">
                                            1
                                        </td>
                                        <td className="py-3">
                                            اشتراک نرم افزار - پلن {invoice.Sub.Plan}
                                        </td>
                                        <td className="py-3">
                                            {invoice.Sub.CafeName}
                                        </td>
                                        <td className="py-3">
                                            {formatPrice(invoice.Invoice.Price)} تومان
                                        </td>
                                        <td className="py-3">
                                            -
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-5">
                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-5 border border-gray-200 rounded-2xl px-4 py-6 relative">
                                <div className="w-full">
                                    <p className="text-xs text-gray-400">وضعیت</p>
                                    {invoice.Invoice.Status == 'payed' ? (
                                        <div className="font-bold text-sm rounded-xl py-1 px-4 bg-emerald-100 text-emerald-500 w-fit">پرداخت شده</div>
                                    ) : (
                                        <div className="font-bold text-sm rounded-xl py-1 px-4 bg-orange-100 text-orange-500 w-fit">در انتظار پرداخت</div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <p className="text-xs text-gray-400">نحوه پرداخت</p>
                                    <h2 className="font-bold text-sm">درگاه زیبال</h2>
                                </div>
                                {invoice.Invoice.Status == 'payed' && (
                                    <>
                                        <div className="w-full">
                                            <p className="text-xs text-gray-400">شماره تراکنش</p>
                                            <h2 className="font-bold text-sm">2884726890236</h2>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-xs text-gray-400">تاریخ پرداخت</p>
                                            <h2 className="font-bold text-sm">1404/07/25</h2>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-xs text-gray-400">مبلغ پرداخت</p>
                                            <h2 className="font-bold text-sm">5,350,000 تومان</h2>
                                        </div>
                                    </>
                                )}
                                <div className="absolute -top-3 right-1 bg-white px-3">
                                    <h2>اطلاعات پرداخت</h2>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 font-bold mt-6 justify-end">
                            {invoice.Invoice.Status == 'pending' && (
                                <button type="button" onClick={() => setIsModalOpen(true)} className="text-white bg-teal-500 rounded-xl py-3 px-7 flex items-center justify-center gap-2 ">
                                    <i className="fi fi-sr-credit-card mt-1.5"></i>
                                    <p>پرداخت فاکتور</p>
                                </button>
                            )}
                            <button className="text-white bg-blue-500 rounded-xl py-3 px-7 gap-2 flex items-center justify-center">
                                <i className="fi fi-sr-print mt-1.5"></i>
                                <p>چاپ فاکتور</p>
                            </button>
                        </div>
                    </div>
                </div>
                <ModalView
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    width="w-[600px]"
                    height="h-auto"
                >
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">بررسی نهایی و پرداخت</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="fi fi-sr-cross text-lg"></i>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Invoice Summary */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">شماره فاکتور</span>
                                    <span className="font-bold">{invoice.Invoice.ID}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">نام کافه</span>
                                    <span className="font-bold">{invoice.Sub.CafeName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">پلن</span>
                                    <span className="font-bold">{invoice.Sub.Plan}</span>
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="border-t border-b border-gray-100 py-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">مبلغ اشتراک</span>
                                    <span className="font-bold">{formatPrice(invoice.Invoice.Price)} تومان</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">مالیات بر ارزش افزوده</span>
                                    <span className="font-bold text-gray-400">٪۹</span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-bold">مبلغ قابل پرداخت</span>
                                    <span className="font-bold text-teal-600">{formatPrice(Number(invoice.Invoice.Price) * 1.10)} تومان</span>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-3">
                                <h3 className="font-bold">روش پرداخت</h3>
                                <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                                    <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <i className="fi fi-sr-bank text-blue-500 text-xl"></i>
                                    </div>
                                    <div>
                                        <p className="font-bold">درگاه پرداخت زیبال</p>
                                        <p className="text-xs text-gray-400">پرداخت امن با درگاه زیبال</p>
                                    </div>
                                </div>
                            </div>

                            {/* Confirmation */}
                            <div className="pt-4 space-y-4">
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        await SubmitOrder();
                                    }}
                                    className="w-full bg-teal-600 text-white rounded-xl py-3 font-bold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <i className="fi fi-sr-credit-card mt-2"></i>
                                    پرداخت {formatPrice(Number(invoice.Invoice.Price) * 1.10)} تومان
                                </button>
                            </div>

                        </div>
                    </div>
                </ModalView>
            </div>
        )
    } else {
        <div>
            return
        </div>
    }
}