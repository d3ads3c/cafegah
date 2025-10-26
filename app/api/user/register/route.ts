import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));

        // Support multiple possible incoming field names
        const username = body.username;
        const password = body.password;
        const Fname = body.fname;
        const Lname = body.lname;

        if (!username || !password) {
            return NextResponse.json({ msg: 'missing_fields' }, { status: 400 });
        }

        const formData = new FormData();
        formData.append('Phone', username);
        formData.append('password', password);
        formData.append('Fname', Fname);
        formData.append('Lname', Lname);

        const upstream = await fetch('http://localhost:8000/user/register', {
            method: 'POST',
            body: formData,
            headers: {
                // let fetch set the Content-Type for FormData; but include Accept
                Accept: 'application/json',
            },
        });

        const data = await upstream.json().catch(() => ({}));
        if (data.token) {
            // create cookie header
            const cookie = `LoggedUser=${data.token}; Path=/; Max-Age=${2 * 60 * 60}; HttpOnly; SameSite=Strict`;
            const res = NextResponse.json(
                { msg: 'LoggedIn', Username: data.Username, FullName: data.FullName },
                { status: 200 }
            );
            res.headers.set('Set-Cookie', cookie);
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