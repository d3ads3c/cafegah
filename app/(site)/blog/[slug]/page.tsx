'use client';

import Link from 'next/link';
import Image from 'next/image';

interface BlogPostParams {
    params: {
        slug: string;
    };
}

// Sample post data - This would typically come from a database or CMS
const samplePost = {
    title: 'راهنمای جامع مدیریت کافه',
    content: `
    <p>مدیریت یک کافه موفق نیازمند توجه به جنبه‌های مختلفی است که در این مقاله به بررسی مهم‌ترین آن‌ها می‌پردازیم.</p>

    <h2>۱. مدیریت منابع انسانی</h2>
    <p>کارکنان شما مهم‌ترین سرمایه کافه هستند. انتخاب، آموزش و حفظ کارکنان خوب یکی از کلیدی‌ترین عوامل موفقیت است.</p>

    <h2>۲. کنترل کیفیت</h2>
    <p>کیفیت محصولات و خدمات باید همیشه در بالاترین سطح حفظ شود. این شامل کیفیت مواد اولیه، نحوه آماده‌سازی و ارائه است.</p>

    <h2>۳. مدیریت مالی</h2>
    <p>کنترل دقیق هزینه‌ها، قیمت‌گذاری مناسب و مدیریت جریان نقدی از ارکان اصلی موفقیت یک کافه است.</p>
    `,
    coverImage: '/img/blog/cafe-management.jpg',
    date: '۱۰ مهر ۱۴۰۲',
    author: 'علی محمدی',
    readingTime: '۵ دقیقه',
    categories: ['مدیریت کافه', 'کسب و کار']
};

// Sample related posts data
const relatedPosts = [
    {
        title: 'بهترین دستگاه‌های قهوه برای کافه',
        excerpt: 'راهنمای انتخاب و خرید بهترین دستگاه‌های قهوه برای کافه‌های کوچک و بزرگ',
        slug: 'best-coffee-machines',
        date: '۵ مهر ۱۴۰۲'
    },
    {
        title: 'طراحی دکوراسیون کافه',
        excerpt: 'نکات کلیدی در طراحی دکوراسیون داخلی کافه برای جذب مشتری',
        slug: 'cafe-interior-design',
        date: '۱ مهر ۱۴۰۲'
    },
    {
        title: 'منوی پرفروش کافه',
        excerpt: 'چگونه یک منوی جذاب و پرفروش برای کافه طراحی کنیم',
        slug: 'best-selling-menu',
        date: '۲۸ شهریور ۱۴۰۲'
    }
];

// Popular categories
const popularCategories = [
    'مدیریت کافه',
    'قهوه',
    'دکوراسیون',
    'بازاریابی',
    'منابع انسانی',
    'تجهیزات کافه'
];

export default function BlogPost({ params }: BlogPostParams) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <article className="lg:w-2/3">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-4 space-x-reverse text-sm text-gray-500 mb-4">
                            <span>{samplePost.date}</span>
                            <span>•</span>
                            <span>{samplePost.readingTime} مطالعه</span>
                            <span>•</span>
                            <span>{samplePost.author}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{samplePost.title}</h1>
                        <div className="flex items-center justify-center gap-2">
                            {samplePost.categories.map((category, index) => (
                                <span 
                                    key={index} 
                                    className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
                        <Image 
                            src={samplePost.coverImage} 
                            alt={samplePost.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div 
                        className="prose prose-lg max-w-none rtl"
                        dangerouslySetInnerHTML={{ __html: samplePost.content }}
                    />

                    <div className="mt-12 pt-8 border-t">
                        <h3 className="text-xl font-semibold mb-4">اشتراک‌گذاری مقاله</h3>
                        <div className="flex space-x-4 space-x-reverse">
                            <button className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                                </svg>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>

                {/* Sidebar */}
                <aside className="lg:w-1/3">
                    {/* Author Info */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-6">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                <Image 
                                    src="/img/author-placeholder.jpg" 
                                    alt={samplePost.author}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                            <div className="mr-4">
                                <h4 className="font-bold">{samplePost.author}</h4>
                                <p className="text-sm text-gray-600">نویسنده و متخصص مدیریت کافه</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            متخصص در زمینه مدیریت کافه با بیش از ۱۰ سال تجربه در صنعت کافه‌داری
                        </p>
                        <button className="w-full bg-teal-600 text-white rounded-xl py-2 text-sm font-bold hover:bg-teal-700 transition-colors">
                            دنبال کردن
                        </button>
                    </div>

                    {/* Popular Categories */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-6">
                        <h3 className="text-lg font-bold mb-4">دسته‌بندی‌های محبوب</h3>
                        <div className="flex flex-wrap gap-2">
                            {popularCategories.map((category, index) => (
                                <Link
                                    key={index}
                                    href={`/blog/category/${category}`}
                                    className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm hover:bg-teal-50 hover:text-teal-600 transition-colors"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Related Posts */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-lg font-bold mb-4">مطالب مرتبط</h3>
                        <div className="space-y-4">
                            {relatedPosts.map((post, index) => (
                                <Link 
                                    key={index}
                                    href={`/blog/${post.slug}`}
                                    className="block group"
                                >
                                    <article className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                        <h4 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                            {post.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                                        <span className="text-xs text-gray-500 mt-2 block">{post.date}</span>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
