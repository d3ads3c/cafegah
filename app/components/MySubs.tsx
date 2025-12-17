"use client";
import ProgressBar from "./ui/ProgressBar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MySubscriptions } from "@/types/AllTypes";
import UpdateModal from "./UpdateModal";
import { useRouter } from "next/navigation";

interface Invitation {
  InvitationID: string;
  InvitedEmail: string;
  SubscriptionSerial: string;
  Status: string;
  Permissions: string;
  CafeName: string;
  Plan: string;
  Owner: string;
}

export default function MySubs() {
  // const [subs, setSubs] = useState<MySubscriptions[]>({
  //     ID: "",
  //     Plan: "",
  //     Status: "",
  //     Phone: "",
  //     Email: "",
  //     CafeName: "",
  //     Users: "",
  //     Serial: "",
  //     BuyDate: "",
  //     Days: ""
  // })
  const [subs, setSubs] = useState<MySubscriptions[] | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [modalSerial, setModalSerial] = useState<string | undefined>(undefined);
  const router = useRouter();
  const GetSubs = async () => {
    try {
      const res = await fetch("/api/subscriptions/my", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      setSubs(data);
    } catch (err) {}
  };

  const GetInvitations = async () => {
    try {
      const res = await fetch("/api/subscriptions/invitations", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      let invitationsList: Invitation[] = [];

      // API may return either an array of invitations directly
      // or an object like { Status: 'Success', Invitations: [...] }
      if (Array.isArray(data)) {
        invitationsList = data as Invitation[];
      } else if (
        data &&
        data.Status === "Success" &&
        Array.isArray(data.Invitations)
      ) {
        invitationsList = data.Invitations as Invitation[];
      } else if (data && Array.isArray(data.Invitations)) {
        // Fallback: if Invitations is present and is an array, use it
        invitationsList = data.Invitations as Invitation[];
      }

      // Filter to show only invitations with 'invited' status
      const filteredInvitations = invitationsList.filter(
        (inv) => inv.Status === "invited"
      );
      setInvitations(filteredInvitations);
    } catch (err) {
      console.error("GetInvitations error:", err);
      setInvitations([]);
    }
  };

  useEffect(() => {
    GetSubs();
    GetInvitations();
  }, []);

  const EnterSub = async (serial: string) => {
    try {
      const res = await fetch("/api/subscriptions/enter", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serial: serial }),
      });

      const data = await res.json();
      if (data.Status === "Success") {
        router.push(data.Link);
      }
    } catch (err) {}
  };

  const HandleInvitationResponse = async (
    invitationID: string,
    accept: boolean
  ) => {
    try {
      const endpoint = accept
        ? "/api/subscriptions/invitation-accept"
        : "/api/subscriptions/invitation-reject";

      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invitation_id: invitationID }),
      });

      const data = await res.json();
      if (data.Status === "Success") {
        GetInvitations();
        if (accept) {
          GetSubs();
        }
      }
    } catch (err) {
      console.error("HandleInvitationResponse error:", err);
    }
  };

  return (
    <div className="my-5">
      {invitations && invitations.length > 0 && (
        <>
          <div className="">
            <h2 className="text-lg font-bold text-gray-900">
              دعوت نامه های انتظار
            </h2>
          </div>
          <div className="mt-4 flex w-full overflow-auto gap-5">
            {invitations && invitations.length > 0 ? (
              invitations.map((inv) => (
                <div
                  key={inv.InvitationID}
                  className="w-[350px] min-w-[350px] xl:w-[450px] xl:min-w-[450px] rounded-2xl bg-white border border-gray-100 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="size-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <i className="fi fi-sr-user-add text-2xl text-blue-500 mt-2"></i>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="font-bold">
                            {inv.CafeName || "بدون نام"}
                          </h2>
                          <p className="text-gray-400 text-xs">
                            {inv.Plan || "-"}
                          </p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-500 rounded-xl py-1 px-3">
                          <p className="font-bold text-sm">دعوت شده</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">
                      <span className="font-bold">مالک:</span> {inv.Owner}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-bold">دسترسی‌ها:</span>{" "}
                      {inv.Permissions.split(",").length} دسترسی
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-5">
                    <button
                      type="button"
                      onClick={() =>
                        HandleInvitationResponse(inv.InvitationID, false)
                      }
                      className="border border-red-600 text-red-600 rounded-xl py-3 w-1/2 text-center font-bold text-sm hover:bg-red-50 transition-colors"
                    >
                      رد
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        HandleInvitationResponse(inv.InvitationID, true)
                      }
                      className="bg-teal-600 cursor-pointer text-white rounded-xl py-3 w-1/2 text-center font-bold text-sm hover:bg-teal-700 transition-colors"
                    >
                      پذیرش
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">
                دعوت نامه‌ای در انتظار ندارید
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-900">اشتراک های من</h2>
      </div>
      <div className="mt-4 flex w-full overflow-auto gap-5">
        {subs && subs.length > 0 ? (
          subs.map((s) => (
            <div
              key={s.ID ?? s.Serial ?? `${s.CafeName}-${Math.random()}`}
              className="w-[350px] min-w-[350px] xl:w-[450px] xl:min-w-[450px] rounded-2xl bg-white border border-gray-100 p-4"
            >
              <div className="flex items-center gap-3">
                <div>
                  <div className="size-16 rounded-2xl bg-teal-100 flex items-center justify-center">
                    <i className="fi fi-sr-store-alt text-2xl text-teal-500 mt-2"></i>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-bold">{s.CafeName || "بدون نام"}</h2>
                      <p className="text-gray-400 text-xs">{s.Plan || "-"}</p>
                    </div>
                    <div
                      className={`${
                        s.Status === "active"
                          ? "bg-teal-100 text-teal-500"
                          : s.Status === "pending"
                          ? "bg-orange-100 text-orange-500"
                          : "bg-gray-100 text-gray-500"
                      } rounded-xl py-1 px-3`}
                    >
                      <p className="font-bold text-sm">
                        {s.Status === "active"
                          ? "فعال"
                          : s.Status === "pending"
                          ? "غیرفعال"
                          : s.Status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-3">
                <ProgressBar progress={0} days={Number(s.Days ?? 0)} />
              </div>
              {s.Status == "pending" && (
                <div className="w-full rounded-xl p-4 bg-orange-100 text-orange-400 text-center">
                  <p>فاکتور شما آماده پرداخت می باشد</p>
                </div>
              )}
              <div className="flex items-center justify-center gap-4 mt-5">
                {s.Status === "active" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => EnterSub(s.Serial)}
                      className={`bg-teal-600 cursor-pointer text-white rounded-xl py-3 text-center font-bold text-sm hover:bg-teal-700 transition-colors ${
                        s.Type === "Owner" ? "w-1/2" : "w-full"
                      }`}
                    >
                      ورود به پنل
                    </button>
                    {s.Type === "Owner" && (
                      <Link
                        href={`/dashboard/subscription/${s.Serial}`}
                        className="border border-teal-600 text-teal-600 rounded-xl py-3 w-1/2 text-center font-bold text-sm hover:bg-teal-50 transition-colors"
                      >
                        مدیریت اشتراک
                      </Link>
                    )}
                  </>
                ) : s.Status === "pending" ? (
                  <>
                    <Link
                      href={`/invoice/${s.Invoice}`}
                      className="bg-teal-600 text-white rounded-xl py-3 w-full text-center font-bold text-sm hover:bg-teal-700 transition-colors"
                    >
                      مشاهده و پرداخت
                    </Link>
                  </>
                ) : (
                  s.Status == "ready" && (
                    <>
                      <button
                        type="button"
                        name="ready"
                        onClick={() => {
                          setModalSerial(s.Serial);
                          setShowUpdateModal(true);
                        }}
                        className="bg-teal-600 text-white rounded-xl py-3 w-full text-center font-bold text-sm hover:bg-teal-700 transition-colors"
                      >
                        ورود به پنل
                      </button>
                    </>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400">اشتراکی یافت نشد</div>
        )}

        <Link
          href={"/dashboard/subscription/new"}
          className="w-[450px] min-w-[450px] duration-150 rounded-2xl bg-teal-50 cursor-pointer border border-teal-500 border-dashed p-4 flex items-center justify-center hover:border-solid hover:bg-teal-600 hover:[&_*>*]:text-white"
        >
          <div className="text-center">
            <i className="fi fi-sr-add text-teal-600 text-2xl"></i>
            <h3 className="font-bold text-lg -mt-1 mb-1">اشتراک جدید</h3>
            <p className="text-xs text-gray-400">
              جهت دریافت اشتراک نرم افزار جدید برای کافه
            </p>
          </div>
        </Link>
        {showUpdateModal && (
          <UpdateModal
            serial={modalSerial}
            onClose={() => setShowUpdateModal(false)}
          />
        )}
      </div>
    </div>
  );
}
