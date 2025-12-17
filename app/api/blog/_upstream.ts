export function blogUpstreamBaseUrl(): string {
  // Prefer server-only env, but fall back for convenience
  return (
    process.env.BLOG_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BLOG_API_BASE_URL ||
    "http://localhost:8000"
  );
}

export function getClientIpFromRequestHeaders(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") || "";
}

export function toFormData(body: Record<string, unknown>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "boolean") fd.append(key, value ? "true" : "false");
    else fd.append(key, String(value));
  }
  return fd;
}


