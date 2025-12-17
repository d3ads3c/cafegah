import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const formData = new FormData();

    // Pagination and optional filters
    if (body.status) formData.append("status", body.status);
    if (body.category) formData.append("category", body.category);
    formData.append("page", String(body.page ?? 1));
    formData.append("per_page", String(body.per_page ?? 20));

    // User identification (using LoggedUser cookie as token, like other APIs)
    const loggedUserCookie = req.cookies.get("LoggedUser");
    const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;
    if (loggedUser) {
      formData.append("token", loggedUser);
    } else {
      formData.append("token", "null");
    }

    // IP address from headers
    const xff = req.headers.get("x-forwarded-for");
    const clientIp = xff ? xff.split(",")[0].trim() : req.headers.get("x-real-ip") || "";
    if (clientIp) {
      formData.append("ipaddress", clientIp);
    }

    const upstreamResponse = await fetch("http://localhost:8000/support/ticket/my", {
      method: "POST",
      body: formData,
    });

    const data = await upstreamResponse.json();

    if (data.Status === "Logout") {
      const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
      const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 200 });
      resp.headers.set("Set-Cookie", cookieHeader);
      return resp;
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { Status: "Failed", Error: "An error occurred while fetching support tickets" },
      { status: 400 }
    );
  }
}


