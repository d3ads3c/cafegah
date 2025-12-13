import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Get the logged user token from cookies
        const loggedUserCookie = request.cookies.get("LoggedUser");
        const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;

        // Get invitation_id from request body
        const body = await request.json();
        const { invitation_id } = body;

        if (!invitation_id) {
            return NextResponse.json(
                { message: "invitation_id is required" },
                { status: 400 }
            );
        }

        // Fetch subscription details from backend
        const formData = new FormData();
        if (loggedUser) {
            formData.append("token", loggedUser);
        } else {
            formData.append("token", "null");
        }
        formData.append("invitation_id", invitation_id);

        const xff = request.headers.get('x-forwarded-for');
        const clientIp = xff ? xff.split(',')[0].trim() : (request.headers.get('x-real-ip') || '');
        if (clientIp) formData.append('ipaddress', clientIp);

        const backendResponse = await fetch("http://localhost:8000/subscription/invitation/accept", {
            method: "POST",
            body: formData,
        });
        const backendData = await backendResponse.json();
        console.log(backendData)
        if (backendData.Status === "Success") {
            return NextResponse.json(
                {
                    Status: "Success",
                    message: "دعوت نامه پذیرفته شد"
                },
                { status: 200 }
            );
        } else if (backendData === "Logout") {
            const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
            const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 401 });
            resp.headers.set("Set-Cookie", cookieHeader);
            return resp;
        }

        return NextResponse.json(
            { message: backendData.message || "خطایی در پذیرش دعوت نامه رخ داد" },
            { status: 400 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "خطایی در سرور رخ داد" },
            { status: 500 }
        );
    }
}
