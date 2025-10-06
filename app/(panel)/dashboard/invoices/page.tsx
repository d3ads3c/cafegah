"use client";

import React, { useState } from "react";

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
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">فاکتورها</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">شماره فاکتور</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مبلغ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">توضیحات</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {invoices.map((invoice) => (
              <tr key={invoice.invoiceId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-mono">{invoice.invoiceId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.amount} تومان</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${invoice.status === "موفق" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-teal-600 hover:text-teal-800 font-bold transition"
                    onClick={() => setSelectedInvoice(invoice)}
                  >
                    مشاهده
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute left-4 top-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setSelectedInvoice(null)}
              aria-label="بستن"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900">جزئیات فاکتور</h2>
            <div className="space-y-3 text-right">
              <div><span className="font-semibold">شماره فاکتور:</span> {selectedInvoice.invoiceId}</div>
              <div><span className="font-semibold">تاریخ:</span> {selectedInvoice.date}</div>
              <div><span className="font-semibold">مبلغ:</span> {selectedInvoice.amount} تومان</div>
              <div><span className="font-semibold">وضعیت:</span> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedInvoice.status === "موفق" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>{selectedInvoice.status}</span></div>
              <div><span className="font-semibold">توضیحات:</span> {selectedInvoice.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
