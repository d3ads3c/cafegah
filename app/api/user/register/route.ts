import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getClientIp } from "../../_utils";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));

        // Support multiple possible incoming field names
        const username = body.username;

        const Fname = body.fname;
        const Lname = body.lname;
        const Email = body.Email
        const md5Password = crypto.createHash("md5").update(String(body.password)).digest("hex");
        if (!username || !md5Password) {
            return NextResponse.json({ msg: 'missing_fields' }, { status: 400 });
        }

        const formData = new FormData();
        formData.append('Phone', username);
        formData.append("password", md5Password);
        formData.append('Fname', Fname);
        formData.append('Lname', Lname);
        formData.append('Email', Email)
        
        // Use improved IP extraction utility
        formData.append('ipaddress', "127.0.0.1");

        const upstreamHeaders: Record<string, string> = {
            // let fetch set the Content-Type for FormData; but include Accept
            Accept: 'application/json',
        };
        // if (clientIp) upstreamHeaders['X-Forwarded-For'] = clientIp;

        const upstream = await fetch('http://localhost:8000/user/register', {
            method: 'POST',
            body: formData,
            headers: upstreamHeaders,
        });

        const data = await upstream.json().catch(() => ({}));
        if (data.Error) {
            console.log(data.Error)
        }
        if (data.token) {
            // Use Next.js cookies API to properly set the cookie
            const res = NextResponse.json(
                { msg: 'LoggedIn', Username: data.Username, FullName: data.FullName },
                { status: 200 }
            );
            
            // Set cookie using Next.js cookies API (more reliable in production)
            res.cookies.set("LoggedUser", data.token, {
                path: "/",
                maxAge: 12 * 60 * 60, // 12 hours in seconds (matching login route)
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Secure in production only
                sameSite: "lax", // Changed from Strict to Lax for better redirect compatibility
            });
            
            return res;
        }

        if (data.Status === 'Failed') {
            return NextResponse.json({ msg: 'Failed' }, { status: 400 });
        }

        if (data.Status === 'Duplicate') {
            return NextResponse.json({ msg: 'Duplicate' }, { status: 400 });
        }

        // Generic fallback
        return NextResponse.json({ msg: data.msg }, { status: upstream.status || 200 });
    } catch (err) {
        console.error('register route error', err);
        return NextResponse.json({ msg: 'عملیات با خطا مواجه شد' }, { status: 500 });
    }
}