import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "../../_utils";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json(
                { Status: "Failed", Error: "Message is required" },
                { status: 400 }
            );
        }

        // Use improved IP extraction utility
        const clientIp = getClientIp(req);

        // Read ChatUserId cookie (required for user identification, no login needed)
        let chatUserId: string | null = null;
        
        // Try to get from cookies first
        const chatUserIdCookie = req.cookies.get("ChatUserId");
        if (chatUserIdCookie) {
            chatUserId = chatUserIdCookie.value;
        }
        
        // Fallback: Try to read from Cookie header directly
        if (!chatUserId) {
            const cookieHeader = req.headers.get("cookie");
            if (cookieHeader) {
                const cookies = cookieHeader.split(';').map(c => c.trim());
                for (const cookie of cookies) {
                    const [name, value] = cookie.split('=');
                    if (name === 'ChatUserId' && value) {
                        chatUserId = decodeURIComponent(value);
                        break;
                    }
                }
            }
        }
        
        if (!chatUserId) {
            return NextResponse.json(
                { Status: "Failed", Error: "ChatUserId cookie is required" },
                { status: 400 }
            );
        }

        // Forward to backend API using FormData
        const formData = new FormData();
        formData.append('message', message);
        formData.append('token', 'dummy_token'); // Token is required in form but not used for authentication
        if (clientIp) formData.append('ipaddress', "127.0.0.1");

        // Forward ChatUserId cookie to backend
        console.log("Forwarding request to backend with ChatUserId:", chatUserId);
        const backendResponse = await fetch("http://localhost:8000/chat/send", {
            method: "POST",
            headers: {
                'Cookie': `ChatUserId=${chatUserId}`,
            },
            body: formData,
        });

        const backendData = await backendResponse.json();

        // Log backend response for debugging
        console.log("Backend response status:", backendResponse.status);
        console.log("Backend response data:", backendData);

        if (backendData.Status === "Success") {
            return NextResponse.json({
                Status: "Success",
                Message: backendData.Message
            });
        }

        // Return the exact error from backend
        return NextResponse.json(
            { 
                Status: backendData.Status || "Failed", 
                Error: backendData.Error || "Failed to send message" 
            },
            { status: backendResponse.status || 500 }
        );
    } catch (error) {
        console.error("Chat send error:", error);
        return NextResponse.json(
            { Status: "Failed", Error: "Internal server error" },
            { status: 500 }
        );
    }
}

