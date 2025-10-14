import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
    product: [
        { name: 'ویژگی‌ها', href: '#features' },
        { name: 'قیمت‌ها', href: '#prices' },
        { name: 'سوالات متداول', href: '#faq' },
    ],
    company: [
        { name: 'درباره ما', href: '/about' },
        { name: 'تماس با ما', href: '/contact' },
        { name: 'وبلاگ', href: '/blog' },
        // { name: 'همکاری با ما', href: '/careers' },
    ],
    legal: [
        { name: 'حریم خصوصی', href: '/privacy' },
        { name: 'شرایط استفاده', href: '/terms' },
        { name: 'امنیت', href: '/security' },
    ],
    social: [
        {
            name: 'اینستاگرام',
            href: 'https://instagram.com',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
            ),
        },
        {
            name: 'تلگرام',
            href: 'https://t.me/',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
                </svg>
            ),
        },
        {
            name: 'لینکدین',
            href: 'https://linkedin.com',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
            ),
        },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* Logo and Description */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/img/logo/192.png"
                                alt="کافه گاه"
                                width={40}
                                height={40}
                                className="rounded-xl"
                            />
                            <span className="text-xl font-black text-gray-900">کافه گاه</span>
                        </Link>
                        <p className="mt-4 text-sm leading-6 text-gray-500">
                            سیستم مدیریت هوشمند کافه‌ها
                            <br />
                            ساده، سریع و کارآمد
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">محصول</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            {footerLinks.product.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">شرکت</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            {footerLinks.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">قوانین</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            {footerLinks.legal.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Namads */}
                <div className='flex w-full items-center gap-4 justify-end mt-10'>
                    <div className='size-32 rounded-2xl p-3 bg-white'>
                        <a referrerPolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=4552683&Code=qyknEybElaLSRGJsWgxcqOV4NJYZ6aal'><img referrerPolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=4552683&Code=qyknEybElaLSRGJsWgxcqOV4NJYZ6aal' alt=''></img></a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <div className="flex gap-x-4">
                            {footerLinks.social.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-500 hover:text-teal-600 transition-colors"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} کافه گاه. تمامی حقوق محفوظ است.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
