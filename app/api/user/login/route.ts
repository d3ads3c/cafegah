import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        // Read the stream body and convert it to a JSON object
        const body = await req.json();
        const formData = new FormData();
        formData.append("Phone", body.username);

        // Send password as MD5 hex digest to the upstream API
        // Ensure we stringify the input (in case it's not a string)
        const md5Password = crypto.createHash("md5").update(String(body.password)).digest("hex");
        formData.append("password", md5Password);

        // Determine client IP. Prefer X-Forwarded-For (can contain a list), then X-Real-IP,
        // then fall back to any ip property that might exist on the request object.
        const xff = req.headers.get('x-forwarded-for');
        // Prefer the first value in X-Forwarded-For, otherwise fall back to X-Real-IP.
        // Avoid using `any` cast on `req` — NextRequest doesn't expose an `ip` property.
        const clientIp = xff ? xff.split(',')[0].trim() : (req.headers.get('x-real-ip') || '');
        if (clientIp) formData.append('IPAddress', clientIp);

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
                maxAge: 2 * 60 * 60, // 2 hours in seconds
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