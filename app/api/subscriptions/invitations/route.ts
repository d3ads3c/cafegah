import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "../../_utils";

export async function POST(request: NextRequest) {
    try {

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

        // Use improved IP extraction utility
        const clientIp = getClientIp(request);
        if (clientIp) formData.append('ipaddress', clientIp);

        const backendResponse = await fetch("http://localhost:8000/subscription/invitations", {
            method: "POST",
            body: formData,
        });

        const backendData = await backendResponse.json();

        if (backendData.Status === "Success") {
            return NextResponse.json(
                {
                    Invitations: backendData.Invitations,
                    Status: "Success"
                },
                { status: 200 }
            );
        } else if (backendData === "Logout" || backendData.Status === "Logout") {
            // Use Next.js cookies API to properly clear the cookie
            const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 401 });
            resp.cookies.set("LoggedUser", "", {
                path: "/",
                maxAge: 0,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            });
            return resp;
        }

        return NextResponse.json(
            { message: "اشتراک یافت نشد" },
            { status: 404 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "خطایی در سرور رخ داد" },
            { status: 500 }
        );
    }
}
