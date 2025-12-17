import { NextResponse } from "next/server";

export async function POST() {
    // Clear LoggedUser cookie
    const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
    const resp = NextResponse.json({ Status: "Success" }, { status: 200 });
    resp.headers.set("Set-Cookie", cookieHeader);
    return resp;
}

