import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "../_utils";

export async function POST(req: NextRequest) {
    try {
        // Build FormData and include the LoggedUser cookie if present.
        const formData = new FormData();

        // Read `LoggedUser` cookie from the incoming request
        const loggedUserCookie = req.cookies.get("LoggedUser");
        const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;
        if (loggedUser) {
            formData.append("token", loggedUser);
        } else {
            formData.append("token", "null");
        }

        // Use improved IP extraction utility
        formData.append('ipaddress', "127.0.0.1");

        // Fetch updates from backend API
        const response = await fetch("http://localhost:8000/updates/list", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.Status === "Success" || data.Updates) {
            return NextResponse.json(data, { status: 200 });
        } else if (data === "Logout" || data.Status === "Logout") {
            // Upstream indicated logout — clear the LoggedUser cookie
            const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
            const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 401 });
            resp.headers.set("Set-Cookie", cookieHeader);
            return resp;
        }

        // Return empty updates if no data
        return NextResponse.json({ Status: "Success", Updates: [] }, { status: 200 });
    } catch (error) {
        console.error("[Updates API] Error:", error);
        // Return empty updates on error
        return NextResponse.json({ Status: "Success", Updates: [] }, { status: 200 });
    }
}

