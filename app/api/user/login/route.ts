import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getClientIp } from "../../_utils";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const formData = new FormData();
        formData.append("Phone", body.username);

        const md5Password = crypto.createHash("md5").update(String(body.password)).digest("hex");
        formData.append("password", md5Password);
        
        // Use improved IP extraction utility
        formData.append('IPAddress', "127.0.0.1");
        console.log(formData)
        const upstreamResponse = await fetch("http://localhost:8000/user/login", {
            method: "POST",
            body: formData,
        });
        const data = await upstreamResponse.json();
        console.log(data)
        if (data.token) {
            console.log(data.token)
            // Use Next.js cookies API to properly set the cookie
            const response = NextResponse.json({ msg: "LoggedIn" }, { status: 200 });
            
            // // Set cookie using Next.js cookies API (more reliable in production)
            // response.cookies.set("LoggedUser", data.token, {
            //     path: "/",
            //     maxAge: 12 * 60 * 60, // 12 hours in seconds
            //     httpOnly: false,
            //     // secure: process.env.NODE_ENV === "production", // Secure in production only
            //     // sameSite: "lax", // Changed from Strict to Lax for better redirect compatibility
            // });
             // Set cookie using Next.js cookies API (more reliable in production)
            response.cookies.set("LoggedUser", data.token, {
                path: "/",
                maxAge: 12 * 60 * 60, // 12 hours
                domain: ".cafegah.ir",
                httpOnly: false,     // accessible from JS
                sameSite: "none",    // REQUIRED for cross-domain
                secure: true,        // REQUIRED when sameSite = "none"
            });
            
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