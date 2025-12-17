import { NextRequest, NextResponse } from "next/server";
import { blogUpstreamBaseUrl, getClientIpFromRequestHeaders, toFormData } from "../_upstream";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const clientIp = getClientIpFromRequestHeaders(req.headers);

    const slugValue =
      typeof body.slug === "string"
        ? body.slug
        : typeof (body as any).Slug === "string"
          ? (body as any).Slug
          : undefined;

    const formData = toFormData({
      increment_views: true,
      token: "",
      ipaddress: clientIp,
      ...body,
      // Some backends bind Form fields with different casing; send both.
      ...(slugValue ? { slug: slugValue, Slug: slugValue } : {}),
    });

    const upstream = await fetch(`${blogUpstreamBaseUrl()}/blog/get`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json({ Status: "Failed", Error: "Internal server error" }, { status: 500 });
  }
}


