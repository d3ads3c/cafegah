import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "../../_utils";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { subscriptionSerial, userId } = body;

        if (!subscriptionSerial || !userId) {
            return NextResponse.json(
                { message: "شناسه اشتراک و کاربر مورد نیاز است" },
                { status: 400 }
            );
        }

        // Get the logged user token from cookies
        const loggedUserCookie = request.cookies.get("LoggedUser");
        const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;

        // Send request to backend to remove user
        const formData = new FormData();
        if (loggedUser) {
            formData.append("token", loggedUser);
        } else {
            formData.append("token", "null");
        }
        formData.append("serial", subscriptionSerial);
        formData.append("user_id", userId);

        // Use improved IP extraction utility
        const clientIp = getClientIp(request);
        if (clientIp) formData.append('ipaddress', "127.0.0.1");

        const backendResponse = await fetch("http://localhost:8000/subscription/remove-user", {
            method: "POST",
            body: formData,
        });

        const backendData = await backendResponse.json();

        if (backendData.Status === "Success") {
            return NextResponse.json(
                { message: "کاربر با موفقیت حذف شد" },
                { status: 200 }
            );
        } else if (backendData === "Logout") {
            const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
            const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 401 });
            resp.headers.set("Set-Cookie", cookieHeader);
            return resp;
        }

        return NextResponse.json(
            { message: backendData.message || "خطایی رخ داد" },
            { status: 400 }
        );
    } catch (error) {
        console.error("[remove-user] error:", error);

        return NextResponse.json(
            { message: "خطایی در سرور رخ داد" },
            { status: 500 }
        );
    }
}
