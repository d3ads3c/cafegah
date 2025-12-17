'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogApiPost, BlogCategory } from '@/types/AllTypes';
import { fetchBlogCategories, fetchBlogList } from '@/app/lib/blogApi';

interface UiBlogPost {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    author: string;
    slug: string;
    categories: string[];
    readingTime: string;
    featured?: boolean;
}

function mapApiPostToUi(post: BlogApiPost): UiBlogPost {
    return {
        id: String(post.ID),
        title: post.Title,
        excerpt: post.Excerpt || '',
        coverImage: post.Cover || '/img/blog/default-cover.jpg',
        date: post.DatePublished?.replace('|', ' | ') || '',
        author: post.AuthorID || 'ناشناس',
        slug: post.Slug,
        categories: post.Category ? [post.Category] : [],
        readingTime: post.ReadingTime ? `${post.ReadingTime} دقیقه` : '',
        featured: post.Featured,
    };
}

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const [posts, setPosts] = useState<UiBlogPost[]>([]);
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const [listRes, cats] = await Promise.all([
                    fetchBlogList({
                        status: 'published',
                        page,
                        per_page: 9,
                        category: selectedCategory !== 'all' ? selectedCategory : undefined,
                        search: searchQuery || undefined,
                        order_by: 'date_published',
                        order_dir: 'DESC',
                    }),
                    categories.length === 0 ? fetchBlogCategories() : Promise.resolve(categories),
                ]);

                if (cancelled) return;

                if (listRes.Status !== 'Success') {
                    throw new Error(listRes.Error || 'خطا در دریافت مقالات');
                }

                setPosts((listRes.Blogs || []).map(mapApiPostToUi));
                setTotalPages(listRes.TotalPages || 1);
                setCategories(cats);
            } catch (err: unknown) {
                if (!cancelled) {
                    const message =
                        err instanceof Error ? err.message : 'خطای غیرمنتظره رخ داد';
                    setError(message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, selectedCategory, searchQuery]);

    // Featured posts for the hero section
    const featuredPosts = posts.filter(post => post.featured);

    const allCategories = categories.map((c) => c.Name);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section with Featured Posts */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-center mb-4">بلاگ کافه‌گاه</h1>
                <p className="text-xl text-gray-600 text-center mb-8">آخرین مقالات و اخبار دنیای کافه‌داری</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                            <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                                <Image 
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                        <p className="text-sm opacity-90">{post.excerpt}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="w-full md:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="جستجو در مقالات..."
                                className="w-full px-4 py-2 pr-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="w-full md:w-1/4">
                        <select
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">همه دسته‌بندی‌ها</option>
                            {allCategories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="w-full md:w-1/4">
                        <select
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">جدیدترین</option>
                            <option value="popular">محبوب‌ترین</option>
                            <option value="trending">پربازدیدترین</option>
                        </select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-teal-500 text-white' : 'bg-gray-100'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-teal-500 text-white' : 'bg-gray-100'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Active Filters */}
                {(searchQuery || selectedCategory !== 'all') && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {searchQuery && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-50 text-teal-600">
                                جستجو: {searchQuery}
                                <button onClick={() => setSearchQuery('')} className="mr-2 text-teal-500 hover:text-teal-700">×</button>
                            </span>
                        )}
                        {selectedCategory !== 'all' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-50 text-teal-600">
                                دسته‌بندی: {selectedCategory}
                                <button onClick={() => setSelectedCategory('all')} className="mr-2 text-teal-500 hover:text-teal-700">×</button>
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Blog Posts Grid/List */}
            {loading && (
                <div className="text-center py-12">
                    <p className="text-gray-600">در حال بارگذاری مقالات...</p>
                </div>
            )}

            {error && !loading && (
                <div className="text-center py-12">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                            <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="relative h-48">
                                    <Image 
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <span>{post.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{post.readingTime} مطالعه</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">{post.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {post.categories.map((category, idx) => (
                                            <span 
                                                key={idx}
                                                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                            <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                                        <Image 
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <div className="flex items-center text-sm text-gray-500 mb-2">
                                            <span>{post.date}</span>
                                            <span className="mx-2">•</span>
                                            <span>{post.readingTime} مطالعه</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-teal-600 transition-colors">{post.title}</h3>
                                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {post.categories.map((category, idx) => (
                                                <span 
                                                    key={idx}
                                                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            )}

            {/* No Results Message */}
            {!loading && !error && posts.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">نتیجه‌ای یافت نشد</h3>
                    <p className="text-gray-600">لطفاً با معیارهای دیگری جستجو کنید</p>
                </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                    <button
                        className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        disabled={page <= 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                        قبلی
                    </button>
                    <span className="px-4 py-2 rounded-lg bg-teal-500 text-white">
                        {page}
                    </span>
                    <button
                        className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                        بعدی
                    </button>
                </nav>
            </div>
        </div>
    );
}
