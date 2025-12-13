import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { serial } = body;

        if (!serial) {
            return NextResponse.json(
                { message: "شناسه اشتراک مورد نیاز است" },
                { status: 400 }
            );
        }

        // Get the logged user token from cookies
        const loggedUserCookie = request.cookies.get("LoggedUser");
        const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;

        // Fetch subscription details from backend
        const formData = new FormData();
        if (loggedUser) {
            formData.append("token", loggedUser);
        } else {
            formData.append("token", "null");
        }
        formData.append("serial", serial);

        const xff = request.headers.get('x-forwarded-for');
        const clientIp = xff ? xff.split(',')[0].trim() : (request.headers.get('x-real-ip') || '');
        if (clientIp) formData.append('ipaddress', clientIp);

        const backendResponse = await fetch("http://localhost:8000/subscription/detail", {
            method: "POST",
            body: formData,
        });

        const backendData = await backendResponse.json();

        if (backendData.Status === "Success") {
            const subscription = backendData.Sub;
            
            // Format the subscription data to match MySubscriptions type
            const formattedSubscription = {
                ID: subscription.ID || "",
                Serial: subscription.Serial || serial,
                CafeName: subscription.CafeName || "",
                Plan: subscription.Plan || "",
                Status: subscription.Status || "active",
                BuyDate: subscription.BuyDate || "",
                Days: subscription.Days || "0",
                Phone: subscription.Phone || "",
                Email: subscription.Email || "",
                Users: subscription.Users || "0",
                Owner: subscription.Owner || "",
                City: subscription.City || "",
                State: subscription.State || "",
                PostalCode: subscription.PostalCode || "",
                Address: subscription.Address || "",
                Invoice: subscription.Invoice || "",
            };

            return NextResponse.json(
                {
                    subscription: formattedSubscription,
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
            { message: "اشتراک یافت نشد" },
            { status: 404 }
        );
    } catch (error) {
        console.error("[subscription-detail] error:", error);

        return NextResponse.json(
            { message: "خطایی در سرور رخ داد" },
            { status: 500 }
        );
    }
}
