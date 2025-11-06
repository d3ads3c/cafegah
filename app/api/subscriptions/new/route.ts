import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Support both multipart/form-data (from the client FormData) and JSON
        const contentType = req.headers.get("content-type") || "";

        const payload: Record<string, unknown> = {};

        if (contentType.includes("multipart/form-data")) {
            // Parse FormData from the incoming request
            const fd = await req.formData();
            for (const [key, value] of fd.entries()) {
                // Files are unlikely here; if present, ignore or handle as needed
                if (typeof value === "string") {
                    payload[key] = value;
                } else {
                    // value could be a File — convert to placeholder or skip
                    payload[key] = "[file]";
                }
            }
        } else {
            // Try JSON body
            try {
                const json = await req.json();
                Object.assign(payload, json || {});
            } catch {
                // If body isn't JSON, leave payload empty
            }
        }

        // If features is a JSON string, parse it
        if (payload.features && typeof payload.features === "string") {
            try {
                payload.features = JSON.parse(payload.features);
            } catch {
                // leave as string if parsing fails
            }
        }


        // Basic validation
        const required = [
            "businessName",
            "ownerName",
            "telephone",
            "state",
            "city",
            "postalcode",
            "email",
            "phone",
            "plan",
            "billingAddress",
        ];

        const missing = required.filter((k) => {
            const v = payload[k];
            return v === undefined || v === null || String(v).trim() === "";
        });

        if (missing.length > 0) {
            return NextResponse.json({ error: "missing_fields", missing }, { status: 400 });
        }

        // Attach client IP if available
        const xff = req.headers.get("x-forwarded-for");
        const clientIp = xff ? xff.split(",")[0].trim() : req.headers.get("x-real-ip") || "";


        // Convert payload into FormData and forward to upstream API as multipart/form-data
        // (do not set content-type header; fetch will add the correct boundary)
        const form = new FormData();
        const loggedUserCookie = req.cookies.get("LoggedUser");
        const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;
        // send token and ipaddress as separate form fields so upstream can parse them as objects
        form.append("token", String(loggedUser || ""));
        form.append("ipaddress", String(clientIp || ""));
        for (const key of Object.keys(payload)) {
            const val = payload[key];
            if (val === undefined || val === null) continue;
            if (Array.isArray(val)) {
                // send arrays as JSON strings
                form.append(key, JSON.stringify(val));
            } else {
                form.append(key, String(val));
            }
        }
        const upstreamRes = await fetch("http://localhost:8000/subscription/new", {
            method: "POST",
            body: form,
        });

        const text = await upstreamRes.text();
        console.log(text)
        let upstreamBody: unknown = text;
        try {
            upstreamBody = JSON.parse(text);
        } catch {
            // upstream returned non-JSON; keep the raw text
        }

        // Propagate upstream status and body
        return NextResponse.json({ ok: upstreamRes.ok, data: upstreamBody }, { status: upstreamRes.status });
    } catch (err) {
        console.error("/api/subscriptions/new error:", err);
        return NextResponse.json({ error: "server_error", message: String(err) }, { status: 500 });
    }
}