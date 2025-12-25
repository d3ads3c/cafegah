import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "../../_utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serial } = body;

    if (!serial) {
      return NextResponse.json(
        { message: "شناسه اشتراک مورد نیاز است" },
        { status: 400 }
      );
    }

    // Get the logged user token from cookies
    const loggedUserCookie = request.cookies.get("LoggedUser");
    const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;

    // Fetch subscription details from backend
    const formData = new FormData();
    if (loggedUser) {
      formData.append("token", loggedUser);
    } else {
      formData.append("token", "null");
    }
    formData.append("serial", serial);

    // Use improved IP extraction utility
formData.append("ipaddress", "127.0.0.1");
    const backendResponse = await fetch(
      "http://localhost:8000/subscription/enter",
      {
        method: "POST",
        body: formData,
      }
    );

    const backendData = await backendResponse.json();

    if (backendData.Status === "Success") {
      return NextResponse.json(
        {
          Link: "http://10.77.119.13:3255",
          Status: "Success",
        },
        { status: 200 }
      );
    } else if (backendData === "Logout") {
      const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
      const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 401 });
      resp.headers.set("Set-Cookie", cookieHeader);
      return resp;
    }

    return NextResponse.json({ message: "اشتراک یافت نشد" }, { status: 404 });
  } catch (error) {
    // console.log(error)
    return NextResponse.json(
      { message: "خطایی در سرور رخ" },
      { status: 500 }
    );
  }
}
