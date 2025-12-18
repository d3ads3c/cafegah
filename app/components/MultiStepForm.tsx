"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  businessName?: string;
  ownerName?: string;
  telephone?: string;
  state?: string;
  city?: string;
  postalcode?: string;
  email?: string;
  phone?: string;
  plan?: string;
  billingAddress?: string;
  features?: string[];
  enName?: string;
};

const plans = [
  {
    title: "پلن پایه",
    key: "پایه",
    price: "5.999,000",
    period: "سالانه",
    description: "مناسب برای کافه‌های کوچک",
    highlight: false,
  },
  {
    title: "پلن حرفه‌ای",
    key: "حرفه‌ای",
    price: "7,999,000",
    period: "سالانه",
    description: "مناسب برای کافه‌های متوسط",
    highlight: false,
  },
  {
    title: "پلن ویژه",
    key: "ویژه",
    price: "9,999,000",
    period: "سالانه",
    description: "مناسب برای کافه‌های بزرگ",
    highlight: false,
  },
];

export default function MultiStepForm({
  onFinish,
}: {
  onFinish?: (data: FormData) => void;
}) {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<FormData>({});
  const [modalPlan, setModalPlan] = useState<null | (typeof plans)[0]>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const requiredFields: (keyof FormData)[] = [
    "businessName",
    "ownerName",
    "telephone",
    "state",
    "city",
    "postalcode",
    "email",
    "phone",
    "plan",
    "billingAddress",
    "enName",
  ];

  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));
  const router = useRouter();

  // If we're on the first step, 'بازگشت' should navigate to /dashboard.
  // Otherwise, go to the previous step.
  const handleBack = () => {
    if (step === 1) {
      router.push("/dashboard");
    } else {
      prev();
    }
  };

  const update = (patch: Partial<FormData>) => {
    setData((d) => ({ ...d, ...patch }));
    // clear any existing errors for keys in the patch
    setErrors((prev) => {
      const next: Partial<Record<keyof FormData, string>> = { ...prev };
      Object.keys(patch).forEach((k) => {
        const kk = k as keyof FormData;
        delete next[kk];
      });
      return next;
    });
  };
  const validateAll = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    requiredFields.forEach((key) => {
      const val = data[key];
      if (val === undefined || val === null || String(val).trim() === "") {
        newErrors[key] = "این فیلد ضروری است";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Whether all required fields are filled (pure check, no side-effects)
  const isAllFilled = useMemo(() => {
    return requiredFields.every((key) => {
      const val = data[key];
      return val !== undefined && val !== null && String(val).trim() !== "";
    });
  }, [data]);

  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const sendSubscription = async () => {
    // Build a plain JS payload and POST JSON to our Next API route.
    const payload: Record<string, unknown> = {};

    requiredFields.forEach((key) => {
      const val = data[key];
      if (val !== undefined && val !== null)
        payload[String(key)] = val as unknown;
    });

    if (data.features && Array.isArray(data.features))
      payload.features = data.features;

    const res = await fetch("/api/subscriptions/new", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `HTTP ${res.status}`);
    }

    return res.json();
  };

  const submit = async () => {
    setApiError(null);

    // Validate all required fields before allowing submit
    if (!validateAll()) {
      // If validation fails, jump to the first step to show errors
      setStep(1);
      return;
    }

    setSubmitting(true);
    try {
      await sendSubscription();
      if (onFinish) onFinish(data);
      next();
    } catch (err: unknown) {
      console.error("Failed to send subscription:", err);
      const e = err as Error;
      setApiError(e?.message || String(err) || "خطا در ارسال درخواست");
    } finally {
      setSubmitting(false);
    }
  };

  // Export / import helpers
  const getPlanFeatures = (planKey: string) => {
    const allFeatures = [
      {
        id: 1,
        name: "مدیریت منو دیجیتال",
        desc: "ایجاد و مدیریت منو دیجیتال با قابلیت آپدیت آنی",
        plans: ["پایه", "حرفه‌ای", "ویژه"],
      },
      {
        id: 2,
        name: "دسته‌بندی هوشمند",
        desc: "دسته‌بندی منو با قابلیت فیلترینگ پیشرفته",
        plans: ["پایه", "حرفه‌ای", "ویژه"],
      },
      {
        id: 4,
        name: "ثبت فاکتور",
        desc: "ثبت و مدیریت فاکتورها به صورت دیجیتال",
        plans: ["پایه", "حرفه‌ای", "ویژه"],
      },
      {
        id: 5,
        name: "گزارش‌های مالی",
        desc: "گزارش‌های جامع از عملکرد مالی کافه",
        plans: ["حرفه‌ای", "ویژه"],
      },
      {
        id: 6,
        name: "حسابداری پیشرفته",
        desc: "سیستم حسابداری کامل با قابلیت صدور اسناد",
        plans: ["ویژه"],
      },
    ];
    return allFeatures.filter((f) => f.plans.includes(planKey));
  };

  return (
    <div className="xl:max-w-[70%] xl:w-[70%] w-full mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-teal-600 rounded-full"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
          </div>
        </div>
        <div className="whitespace-nowrap text-sm font-semibold">
          مرحله {step} از 4
        </div>
      </div>

      {step === 1 && (
        <div>
          <h3 className="text-lg font-bold mb-3">اطلاعات کسب‌وکار</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">نام کافه</label>
              <input
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
                value={data.businessName || ""}
                onChange={(e) => update({ businessName: e.target.value })}
              />
              {errors.businessName && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.businessName}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">نام کافه (انگلیسی)</label>
              <input
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
                value={data.enName || ""}
                onChange={(e) => update({ enName: e.target.value })}
              />
              {errors.enName && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.enName}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">نام مالک</label>
              <input
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
                value={data.ownerName || ""}
                onChange={(e) => update({ ownerName: e.target.value })}
              />
              {errors.ownerName && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.ownerName}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">استان</label>
              <input
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
                value={data.state || ""}
                onChange={(e) => update({ state: e.target.value })}
              />
              {errors.state && (
                <div className="text-red-500 text-sm mt-1">{errors.state}</div>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">شهر</label>
              <input
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
                value={data.city || ""}
                onChange={(e) => update({ city: e.target.value })}
              />
              {errors.city && (
                <div className="text-red-500 text-sm mt-1">{errors.city}</div>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">تلفن ثابت</label>
              <input
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
                value={data.telephone || ""}
                onChange={(e) => update({ telephone: e.target.value })}
              />
              {errors.telephone && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.telephone}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">کدپستی</label>
              <input
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
                value={data.postalcode || ""}
                onChange={(e) => update({ postalcode: e.target.value })}
              />
              {errors.postalcode && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.postalcode}
                </div>
              )}
            </div>
            {errors.plan && (
              <div className="text-red-500 text-sm mt-2">{errors.plan}</div>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-lg font-bold mb-3">اطلاعات تماس</h3>
          <label className="block text-sm mb-1">ایمیل</label>
          <input
            className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
            value={data.email || ""}
            onChange={(e) => update({ email: e.target.value })}
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
          <label className="block text-sm mb-1">تلفن</label>
          <input
            className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
            value={data.phone || ""}
            onChange={(e) => update({ phone: e.target.value })}
          />
          {errors.phone && (
            <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg font-bold mb-3">انتخاب پلن</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, idx) => {
              const isSelected = data.plan === plan.key;
              const isHighlighted = plan.highlight || isSelected;
              return (
                <div
                  key={idx}
                  className={`relative col-span-1 bg-white rounded-3xl border p-5 sm:p-8 shadow-xl ${
                    isHighlighted
                      ? "border-teal-600 md:scale-105"
                      : "border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-2 ${
                      isHighlighted ? "text-teal-600" : "text-gray-900"
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <div className="text-2xl sm:text-3xl font-black mb-1">
                    {plan.price}
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
                    تومان / {plan.period}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                    {plan.description}
                  </p>
                  <button
                    className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
                      isHighlighted
                        ? "bg-teal-600 text-white hover:bg-teal-700"
                        : "border border-teal-600 text-teal-600 hover:bg-teal-50"
                    }`}
                    onClick={() => update({ plan: plan.key })}
                  >
                    انتخاب پلن
                  </button>
                  <button
                    className="block sm:hidden w-full mt-2 py-3 rounded-xl font-bold border border-teal-600 text-teal-600 bg-white hover:bg-teal-50 transition-all text-sm"
                    onClick={() => setModalPlan(plan)}
                  >
                    مشاهده امکانات
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal for plan features (step 3 mobile) */}
      {modalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs mx-2 relative animate-fade-in">
            <button
              className="absolute left-4 top-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setModalPlan(null)}
              aria-label="بستن"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-gray-900 text-center">
              امکانات {modalPlan.title}
            </h2>
            <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {getPlanFeatures(modalPlan.key).map((feature) => (
                <li key={feature.id} className="border-b last:border-b-0 pb-2">
                  <div className="font-bold text-gray-700 text-sm mb-1">
                    {feature.name}
                  </div>
                  <div className="text-xs text-gray-500">{feature.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="text-lg font-bold mb-3">آدرس و تایید</h3>
          <label className="block text-sm mb-1">آدرس صورتحساب</label>
          <textarea
            className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:outline-teal-600 text-sm"
            value={data.billingAddress || ""}
            onChange={(e) => update({ billingAddress: e.target.value })}
          />
          {errors.billingAddress && (
            <div className="text-red-500 text-sm mt-1">
              {errors.billingAddress}
            </div>
          )}

          <div className="mt-4">
            <h4 className="font-semibold mb-2">مرور انتخاب‌ها</h4>
            <p className="text-sm text-gray-600">
              پلن انتخابی: {data.plan || "---"}
            </p>
            <p className="text-sm text-gray-600">
              نام کسب‌وکار: {data.businessName || "---"}
            </p>
            <p className="text-sm text-gray-600">
              ایمیل: {data.email || "---"}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mt-6">
        {(() => {
          const prevLabel = step === 1 ? "بازگشت" : "قبلی";
          return (
            <button
              className="px-4 py-2 rounded-lg border"
              onClick={handleBack}
            >
              {prevLabel}
            </button>
          );
        })()}

        {step < 4 ? (
          <button
            className="px-4 py-2 rounded-lg bg-teal-600 text-white"
            onClick={next}
          >
            بعدی
          </button>
        ) : (
          <div className="flex flex-col items-end w-full">
            <button
              className="px-4 py-2 rounded-lg bg-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={submit}
              disabled={!isAllFilled || submitting}
            >
              {submitting ? "در حال ارسال..." : "ثبت و ادامه"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
