import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { BlogPostParams } from "@/types/AllTypes";
import type { BlogDetailResponse } from "@/types/AllTypes";
import { fetchBlogCategories, fetchBlogList } from "@/app/lib/blogApi";

export default async function BlogPost({ params }: BlogPostParams) {
  // In React 19 / Next 15, `params` is a Promise and must be awaited
  const { slug } = await params;

  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "";
  const proto = h.get("x-forwarded-proto") || "http";
  const baseUrl = host ? `${proto}://${host}` : "";

  let data: BlogDetailResponse;
  let popularCategories: string[] = [];
  let relatedPosts:
    | {
        title: string;
        excerpt: string;
        slug: string;
        date: string;
      }[] = [];

  try {
    if (!slug) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-red-600">اسلاگ مقاله معتبر نیست.</p>
        </div>
      );
    }

    // Fetch current post, categories, and recent posts in parallel
    const [detailRes, categories, listRes] = await Promise.all([
      // Call our Next.js proxy route (same origin) so the backend receives form fields consistently.
      fetch(`${baseUrl}/api/blog/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ slug, increment_views: true }),
        cache: "no-store",
      }),
      fetchBlogCategories(),
      fetchBlogList({
        status: "published",
        page: 1,
        per_page: 3,
        order_by: "date_published",
        order_dir: "DESC",
      }),
    ]);

    data = (await detailRes.json()) as BlogDetailResponse;

    // Map popular categories from API
    popularCategories = categories.map((c) => c.Name);

    // Take up to 3 most recent posts (excluding the current one) for related posts
    const recentPosts = (listRes.Blogs || []).filter((post) => post.Slug !== slug).slice(0, 3);
    relatedPosts = recentPosts.map((post) => ({
      title: post.Title,
      excerpt: post.Excerpt || "",
      slug: post.Slug,
      date: post.DatePublished?.replace("|", " | ") || "",
    }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // Surface the real error instead of crashing (which can trigger Turbopack sourcemap noise)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-red-600">
          خطا در دریافت مقاله: {message}
        </p>
      </div>
    );
  }

  if (data.Status !== "Success" || !data.Blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-red-600">
          مقاله مورد نظر یافت نشد{data.Error ? `: ${data.Error}` : ""}
        </p>
      </div>
    );
  }

  const blog = data.Blog;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <article className="lg:w-2/3">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 space-x-reverse text-sm text-gray-500 mb-4">
              <span>{blog.DatePublished?.replace("|", " | ")}</span>
              <span>•</span>
              <span>
                {blog.ReadingTime ? `${blog.ReadingTime} دقیقه مطالعه` : ""}
              </span>
              <span>•</span>
              <span>{blog.AuthorID || "مارکتینگ کافه گاه"}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blog.Title}
            </h1>
            <div className="flex items-center justify-center gap-2">
              {blog.Category && (
                <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                  {blog.Category}
                </span>
              )}
            </div>
          </div>

          <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
            <Image
              src={blog.Cover || "/img/blog/default-cover.jpg"}
              alt={blog.Title}
              fill
              className="object-cover"
            />
          </div>

          <div
            className="prose prose-lg max-w-none rtl"
            dangerouslySetInnerHTML={{ __html: blog.Content || "" }}
          />

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">اشتراک‌گذاری مقاله</h3>
            <div className="flex space-x-4 space-x-reverse">
              <button className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
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
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-teal-600 text-white to-cyan-700 overflow-hidden flex items-center justify-center">
                <i className="fi fi-sr-user text-2xl mt-2"></i>
              </div>
              <div className="mr-4">
                <h4 className="font-bold">{blog.AuthorID || "مارکتینگ کافه گاه"}</h4>
                <p className="text-sm text-gray-600">
                  نویسنده و متخصص مدیریت کافه
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              تیم تولید محتوا و طراحی نرم افزار مدیریت کافه کافه گاه
            </p>
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
                    <span className="text-xs text-gray-500 mt-2 block">
                      {post.date}
                    </span>
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
