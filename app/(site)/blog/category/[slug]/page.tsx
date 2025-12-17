import Image from "next/image";
import Link from "next/link";
import type { BlogPostParams, BlogApiPost } from "@/types/AllTypes";
import { fetchBlogList } from "@/app/lib/blogApi";

type UiBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  slug: string;
  readingTime: string;
};

function mapApiPostToUi(post: BlogApiPost): UiBlogPost {
  return {
    id: String(post.ID),
    title: post.Title,
    excerpt: post.Excerpt || "",
    coverImage: post.Cover || "/img/blog/default-cover.jpg",
    date: post.DatePublished?.replace("|", " | ") || "",
    author: post.AuthorID || "مارکتینگ کافه گاه",
    slug: post.Slug,
    readingTime: post.ReadingTime ? `${post.ReadingTime} دقیقه` : "",
  };
}

export default async function BlogCategoryPage({ params }: BlogPostParams) {
  const { slug } = await params;

  const listRes = await fetchBlogList({
    status: "published",
    page: 1,
    per_page: 12,
    category: slug,
    order_by: "date_published",
    order_dir: "DESC",
  });

  if (listRes.Status !== "Success") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-red-600">
          خطا در دریافت مقالات این دسته‌بندی
          {listRes.Error ? `: ${listRes.Error}` : ""}
        </p>
      </div>
    );
  }

  const posts = (listRes.Blogs || []).map(mapApiPostToUi);

  if (posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">
          مقالات دسته‌بندی: {slug}
        </h1>
        <p className="text-gray-600">
          در حال حاضر مقاله‌ای در این دسته‌بندی منتشر نشده است.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">مقالات دسته‌بندی: {slug}</h1>
        <p className="text-gray-600">
          مقالات منتشر شده در دسته‌بندی انتخاب‌شده را در این صفحه مشاهده می‌کنید.
        </p>
      </div>

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
                  {post.readingTime && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{post.readingTime} مطالعه</span>
                    </>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}


