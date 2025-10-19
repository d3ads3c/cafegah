"use client";

import React, { useState } from "react";
import Link from "next/link";

type Invoice = {
  invoiceId: string;
  date: string;
  amount: string;
  status: string;
  description: string;
};

const invoices: Invoice[] = [
  {
    invoiceId: "INV-1402-001",
    date: "۱۵ شهریور ۱۴۰۲",
    amount: "499,000",
    status: "موفق",
    description: "تمدید اشتراک حرفه‌ای"
  },
  {
    invoiceId: "INV-1402-002",
    date: "۱۵ مرداد ۱۴۰۲",
    amount: "499,000",
    status: "موفق",
    description: "تمدید اشتراک حرفه‌ای"
  },
  {
    invoiceId: "INV-1402-003",
    date: "۱۵ تیر ۱۴۰۲",
    amount: "299,000",
    status: "ناموفق",
    description: "ارتقا به حرفه‌ای"
  }
];

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">فاکتور ها</h1>
        <p className="mt-2 text-gray-600">مشاهده فاکتور های شما</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <table className="table-auto w-full">
              <thead className="border-b border-gray-100 text-xs text-light text-gray-500">
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
                  وضعیت
                </th>
                <th className="pb-3">
                  توضیحات
                </th>
                <th className="pb-3">
                  عملیات
                </th>
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
                    <div className="font-bold text-sm rounded-xl py-1 px-4 bg-emerald-100 text-emerald-500 w-fit mx-auto">پرداخت شده</div>
                  </td>
                  <td className="py-3">
                    -
                  </td>
                  <td className="py-3">
                    <Link href={"#"} className="border border-teal-600 text-teal-600 rounded-xl py-1 px-4 text-xs font-bold">مشاهده</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </table>
        </div>
      </div>
    </>
  );
}
