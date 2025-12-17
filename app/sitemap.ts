import type { MetadataRoute } from "next";
import { fetchBlogList } from "@/app/lib/blogApi";
import type { BlogApiPost } from "@/types/AllTypes";

function siteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_SITE_URL ||
    process.env.VERCEL_URL;

  if (!fromEnv) return "https://cafegah.ir";
  if (fromEnv.startsWith("http://") || fromEnv.startsWith("https://")) return fromEnv;
  return `https://${fromEnv}`;
}

function safeLastModified(input?: string): string | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

async function fetchAllPublishedBlogPosts(): Promise<BlogApiPost[]> {
  const all: BlogApiPost[] = [];
  const perPage = 100;
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetchBlogList({
      status: "published",
      page,
      per_page: perPage,
      order_by: "date_published",
      order_dir: "DESC",
    });

    if (res.Status !== "Success") break;

    const blogs = res.Blogs ?? [];
    all.push(...blogs);

    totalPages = res.TotalPages ?? 1;
    if (blogs.length === 0) break;
    page += 1;
  }

  return all;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl().replace(/\/+$/, "");
  const DEFAULT_LAST_MODIFIED = "2025-12-16T23:53:24.068Z";

  // Public, indexable routes only
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about-us`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact-us`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "daily", priority: 0.7 },
  ];

  // Blog posts
  try {
    const posts = await fetchAllPublishedBlogPosts();
    for (const post of posts) {
      if (!post?.Slug) continue;
      routes.push({
        url: `${base}/blog/${post.Slug}`,
        lastModified:
          safeLastModified(post.DateUpdated) ||
          safeLastModified(post.DatePublished) ||
          DEFAULT_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: post.Featured ? 0.8 : 0.5,
      });
    }
  } catch {
    // If blog API is down, still return the static sitemap entries.
  }

  return routes;
}


