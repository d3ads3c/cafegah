import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "../../../_utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticket_id, message } = body;

    if (!ticket_id || !message) {
      return NextResponse.json(
        { Status: "Failed", Error: "ticket_id and message are required" },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("ticket_id", ticket_id.toString());
    formData.append("message", message);

    const loggedUserCookie = req.cookies.get("LoggedUser");
    const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;
    if (loggedUser) {
      formData.append("logged_user_id", loggedUser);
    } else {
      formData.append("token", "null");
    }

    // Use improved IP extraction utility
    const clientIp = getClientIp(req);
    if (clientIp) formData.append("ipaddress", clientIp);

    const response = await fetch("http://localhost:8000/support/ticket/reply", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.Status === "Success") {
      return NextResponse.json(data, { status: 200 });
    } else if (data.Status === "Logout") {
      const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
      const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 200 });
      resp.headers.set("Set-Cookie", cookieHeader);
      return resp;
    }

    return NextResponse.json(
      { Status: data.Status || "Failed", Error: data.Error || "Failed to send reply" },
      { status: response.status || 500 }
    );
  } catch (error) {
    console.error("Ticket reply error:", error);
    return NextResponse.json(
      { Status: "Failed", Error: "Internal server error" },
      { status: 500 }
    );
  }
}

