import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getClientIp } from "../../_utils";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const { currentPassword, newPassword } = body || {};

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ msg: "missing_fields" }, { status: 400 });
        }

        const formData = new FormData();

        // Include token from cookie if present
        const loggedUserCookie = req.cookies.get("LoggedUser");
        const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;
        if (loggedUser) {
            formData.append("token", loggedUser);
        } else {
            formData.append("token", "null");
        }

        // Hash passwords similar to login/register flow
        const currentHash = crypto.createHash("md5").update(String(currentPassword)).digest("hex");
        const newHash = crypto.createHash("md5").update(String(newPassword)).digest("hex");

        formData.append("oldpassword", currentHash);
        formData.append("newpassword", newHash);

        // Use improved IP extraction utility
        const clientIp = getClientIp(req);
        if (clientIp) formData.append("ipaddress", clientIp);

        const upstream = await fetch("http://localhost:8000/user/change_password", {
            method: "POST",
            body: formData,
        });

        const data = await upstream.json().catch(() => ({}));

        if (data.Status === "Success") {
            return NextResponse.json({ Status: "Success" }, { status: 200 });
        }

        if (data === "Logout" || data.Status === "Logout") {
            const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
            const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 401 });
            resp.headers.set("Set-Cookie", cookieHeader);
            return resp;
        }

        return NextResponse.json(
            { msg: data.msg || "change_password_failed", Status: data.Status || "Failed" },
            { status: 400 }
        );
    } catch (error) {
        console.error("[ChangePassword API] error:", error);
        return NextResponse.json({ msg: "server_error" }, { status: 500 });
    }
}

