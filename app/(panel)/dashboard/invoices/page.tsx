"use client";

import React, { useState } from "react";
import Link from "next/link";
import MyInvoices from "@/app/components/UserInvoices";

export default function InvoicesPage() {

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">فاکتور ها</h1>
        <p className="mt-2 text-gray-600">مشاهده فاکتور های شما</p>
      </div>
      <MyInvoices />
    </>
  );
}
