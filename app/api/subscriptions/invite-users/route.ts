import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "../../_utils";

type Permission =
    | "view_dashboard"
    | "manage_menu"
    | "manage_orders"
    | "manage_customers"
    | "manage_categories"
    | "manage_users"
    | "manage_tables"
    | "manage_buylist"
    | "manage_accounting";

interface InviteUserRequest {
    subscriptionSerial: string;
    users: Array<{
        email: string;
        permissions: Permission[];
    }>;
}

export async function POST(request: NextRequest) {
    try {
        const body: InviteUserRequest = await request.json();

        // Validate input
        if (!body.subscriptionSerial) {
            return NextResponse.json(
                { message: "شناسه اشتراک مورد نیاز است" },
                { status: 400 }
            );
        }

        if (!body.users || body.users.length === 0) {
            return NextResponse.json(
                { message: "حداقل یک کاربر مورد نیاز است" },
                { status: 400 }
            );
        }

        // Validate email format for all users
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        for (const user of body.users) {
            if (!emailRegex.test(user.email)) {
                return NextResponse.json(
                    { message: `ایمیل "${user.email}" معتبر نیست` },
                    { status: 400 }
                );
            }
        }

        // Get the logged user token from cookies
        const loggedUserCookie = request.cookies.get("LoggedUser");
        const loggedUser = loggedUserCookie ? loggedUserCookie.value : null;

        // Use improved IP extraction utility
        const clientIp = getClientIp(request);

        // Send invitation request for each user
        const invitationPromises = body.users.map(async (user) => {
            const formData = new FormData();
            formData.append("sub_serial", body.subscriptionSerial);
            formData.append("user_email", user.email);
            formData.append("permissions", user.permissions.join(",") || "0");
            formData.append("token", loggedUser || "null");
            if (clientIp) formData.append('ipaddress', clientIp);

            return fetch("http://localhost:8000/subscription/invite", {
                method: "POST",
                body: formData,
            });
        });

        const responses = await Promise.all(invitationPromises);
        const results = await Promise.all(responses.map(res => res.json()));

        // Check if all invitations were successful
        const allSuccess = results.every(result => result.Status === "Success");
        
        if (allSuccess) {
            return NextResponse.json(
                {
                    message: "دعوت نامه ها با موفقیت ارسال شدند",
                    invitedCount: body.users.length,
                },
                { status: 200 }
            );
        } else if (results.some(result => result === "Logout")) {
            const cookieHeader = `LoggedUser=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`;
            const resp = NextResponse.json({ msg: "LoggedOut" }, { status: 401 });
            resp.headers.set("Set-Cookie", cookieHeader);
            return resp;
        }

        return NextResponse.json(
            { message: results[0]?.message || "خطایی رخ داد" },
            { status: 400 }
        );
    } catch (error) {
        console.error("[invite-users] error:", error);

        return NextResponse.json(
            { message: "خطایی در سرور رخ داد" },
            { status: 500 }
        );
    }
}
