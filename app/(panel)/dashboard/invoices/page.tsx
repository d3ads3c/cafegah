"use client";

import React from "react";
import MyInvoices from "@/app/components/UserInvoices";

export default function InvoicesPage() {

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900">فاکتور ها</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">مشاهده فاکتور های شما</p>
      </div>
      <MyInvoices />
    </>
  );
}
