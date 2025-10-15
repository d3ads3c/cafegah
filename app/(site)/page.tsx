
import Image from "next/image";
import Link from "next/link";
import PricingTable from "@/app/components/PricingTable";
import FAQ from "@/app/components/FAQ";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "کافه گاه | نرم افزار مدیریت کافه | منو آنلاین | فاکتور الکترونیکی",
  description: "کافه گاه نرم افزار مدیریت پیشرفته کافه ها با امکانات منو آنلاین، ثبت فاکتور، مدیریت مشتریان و پشتیبانی ۲۴/۷. مناسب برای کافه داران حرفه‌ای.",
  keywords: [
    "کافه گاه", "نرم افزار کافه", "مدیریت کافه", "منو آنلاین کافه", "فاکتور الکترونیکی کافه", "سیستم مدیریت کافی شاپ", "اپلیکیشن کافه", "پشتیبانی کافه", "مدیریت مشتریان کافه"
  ],
  openGraph: {
    title: "کافه گاه | نرم افزار مدیریت کافه | منو آنلاین | فاکتور الکترونیکی",
    description: "کافه گاه نرم افزار مدیریت پیشرفته کافه ها با امکانات منو آنلاین، ثبت فاکتور، مدیریت مشتریان و پشتیبانی ۲۴/۷.",
    url: "https://cafegah.ir/",
    siteName: "کافه گاه",
    images: [
      {
        url: "/img/about-us.jpg",
        width: 1200,
        height: 630,
        alt: "کافه گاه نرم افزار مدیریت کافه"
      }
    ],
    locale: "fa_IR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "کافه گاه | نرم افزار مدیریت کافه | منو آنلاین | فاکتور الکترونیکی",
    description: "کافه گاه نرم افزار مدیریت پیشرفته کافه ها با امکانات منو آنلاین، ثبت فاکتور، مدیریت مشتریان و پشتیبانی ۲۴/۷.",
    images: ["/img/about-us.jpg"]
  },
  alternates: {
    canonical: "https://cafegah.ir/"
  }
};

