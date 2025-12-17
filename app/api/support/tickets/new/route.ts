import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const formData = new FormData();

    // Required fields for creating a ticket
    if (body.subject) formData.append("subject", body.subject);
    if (body.message) formData.append("message", body.message);

    // Optional fields
    if (body.subscription_serial) {
      formData.append("subscription_serial", body.subscription_serial);
    }
    if (body.priority) {
      formData.append("priority", body.priority);
    }
    if (body.category) {
      formData.append("category", body.category);
    }

    // User identification (preferred: LoggedUser cookie, like other APIs)
    const loggedUserCookie = req.cookies.get("LoggedUser");
    const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;
    if (loggedUser) {
      // In this project, LoggedUser is used as a token for upstream APIs
      formData.append("token", loggedUser);
    } else {
      // Fallback – upstream may treat this as "no user"
      formData.append("token", "null");
    }

    // IP address from headers
    const xff = req.headers.get("x-forwarded-for");
    const clientIp = xff ? xff.split(",")[0].trim() : req.headers.get("x-real-ip") || "";
    if (clientIp) {
      formData.append("ipaddress", clientIp);
    }

    const upstreamResponse = await fetch("http://localhost:8000/support/ticket/create", {
      method: "POST",
      body: formData,
    });

    const data = await upstreamResponse.json();

    // Handle logout convention similar to other APIs if backend uses it
    if (data.Status === "Logout") {
      const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
      const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 200 });
      resp.headers.set("Set-Cookie", cookieHeader);
      return resp;
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { Status: "Failed", Error: "An error occurred while creating support ticket" },
      { status: 400 }
    );
  }
}


