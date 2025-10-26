import Image from "next/image";

export default function InvoicePage() {
    return (
        <div className="h-screen max-h-screen w-full flex items-center justify-center bg-[#fafafa]">
            <div className="w-[60%] rounded-2xl p-3 bg-white">
                <div className="bg-[#fafafa] rounded-2xl p-5">
                    <div className="">
                        <Image src={"/img/logo/FullLogo.png"} width={1000} height={1000} quality={100} className="mx-auto max-w-[150px]" alt="CafeGah Logo"></Image>
                    </div>
                    <div className="grid grid-cols-4 gap-5 mt-5 border border-gray-200 rounded-2xl px-4 py-6 relative">
                        <div className="w-full">
                            <p className="text-xs text-gray-400">شماره فاکتور</p>
                            <h2 className="font-bold text-sm">INV-24355</h2>
                        </div>
                        <div className="w-full">
                            <p className="text-xs text-gray-400">نام مشتری</p>
                            <h2 className="font-bold text-sm">آیدا فیضی</h2>
                        </div>
                        <div className="w-full">
                            <p className="text-xs text-gray-400">شماره تماس</p>
                            <h2 className="font-bold text-sm">09123333333</h2>
                        </div>
                        <div className="w-full">
                            <p className="text-xs text-gray-400">کدملی</p>
                            <h2 className="font-bold text-sm">002343421</h2>
                        </div>
                        <div className="absolute -top-3 right-1 bg-[#fafafa] px-3">
                            <h2>اطلاعات مشتری</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-5 mt-5 border border-gray-200 rounded-2xl px-4 py-6 relative">
                        <div className="w-full">
                            <p className="text-xs text-gray-400">استان</p>
                            <h2 className="font-bold text-sm">تهران</h2>
                        </div>
                        <div className="w-full">
                            <p className="text-xs text-gray-400">شهر</p>
                            <h2 className="font-bold text-sm">تهران</h2>
                        </div>
                        <div className="w-full">
                            <p className="text-xs text-gray-400">کدپستی</p>
                            <h2 className="font-bold text-sm">161545732</h2>
                        </div>
                        <div className="w-full">
                            <p className="text-xs text-gray-400">آدرس</p>
                            <h2 className="font-bold text-sm">خیابان ولیعصر، خیابان بزرگمهر، مجتمع تجاری بزرگمهر پلاک ۲۴</h2>
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
                                <tr className="text-center text-sm">
                                    <td className="py-3">
                                        1
                                    </td>
                                    <td className="py-3">
                                        اشتراک نرم افزار - پلن ویژه
                                    </td>
                                    <td className="py-3">
                                        کافه ای
                                    </td>
                                    <td className="py-3">
                                        4,999,000 تومان
                                    </td>
                                    <td className="py-3">
                                        -
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <div className="grid grid-cols-4 gap-5 mt-5 border border-gray-200 rounded-2xl px-4 py-6 relative">
                            <div className="w-full">
                                <p className="text-xs text-gray-400">وضعیت</p>
                                <div className="font-bold text-sm rounded-xl py-1 px-4 bg-emerald-100 text-emerald-500 w-fit">پرداخت شده</div>
                            </div>
                            <div className="w-full">
                                <p className="text-xs text-gray-400">نحوه پرداخت</p>
                                <h2 className="font-bold text-sm">درگاه زیبال</h2>
                            </div>
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
                            <div className="absolute -top-3 right-1 bg-white px-3">
                                <h2>اطلاعات پرداخت</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 font-bold mt-6 justify-end">
                        <button className="text-white bg-teal-500 rounded-xl py-3 px-7 flex items-center justify-center gap-2 ">
                            <i className="fi fi-sr-credit-card mt-1.5"></i>
                            <p>پرداخت فاکتور</p>
                        </button>
                        <button className="text-white bg-blue-500 rounded-xl py-3 px-7 gap-2 flex items-center justify-center">
                            <i className="fi fi-sr-print mt-1.5"></i>
                            <p>چاپ فاکتور</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}