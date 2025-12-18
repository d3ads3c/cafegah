import type { Metadata } from "next";
import Headbar from "@/app/components/HeadBar";
import Footer from "@/app/components/Footer";
import ChatWidget from "@/app/components/ChatWidget";

export const metadata: Metadata = {
  title: "کافه گاه | نرم افزار مدیریت کافه | منو آنلاین | فاکتور الکترونیکی",
  description:
    "کافه گاه نرم افزار مدیریت پیشرفته کافه ها با امکانات منو آنلاین، ثبت فاکتور، مدیریت مشتریان و پشتیبانی ۲۴/۷. مناسب برای کافه داران حرفه‌ای.",
  keywords: [
    "کافه گاه",
    "نرم افزار کافه",
    "مدیریت کافه",
    "منو آنلاین کافه",
    "فاکتور الکترونیکی کافه",
    "سیستم مدیریت کافی شاپ",
    "اپلیکیشن کافه",
    "پشتیبانی کافه",
    "مدیریت مشتریان کافه",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Headbar />
      <div className="mt-28">
        {children}
        <Footer />
        <ChatWidget />
      </div>
    </div>
  );
}
