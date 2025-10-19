export default function UpdateModal() {
    return (
        <div className="w-full h-screen max-h-screen flex items-center justify-center backdrop-blur-lg bg-black/20 z-30 fixed top-0 right-0">
            <div className="w-[30%] max-w-[30%] rounded-3xl p-8 bg-white">
                <div className="flex items-center gap-2">
                    <div className="size-16 rounded-full bg-emerald-100 text-emerald-400 flex items-center justify-center text-[1.5rem]">
                        <i className="fi fi-ss-refresh mt-2.5"></i>
                    </div>
                    <div>
                        <h2 className="font-bold">به روزرسانی در دسترس است</h2>
                        <p className="text-sm text-gray-400">نسخه ۱.۳۱</p>
                    </div>
                </div>
                <div className="w-full gap-3 mt-3 rounded-2xl p-3">
                    <h2 className="text-sm font-bold">امکانات جدید</h2>
                    <ul className="space-y-1 text-sm mt-2 max-h-[300px] overflow-auto">
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
                <div className="mt-5">
                    <div className="rounded-xl p-3 text-red-400 bg-red-100 text-sm font-bold">
                        <h3>در هنگام به‌روزرسانی امکان استفاده از نرم افزار امکان پذیر نیست</h3>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="button" className="bg-teal-600 text-white py-3 w-full rounded-xl font-bold hover:shadow-xl hover:shadow-teal-600/40 duration-150 cursor-pointer">شروع به روزرسانی</button>
                </div>
            </div>
        </div>
    )
}