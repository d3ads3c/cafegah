import { BlogCategory, BlogDetailResponse, BlogListParams, BlogListResponse } from "@/types/AllTypes";

const UPSTREAM_BASE_URL =
  process.env.BLOG_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BLOG_API_BASE_URL ||
  "http://localhost:8000";

function toFormData(body: Record<string, unknown>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "boolean") {
      fd.append(key, value ? "true" : "false");
    } else if (typeof value === "number") {
      fd.append(key, String(value));
    } else {
      fd.append(key, String(value));
    }
  }
  return fd;
}

async function blogFetch<T>(path: string, body: Record<string, unknown>): Promise<T> {
  // In the browser, call our Next.js proxy routes to avoid CORS.
  if (typeof window !== "undefined") {
    const proxyPath =
      path === "/blog/list"
        ? "/api/blog/list"
        : path === "/blog/get"
          ? "/api/blog/get"
          : path === "/blog/categories"
            ? "/api/blog/categories"
            : path;

    const res = await fetch(proxyPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body ?? {}),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Blog API request failed with status ${res.status}`);
    }

    return (await res.json()) as T;
  }

  const init: RequestInit & { next?: { revalidate?: number } } = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: toFormData(body ?? {}),
  };

  // Cache hint only on the server
  if (typeof window === "undefined") {
    init.next = { revalidate: 60 };
  }

  const res = await fetch(`${UPSTREAM_BASE_URL}${path}`, init);

  if (!res.ok) {
    throw new Error(`Blog API request failed with status ${res.status}`);
  }

  const data = (await res.json()) as T;
  return data;
}

export async function fetchBlogList(params: BlogListParams): Promise<BlogListResponse> {
  return blogFetch<BlogListResponse>("/blog/list", {
    status: "published",
    page: 1,
    per_page: 10,
    order_by: "date_published",
    order_dir: "DESC",
    token: "",
    ipaddress: "",
    ...params,
  });
}

export async function fetchBlogBySlug(slug: string, incrementViews = true): Promise<BlogDetailResponse> {
  return blogFetch<BlogDetailResponse>("/blog/get", {
    slug,
    // Some backends bind Form fields with different casing; send both.
    Slug: slug,
    increment_views: incrementViews,
    token: "",
    ipaddress: "",
  });
}

export async function fetchBlogBySlugWithIp(
  slug: string,
  ipaddress: string,
  incrementViews = true
): Promise<BlogDetailResponse> {
  return blogFetch<BlogDetailResponse>("/blog/get", {
    slug,
    Slug: slug,
    increment_views: incrementViews,
    token: "",
    ipaddress,
  });
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  const data = await blogFetch<{
    Status: string;
    Categories?: BlogCategory[];
    Error?: string;
  }>("/blog/categories", {
    token: "",
    ipaddress: "",
  });

  if (data.Status !== "Success") {
    throw new Error(data.Error || "Failed to load blog categories");
  }

  return data.Categories ?? [];
}


