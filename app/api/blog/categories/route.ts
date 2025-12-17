import { NextRequest, NextResponse } from "next/server";
import { blogUpstreamBaseUrl, getClientIpFromRequestHeaders, toFormData } from "../_upstream";

export async function POST(req: NextRequest) {
  try {
    // accept JSON body but not required
    await req.json().catch(() => ({}));
    const clientIp = getClientIpFromRequestHeaders(req.headers);

    const formData = toFormData({
      token: "",
      ipaddress: clientIp,
    });

    const upstream = await fetch(`${blogUpstreamBaseUrl()}/blog/categories`, {
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


