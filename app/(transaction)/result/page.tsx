import Link from "next/link";

type Props = {
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

export default function PayResult({ searchParams }: Props) {
    // Normalize params: pick first value if array
    const params: Record<string, string | undefined> = {};
    if (searchParams) {
        Object.entries(searchParams).forEach(([k, v]) => {
            if (Array.isArray(v)) params[k] = v[0];
            else params[k] = v;
        });
    }

    // Check multiple possible param keys that may carry the status
    const rawStatusKeys = [params.status, params.state, params.result, params.status_code, params.code]
        .find(Boolean) || "";
    const status = String(rawStatusKeys).toLowerCase();

    // Recognize common success and failure tokens. We'll use substring matching to catch variants like 'failed' or 'payment_failed'.
    const successTokens = ["success", "ok", "1", "true", "paid", "completed"];
    const failureTokens = ["fail", "failed", "failure", "0", "false", "cancel", "declined", "error"];

    let isSuccess: boolean;
    if (status === "") {
        // No status provided: preserve previous default behavior (success)
        isSuccess = true;
    } else {
        // If any success token appears in the status string -> success
        if (successTokens.some(t => status.includes(t))) {
            isSuccess = true;
        } else if (failureTokens.some(t => status.includes(t))) {
            isSuccess = false;
        } else {
            // Unknown token: treat as failed to avoid false positives
            isSuccess = false;
        }
    }

    const icon = isSuccess ? (
        <i className="fi fi-sr-badge-check text-[6rem] text-emerald-400 mx-auto"></i>
    ) : (
        <i className="fi fi-sr-cross-circle text-[6rem] text-red-500 mx-auto"></i>
    );

    const title = isSuccess ? "پرداخت موفقیت آمیز بود" : "پرداخت ناموفق بود";
    const titleClass = isSuccess ? "text-emerald-400" : "text-red-500";

    return (
        <div className="h-screen max-h-screen w-full flex items-center justify-center bg-[#fafafa]">
            <div className="w-[40%] max-w-[40%] bg-white rounded-2xl p-10 border border-gray-100">
                <div className="text-center">
                    {icon}
                    <h1 className={`${titleClass} text-xl font-black -mt-7 mb-3`}>{title}</h1>
                    {!isSuccess && (
                        <p>در صورتی که پول از حساب شما کم شده باشد پول به مدت حداکثر ۷۲ ساعت با حساب شما توسط بانک باز میگردد. در غیر این صورت با پشتیبانی کافه گاه در ارتباط باشید.</p>
                    )}
                </div>
                {isSuccess && (
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        <div className="w-full border-l border-gray-100">
                            <p className="text-sm text-gray-400">فاکتور</p>
                            <h3 className="font-bold">{params.invoice || "-"}</h3>
                        </div>
                        <div className="w-full border-l border-gray-100">
                            <p className="text-sm text-gray-400">مبلغ</p>
                            <h3 className="font-bold">{params.amount || "-"}</h3>
                        </div>
                        <div className="w-full">
                            <p className="text-sm text-gray-400">شماره تراکنش</p>
                            <h3 className="font-bold">{params.transaction || params.txn || "-"}</h3>
                        </div>
                    </div>
                )}

                <div className="text-center mt-14">
                    <Link href={"/dashboard"} className="bg-teal-600 text-white rounded-2xl text-center py-3 px-10 font-bold duration-150 hover:shadow-xl hover:shadow-teal-600/40">بازگشت به داشبورد</Link>
                </div>
            </div>
        </div>
    )
}