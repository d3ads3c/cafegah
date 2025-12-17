import type { MetadataRoute } from "next";

function siteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_SITE_URL ||
    process.env.VERCEL_URL;

  if (!fromEnv) return "https://cafegah.ir";
  if (fromEnv.startsWith("http://") || fromEnv.startsWith("https://")) return fromEnv;
  return `https://${fromEnv}`;
}

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl().replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/invoice/",
          "/result/",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}


