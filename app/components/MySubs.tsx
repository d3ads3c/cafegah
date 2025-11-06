"use client"
import ProgressBar from "./ui/ProgressBar"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MySubscriptions } from "@/types/AllTypes";

export default function MySubs() {
    // const [subs, setSubs] = useState<MySubscriptions[]>({
    //     ID: "",
    //     Plan: "",
    //     Status: "",
    //     Phone: "",
    //     Email: "",
    //     CafeName: "",
    //     Users: "",
    //     Serial: "",
    //     BuyDate: "",
    //     Days: ""
    // })
    const [subs, setSubs] = useState<MySubscriptions[] | null>(null)
    const GetSubs = async () => {
        try {
            const res = await fetch("/api/subscriptions/my", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            const data = await res.json();
            console.log(data)
            setSubs(data)
        } catch (err) {
            console.error("[AuthChecker] fetch error:", err);
        }
    };

    useEffect(() => {
        GetSubs()
    }, [])

    return (
        <div className="my-5">
            <div className="">
                <h2 className="text-lg font-bold text-gray-900">اشتراک های من</h2>
            </div>
            <div className="mt-4 flex w-full overflow-auto gap-5">
                {subs && subs.length > 0 ? (
                    subs.map((s) => (
                        <div key={s.ID ?? s.Serial ?? `${s.CafeName}-${Math.random()}`} className="w-[450px] min-w-[450px] rounded-2xl bg-white border border-gray-100 p-4">
                            <div className="flex items-center gap-3">
                                <div>
                                    <div className="size-16 rounded-2xl bg-teal-100 flex items-center justify-center">
                                        <i className="fi fi-sr-store-alt text-2xl text-teal-500 mt-2"></i>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="font-bold">{s.CafeName || 'بدون نام'}</h2>
                                            <p className="text-gray-400 text-xs">{s.Plan || '-'}</p>
                                        </div>
                                        <div className={`${s.Status === 'active' ? 'bg-teal-100 text-teal-500' : s.Status === 'pending' ? 'bg-orange-100 text-orange-500' : 'bg-gray-100 text-gray-500'} rounded-xl py-1 px-3`}>
                                            <p className="font-bold text-sm">{s.Status === 'active' ? 'فعال' : s.Status === 'pending' ? 'غیرفعال' : s.Status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-3">
                                <ProgressBar progress={0} days={Number(s.Days ?? 0)} />
                            </div>
                            <div className="w-full rounded-xl p-4 bg-orange-100 text-orange-400 text-center">
                                <p>فاکتور شما آماده پرداخت می باشد</p>
                            </div>
                            <div className="flex items-center justify-center gap-4 mt-5">
                                {s.Status === 'active' ? (
                                    <>
                                        <Link href={"#"} className="bg-teal-600 text-white rounded-xl py-3 w-1/2 text-center font-bold text-sm">ورود به پنل</Link>
                                        <Link href={"#"} className="border border-teal-600 text-teal-600 rounded-xl py-3 w-1/2 text-center font-bold text-sm">مدیریت اشتراک</Link>
                                    </>

                                ) : s.Status === 'pending' && (
                                    <>
                                        <Link href={"#"} className="bg-teal-600 text-white rounded-xl py-3 w-full text-center font-bold text-sm">مشاهده و پرداخت</Link>
                                    </>
                                )}

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-400">اشتراکی یافت نشد</div>
                )}

                <Link href={"/dashboard/subscription/new"} className="w-[450px] min-w-[450px] duration-150 rounded-2xl bg-teal-50 cursor-pointer border border-teal-500 border-dashed p-4 flex items-center justify-center hover:border-solid hover:bg-teal-600 hover:[&_*>*]:text-white">
                    <div className="text-center">
                        <i className="fi fi-sr-add text-teal-600 text-2xl"></i>
                        <h3 className="font-bold text-lg -mt-1 mb-1">اشتراک جدید</h3>
                        <p className="text-xs text-gray-400">جهت دریافت اشتراک نرم افزار جدید برای کافه</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}