export default function Home() {
  return (
    <>
      <Head>
        <title>کافه گاه | نرم افزار مدیریت کافه | منو آنلاین | فاکتور الکترونیکی</title>
        <meta name="description" content="کافه گاه نرم افزار مدیریت پیشرفته کافه ها با امکانات منو آنلاین، ثبت فاکتور، مدیریت مشتریان و پشتیبانی ۲۴/۷. مناسب برای کافه داران حرفه‌ای." />
        <meta name="keywords" content="کافه گاه, نرم افزار کافه, مدیریت کافه, منو آنلاین کافه, فاکتور الکترونیکی کافه, سیستم مدیریت کافی شاپ, اپلیکیشن کافه, پشتیبانی کافه, مدیریت مشتریان کافه" />
        <meta property="og:title" content="کافه گاه | نرم افزار مدیریت کافه | منو آنلاین | فاکتور الکترونیکی" />
        <meta property="og:description" content="کافه گاه نرم افزار مدیریت پیشرفته کافه ها با امکانات منو آنلاین، ثبت فاکتور، مدیریت مشتریان و پشتیبانی ۲۴/۷." />
        <meta property="og:image" content="/img/about-us.jpg" />
        <meta property="og:url" content="https://cafegah.ir/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="کافه گاه | نرم افزار مدیریت کافه | منو آنلاین | فاکتور الکترونیکی" />
        <meta name="twitter:description" content="کافه گاه نرم افزار مدیریت پیشرفته کافه ها با امکانات منو آنلاین، ثبت فاکتور، مدیریت مشتریان و پشتیبانی ۲۴/۷." />
        <meta name="twitter:image" content="/img/about-us.jpg" />
        <link rel="canonical" href="https://cafegah.ir/" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "کافه گاه",
              "url": "https://cafegah.ir/",
              "description": "کافه گاه نرم افزار مدیریت پیشرفته کافه ها با امکانات منو آنلاین، ثبت فاکتور، مدیریت مشتریان و پشتیبانی ۲۴/۷.",
              "inLanguage": "fa-IR",
              "publisher": {
                "@type": "Organization",
                "name": "کافه گاه",
                "logo": {
                  "@type": "ImageObject",
                  "url": "/img/logo/192.png"
                }
              }
            }
          `}
        </script>
      </Head>
      <div className="py-6 sm:py-8 md:py-10">
        <main className="mx-4 sm:mx-10 md:mx-20 lg:mx-40">
          <div className="w-fit mx-auto py-2 px-3 sm:px-5 bg-teal-100 text-teal-600 rounded-full font-bold mb-5 text-xs sm:text-base">
            <h4>تخفیف ویژه بر روی پلن ویژه به مدت محدود</h4>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-[2.5rem] text-center font-bold leading-tight">
            <span className="text-teal-600 !font-black">کافه گاه،</span> نرم افزار مدیریت پیشرفته و آسان کافه ها
          </h1>
          <p className="text-center my-4 sm:my-5 text-gray-600 text-sm sm:text-base">نرم افزاری آسان و کارآمد در زمینه مدیریت کافه ها و منو آنلاین به همراه رابط کاربری آسان و کارآمد</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center pb-6 sm:pb-8">
            <Link href={"#prices"} className="w-full sm:w-auto text-white bg-teal-600 rounded-2xl text-sm font-bold shadow-xl shadow-teal-700/40 py-4 px-4 sm:px-6 text-center" >مشاهده پلن ها</Link>
            <Link href={"#prices"} className="w-full sm:w-auto text-teal-600 border border-teal-600 hover:bg-teal-600 hover:text-white duration-150 hover:shadow-xl hover:shadow-teal-700/40 rounded-2xl text-sm font-bold py-4 px-4 sm:px-6 mt-3 md:mt-0 text-center" >دمو نرم افزار</Link>
          </div>
          <div>
            <Image
              src="/img/herosection.png"
              alt="hero section image"
              width={1200}
              height={600}
              quality={100}
              className="w-full max-w-full sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1200px] mx-auto rounded-2xl"
              priority
            />
          </div>
        </main>
        <div className="my-2 px-2 sm:px-6 md:px-16 lg:px-40 mt-12 md:mt-0" id="features">
          <h3 className="border rounded-full py-1.5 px-4 w-fit mx-auto border-gray-400 text-gray-500 shadow-xl bg-white text-center">قابلیت ها</h3>
          <h2 className="text-3xl font-bold text-center my-5">قابلیت هایی که <span className="text-teal-600 !font-black">کافه گاه</span> را متمایز میکند</h2>
          <p className="text-center">تمام تمرکز تیم کافه گاه راحتی کاربری برای مشتریان خود و ارائه قابلیت و امکانات پیشرفته که کافه گاه را متمایز نسبت به رقبای خود می کند.</p>
          <div className="flex flex-col md:flex-row items-center gap-5 mt-8 md:mt-10">
            <div className="w-full md:w-1/3 bg-white rounded-3xl border border-gray-200 h-max sm:h-[400px] p-4 mb-5 md:mb-0">
              <div className="min-h-[70%]">
                <Image src={"/img/features/invoices.png"} width={2000} height={2000} quality={100} alt="Invoice Feature" className="max-w-[320px] mx-auto"></Image>
              </div>
              <div>
                <h3 className="text-xl font-bold">ثبت فاکتور</h3>
                <p className="text-sm text-gray-400 text-justify">
                  سیستم ثبت فاکتور هوشمند با امکان صدور فاکتور الکترونیکی، محاسبه خودکار مالیات و تخفیفات، و قابلیت پیگیری وضعیت پرداخت. امکان چاپ فاکتور و ارسال نسخه دیجیتال به مشتری
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-white rounded-3xl border border-gray-200 h-max sm:h-[400px] p-4 mb-5 md:mb-0">
              <div className="min-h-[70%]">
                <Image src={"/img/features/online-menu.png"} width={2000} height={2000} quality={100} alt="Online Menu" className="max-w-[320px] mx-auto"></Image>
              </div>
              <div>
                <h3 className="text-xl font-bold">منو آنلاین</h3>
                <p className="text-sm text-gray-400 text-justify">
                  منوی دیجیتال پویا با امکان به‌روزرسانی آسان قیمت‌ها و موجودی، نمایش تصاویر جذاب محصولات، دسته‌بندی هوشمند و امکان سفارش‌گیری آنلاین با رابط کاربری ساده
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-white rounded-3xl border border-gray-200 h-max sm:h-[400px] p-4">
              <div className="min-h-[70%]">
                <Image src={"/img/features/customers-managment.png"} width={2000} height={2000} quality={100} alt="Customer Managment" className="max-w-[320px] mx-auto"></Image>
              </div>
              <div>
                <h3 className="text-xl font-bold">مدیریت مشتریان</h3>
                <p className="text-sm text-gray-400 text-justify">
                  سیستم جامع مدیریت ارتباط با مشتری، ثبت سوابق خرید، برنامه وفاداری مشتریان، ارسال پیام‌های تبلیغاتی و تخفیف‌های ویژه برای مشتریان دائمی
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
            <div className="w-full md:w-1/2 h-max sm:h-[300px] bg-white rounded-3xl border border-gray-200 p-4 mb-5 md:mb-0">
              <div className="min-h-[70%]">
                <Image src={"/img/features/mobile-application.png"} width={5000} height={2000} quality={100} alt="Mobile Application" className="rounded-2xl mx-auto"></Image>
              </div>
              <div className="mt-3 md:mt-0">
                <h3 className="text-xl font-bold">اپلیکیشن موبایل</h3>
                <p className="text-sm text-gray-400 text-justify">
                  اپلیکیشن اختصاصی برای مدیریت کافه از راه دور، دسترسی به گزارش‌های فروش، مدیریت سفارشات و منو، با رابط کاربری ساده و کاربردی برای اندروید و iOS
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-max sm:h-[300px] bg-white rounded-3xl border border-gray-200 p-4">
              <div className="min-h-[70%]">
                <Image src={"/img/features/online-support.png"} width={5000} height={2000} quality={100} alt="Online Support" className="rounded-2xl mx-auto"></Image>
              </div>
              <div>
                <h3 className="text-xl font-bold">پشتیبانی آنلاین</h3>
                <p className="text-sm text-gray-400 text-justify">
                  پشتیبانی ۲۴/۷ از طریق چت آنلاین، تماس تلفنی و ایمیل. تیم متخصص ما آماده پاسخگویی به سوالات و رفع مشکلات احتمالی شما در کوتاه‌ترین زمان ممکن است
                </p>
              </div>
            </div>
          </div>
        </div>
        <PricingTable />
        <FAQ />
      </div>
    </>
  );
}
