import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import AuthChecker from "../components/AuthChecker";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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

const bakh = localFont({
  src: [
    {
      path: "./fonts/YekanBakhFaNum-Bold.woff",
      weight: "700",

      style: "bold",
    },
    {
      path: "./fonts/YekanBakhFaNum-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakhFaNum-ExtraBlack.woff",
      weight: "900",
      style: "black",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <GoogleAnalytics gaId={"G-QW12MSVBD0"} />
      <head>
        <Script
          id="microsoft-clarity"
          type="text/javascript"
          strategy="afterInteractive"
        >
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "unel0w5d45");
`}
        </Script>
      </head>

      <body className={`${bakh.className} antialiased`}>
        <AuthChecker />
        {children}
      </body>
    </html>
  );
}
