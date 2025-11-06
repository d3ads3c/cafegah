"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthChecker() {
  const pathname = usePathname();
  const router = useRouter()

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/user/auth", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await res.json();
        if (!isMounted) return;
        if (data.msg == "LoggedOut") {
          router.push("/login")
        }
      } catch (err) {
        console.error("[AuthChecker] fetch error:", err);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  return null;
}
