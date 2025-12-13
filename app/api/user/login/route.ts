import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const formData = new FormData();
        formData.append("Phone", body.username);

        const md5Password = crypto.createHash("md5").update(String(body.password)).digest("hex");
        formData.append("password", md5Password);
        const xff = req.headers.get('x-forwarded-for');
        const clientIp = xff ? xff.split(',')[0].trim() : (req.headers.get('x-real-ip') || '');
        if (clientIp) formData.append('IPAddress', clientIp);
        console.log(formData)
        const response = await fetch("http://localhost:8000/user/login", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data)
        if (data.token) {
            console.log(data.token)
            // Function to set cookie
            type CookieOptions = {
                path?: string;
                maxAge?: number;
                secure?: boolean;
                httpOnly?: boolean;
                sameSite?: "Strict" | "Lax" | "None";
            };

            function setCookie(
                name: string,
                value: string,
                options: CookieOptions
            ) {
                let cookie = `${name}=${value}; Path=${options.path || "/"}; Max-Age=${options.maxAge}`;
                if (options.secure) cookie += "; Secure";
                if (options.httpOnly) cookie += "; HttpOnly";
                if (options.sameSite) cookie += `; SameSite=${options.sameSite}`;
                return cookie;
            }

            // Set the cookie in the response header
            const cookieHeader = setCookie("LoggedUser", data.token, {
                maxAge: 12 * 60 * 60, // 2 hours in seconds
                path: "/",
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
            });

            const response = NextResponse.json({ msg: "LoggedIn" }, { status: 200 });
            console.log(response)
            response.headers.set("Set-Cookie", cookieHeader);
            return response;
        } else if (data.Status == "No User Found") {
            console.log(data)
            return NextResponse.json({ msg: "invalid" }, { status: 200 });
        }

        // Ensure we always return a response. If upstream returned something
        // unexpected (no token and not "No User Found"), treat as invalid.
        return NextResponse.json({ msg: "invalid" }, { status: 200 });
    } catch {
        return NextResponse.json({ msg: "An error occurred" }, { status: 400 });
    }
}