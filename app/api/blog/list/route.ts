import { NextRequest, NextResponse } from "next/server";
import { blogUpstreamBaseUrl, getClientIpFromRequestHeaders, toFormData } from "../_upstream";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const clientIp = getClientIpFromRequestHeaders(req.headers);

    const formData = toFormData({
      status: "published",
      page: 1,
      per_page: 10,
      order_by: "date_published",
      order_dir: "DESC",
      token: "",
      ipaddress: clientIp,
      ...body,
    });

    const upstream = await fetch(`${blogUpstreamBaseUrl()}/blog/list`, {
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


