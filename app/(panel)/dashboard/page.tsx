'use client';
import ProgressBar from "@/app/components/ui/ProgressBar";
import Link from "next/link";
import UpdateModal from "@/app/components/UpdateModal";
export default function Dashboard() {

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900">داشبورد</h1>
                <p className="mt-2 text-gray-600">مدیریت نرم افزار</p>
            </div>
            <div className="w-full my-5 rounded-2xl p-4 bg-orange-100 text-orange-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-orange-500"></span>
                    </span>
                    <h3 className="font-bold text-sm">جهت فعالسازی و خرید اشتراک اطلاعات اکانت خود را کامل کنید.</h3>
                </div>
                <div>
                    <Link href={"#"} className="bg-white rounded-xl py-2 px-5 text-orange-500 text-sm font-bold">تکمیل اطلاعات</Link>
                </div>
            </div>
            <div className="my-5">
                <div className="">
                    <h2 className="text-lg font-bold text-gray-900">اشتراک های من</h2>
                </div>
                <div className="mt-4 flex w-full overflow-auto gap-5">
                    <div className="w-[450px] min-w-[450px] rounded-2xl bg-white border border-gray-100 p-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <div className="size-16 rounded-2xl bg-teal-100 flex items-center justify-center">
                                    <i className="fi fi-sr-store-alt text-2xl text-teal-500 mt-2"></i>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-bold">کافه ای</h2>
                                        <p className="text-gray-400 text-xs">پلن ویژه</p>
                                    </div>
                                    <div className="bg-teal-100 text-teal-500 rounded-xl py-1 px-3">
                                        <p className="font-bold text-sm">فعال</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <ProgressBar progress={70} />
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-5">
                            <div className="">
                                <p className="text-xs text-gray-400">نسخه نرم افزار</p>
                                <p className="text-sm font-bold">۱.۳</p>
                            </div>
                            <button type="button" className="flex items-center justify-center gap-1 border border-teal-600 text-teal-600 rounded-xl py-1 px-3 hover:bg-teal-600 hover:text-white duration-150 cursor-pointer">
                                <i className="fi fi-sr-refresh mt-1.5 text-sm"></i>
                                <p className="text-sm">به‌روزرسانی</p>
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-5">
                            <Link href={"#"} className="bg-teal-600 text-white rounded-xl py-3 w-1/2 text-center font-bold text-sm">ورود به پنل</Link>
                            <Link href={"#"} className="border border-teal-600 text-teal-600 rounded-xl py-3 w-1/2 text-center font-bold text-sm">مدیریت اشتراک</Link>
                        </div>
                    </div>

                    <Link href={"/dashboard/subscription/new"} className="w-[450px] min-w-[450px] duration-150 rounded-2xl bg-teal-50 cursor-pointer border border-teal-500 border-dashed p-4 flex items-center justify-center hover:border-solid hover:bg-teal-600 hover:[&_*>*]:text-white">
                        <div className="text-center">
                            <i className="fi fi-sr-add text-teal-600 text-2xl"></i>
                            <h3 className="font-bold text-lg -mt-1 mb-1">اشتراک جدید</h3>
                            <p className="text-xs text-gray-400">جهت دریافت اشتراک نرم افزار جدید برای کافه</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex gap-5 my-7">
                <div className="w-2/3 rounded-2xl border border-gray-100 p-4 bg-white">
                    <div className="border-b border-gray-100 pb-3">
                        <h2 className="font-bold text-gray-900">فاکتور های من</h2>
                    </div>
                    <div className="space-y-4 max-h-[300px] h-[300px] overflow-auto pt-5">
                        <div className="w-full flex gap-3 items-center">
                            <div className="w-1/4">
                                <p className="text-xs text-gray-400">شماره فاکتور</p>
                                <p className="text-sm font-bold">IN-234241</p>
                            </div>
                            <div className="w-1/4">
                                <p className="text-xs text-gray-400">تاریخ صدور</p>
                                <p className="text-sm font-bold">۱۴۰۴/۰۷/۲۵</p>
                            </div>
                            <div className="w-1/4">
                                <p className="text-xs text-gray-400">مبلغ</p>
                                <p className="text-sm font-bold">۴,۹۹۹,۰۰۰ تومان</p>
                            </div>
                            <div className="w-1/4">
                                <p className="text-xs text-gray-400">وضعیت</p>
                                <div className="bg-emerald-100 text-emerald-500 rounded-lg py-1 px-3.5 font-bold w-fit text-xs">
                                    <p>پرداخت شده</p>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <Link href={"#"} className="border border-teal-600 text-teal-600 rounded-xl py-1 px-4 text-xs font-bold">مشاهده</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 rounded-2xl border border-gray-100 bg-white">
                    <div className="border-b border-gray-100 pb-3 p-4">
                        <h2 className="font-bold text-gray-900">به روزرسانی ها</h2>
                    </div>
                    <div className="space-y-4 max-h-[300px] h-[300px] overflow-auto pt-5 p-4">
                        <div className="w-full gap-3 shadow-xl rounded-2xl p-3">
                            <h2 className="text-sm font-bold">نسخه ۱.۳۱</h2>
                            <ul className="space-y-1 text-sm mt-2">
                                <li className="flex gap-1">
                                    <i className="fi fi-sr-dot-circle text-teal-600 mt-1"></i>
                                    <p className="text-gray-500">افزودن تخفیف بر هر مشتری تعریف شده</p>
                                </li>
                                <li className="flex gap-1">
                                    <i className="fi fi-sr-dot-circle text-teal-600 mt-1"></i>
                                    <p className="text-gray-500">افزودن تخفیف به صورت مبلغ تعریف شده برای مشتریان تعریف شده</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <UpdateModal />
        </>
    );
}
