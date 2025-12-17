"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Toast from "@/app/components/ui/Toast";

type MySubscription = {
  ID: string;
  Plan: string;
  Status: string;
  BuyDate: string;
  CafeName: string;
  Phone: string;
  Email: string;
  Users: string;
  Serial: string;
  Days?: string;
  Owner: string;
};

type SupportTicket = {
  ID: number;
  UserID: string;
  SubscriptionSerial?: string | null;
  Subject: string;
  InitialMessage?: string;
  Message?: string;
  Priority: "low" | "normal" | "high" | "urgent" | string;
  Status: string;
  Category?: string;
  AssignedAdmin?: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  LastReplyAt?: string | null;
  LastReplyFromSupport?: boolean | null;
};

type TicketMessage = {
  ID: number;
  TicketID: number;
  SenderType: "user" | "admin";
  SenderID: string;
  Message: string;
  CreatedAt: string;
};

export default function SupportTicketsPage() {
  const [subs, setSubs] = useState<MySubscription[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedSerial, setSelectedSerial] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high" | "urgent">(
    "normal"
  );
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [ticketsMeta, setTicketsMeta] = useState({
    page: 1,
    perPage: 20,
    total: 0,
    totalPages: 1,
  });
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [ticketMessages, setTicketMessages] = useState<TicketMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const formatDate = (value: string) => {
    const date = value ? new Date(value) : null;
    if (!date || Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("fa-IR");
  };

  const getStatusStyle = (status: string) => {
    const normalized = status?.toLowerCase?.() || "";
    const labelMap: Record<string, string> = {
      open: "باز",
      pending: "در انتظار",
      closed: "بسته",
      resolved: "حل شده",
    };
    const classMap: Record<string, string> = {
      open: "bg-green-50 text-green-700 border-green-100",
      pending: "bg-amber-50 text-amber-700 border-amber-100",
      closed: "bg-gray-100 text-gray-700 border-gray-200",
      resolved: "bg-teal-50 text-teal-700 border-teal-100",
    };

    return {
      label: labelMap[normalized] || status || "نامشخص",
      className:
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold " +
        (classMap[normalized] || "bg-gray-50 text-gray-700 border-gray-200"),
    };
  };

  const getPriorityStyle = (priorityValue: string) => {
    const normalized = priorityValue?.toLowerCase?.() || "";
    const labelMap: Record<string, string> = {
      low: "کم",
      normal: "عادی",
      high: "بالا",
      urgent: "فوری",
    };
    const classMap: Record<string, string> = {
      low: "bg-blue-50 text-blue-700 border-blue-100",
      normal: "bg-gray-50 text-gray-700 border-gray-200",
      high: "bg-amber-50 text-amber-700 border-amber-100",
      urgent: "bg-rose-50 text-rose-700 border-rose-100",
    };

    return {
      label: labelMap[normalized] || priorityValue || "نامشخص",
      className:
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold " +
        (classMap[normalized] || "bg-gray-50 text-gray-700 border-gray-200"),
    };
  };

  const fetchTickets = useCallback(async (page = 1) => {
    setIsLoadingTickets(true);
    try {
      const res = await fetch("/api/support/tickets/my", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page,
          per_page: 20,
        }),
      });

      const data = await res.json();

      if (data.Status === "Success" && Array.isArray(data.Tickets)) {
        setTickets(data.Tickets);
        setTicketsMeta({
          page: data.Page ?? page ?? 1,
          perPage: data.PerPage ?? 20,
          total: data.Total ?? data.Tickets.length,
          totalPages: data.TotalPages ?? 1,
        });
      } else if (data.msg === "LoggedOut") {
        setTickets([]);
        setToastMessage("ابتدا وارد حساب کاربری خود شوید");
        setToastType("error");
        setShowToast(true);
      } else {
        const errorMessage = data.Error || "دریافت تیکت‌ها با خطا مواجه شد";
        setToastMessage(errorMessage);
        setToastType("error");
        setShowToast(true);
      }
    } catch {
      setToastMessage("دریافت تیکت‌ها با خطا مواجه شد");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsLoadingTickets(false);
    }
  }, []);

  const fetchTicketMessages = useCallback(async (ticketId: number) => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch("/api/support/tickets/history", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket_id: ticketId,
          page: 1,
          per_page: 100,
        }),
      });

      const data = await res.json();

      if (data.Status === "Success") {
        // Update ticket info if available
        if (data.Ticket) {
          setSelectedTicket((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              ...data.Ticket,
              InitialMessage: data.Ticket.InitialMessage || prev.InitialMessage,
            };
          });
        }
        // Set messages from response
        if (Array.isArray(data.Messages)) {
          setTicketMessages(data.Messages);
        } else {
          setTicketMessages([]);
        }
      } else if (data.msg === "LoggedOut") {
        setToastMessage("ابتدا وارد حساب کاربری خود شوید");
        setToastType("error");
        setShowToast(true);
        setTicketMessages([]);
      } else {
        setTicketMessages([]);
        const errorMessage = data.Error || "دریافت جزئیات تیکت با خطا مواجه شد";
        setToastMessage(errorMessage);
        setToastType("error");
        setShowToast(true);
      }
    } catch {
      setTicketMessages([]);
      setToastMessage("دریافت جزئیات تیکت با خطا مواجه شد");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsLoadingMessages(false);
    }
  }, []);

  const handleSendReply = async () => {
    if (!selectedTicket) return;
    if (!replyMessage.trim()) {
      setToastMessage("متن پاسخ را وارد کنید");
      setToastType("error");
      setShowToast(true);
      return;
    }

    setIsSendingReply(true);
    try {
      const res = await fetch("/api/support/tickets/reply", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket_id: selectedTicket.ID,
          message: replyMessage.trim(),
        }),
      });

      const data = await res.json();

      if (data.Status === "Success" || data.msg === "Success") {
        setToastMessage("پاسخ شما ارسال شد");
        setToastType("success");
        setShowToast(true);
        setReplyMessage("");
        void fetchTicketMessages(selectedTicket.ID);
        void fetchTickets(ticketsMeta.page);
      } else if (data.msg === "LoggedOut") {
        setToastMessage("ابتدا وارد حساب کاربری خود شوید");
        setToastType("error");
        setShowToast(true);
      } else {
        setToastMessage(data.Error || "ارسال پاسخ با خطا مواجه شد");
        setToastType("error");
        setShowToast(true);
      }
    } catch {
      setToastMessage("ارسال پاسخ با خطای غیرمنتظره‌ای مواجه شد");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSendingReply(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ticketMessages]);

  useEffect(() => {
    async function loadSubs() {
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
        if (Array.isArray(data)) {
          setSubs(data);
        } else if (Array.isArray(data.Subs)) {
          setSubs(data.Subs);
        }
      } catch {
        // ignore, user will still be able to send a general ticket
      }
    }

    loadSubs();
  }, []);

  useEffect(() => {
    void fetchTickets();
  }, [fetchTickets]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDetailDrawer = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setReplyMessage("");
    setTicketMessages([]);
    setIsDetailDrawerOpen(true);
    void fetchTicketMessages(ticket.ID);
  };

  const closeDetailDrawer = () => {
    setIsDetailDrawerOpen(false);
    setSelectedTicket(null);
    setReplyMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setToastMessage("موضوع و متن تیکت را وارد کنید");
      setToastType("error");
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/support/tickets/new", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          message,
          priority,
          subscription_serial: selectedSerial,
          category,
        }),
      });

      const data = await res.json();

      if (data.Status === "Success" || data.msg === "Success") {
        setToastMessage("تیکت شما با موفقیت ثبت شد");
        setToastType("success");
        setShowToast(true);
        setIsDrawerOpen(false);
        setSubject("");
        setMessage("");
        setSelectedSerial(null);
        setCategory("");
        void fetchTickets(ticketsMeta.page);
      } else if (data.msg === "LoggedOut") {
        setToastMessage("ابتدا وارد حساب کاربری خود شوید");
        setToastType("error");
        setShowToast(true);
      } else {
        setToastMessage(data.Error || "ثبت تیکت با خطا مواجه شد");
        setToastType("error");
        setShowToast(true);
      }
    } catch {
      setToastMessage("خطای غیرمنتظره‌ای رخ داد");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">تیکت‌های پشتیبانی</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            هر زمان سوال یا مشکلی داشتید، از این بخش برای ثبت تیکت استفاده کنید.
          </p>
        </div>
        <button
          type="button"
          onClick={openDrawer}
          className="bg-teal-600 text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-teal-700 transition-colors w-full sm:w-auto"
        >
          تیکت جدید
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">لیست تیکت‌ها</h2>
            <p className="text-xs sm:text-sm text-gray-500">آخرین تیکت‌های ثبت‌شده شما.</p>
          </div>
          <button
            type="button"
            onClick={() => void fetchTickets(ticketsMeta.page)}
            disabled={isLoadingTickets}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-xs font-bold hover:border-teal-500 hover:text-teal-700 transition-colors disabled:opacity-60 w-full sm:w-auto justify-center"
          >
            <i className="fi fi-rr-rotate-right text-sm" />
            {isLoadingTickets ? "در حال بروزرسانی" : "به‌روزرسانی"}
          </button>
        </div>

        {isLoadingTickets ? (
          <div className="text-center text-gray-500 text-sm py-6">
            در حال بارگذاری لیست تیکت‌ها...
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-6">
            هنوز تیکتی ثبت نکرده‌اید. با دکمه <span className="font-bold">تیکت جدید</span>{" "}
            تیکت خود را ایجاد کنید.
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => {
              const statusStyle = getStatusStyle(t.Status);
              const priorityStyle = getPriorityStyle(t.Priority);
              const messageText = t.InitialMessage || t.Message || "—";
              const categoryLabelMap: Record<string, string> = {
                billing: "مالی / صورتحساب",
                technical: "فنی",
                general: "عمومی",
              };
              const categoryLabel =
                t.Category && categoryLabelMap[t.Category.toLowerCase()]
                  ? categoryLabelMap[t.Category.toLowerCase()]
                  : t.Category;
              return (
                <div
                  key={t.ID}
                  className="rounded-xl border border-gray-100 p-3 sm:p-4 cursor-pointer hover:border-teal-400 hover:bg-white transition-colors"
                  onClick={() => openDetailDrawer(t)}
                >
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2">
                    <div className="text-sm sm:text-base font-bold text-gray-900 flex-1">{t.Subject}</div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <span className={statusStyle.className}>{statusStyle.label}</span>
                      <span className={priorityStyle.className}>{priorityStyle.label}</span>
                      {categoryLabel ? (
                        <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 border-indigo-100">
                          {categoryLabel}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {t.SubscriptionSerial ? (
                    <div className="mt-2 text-xs text-gray-600">
                      اشتراک مرتبط: <span className="font-semibold">{t.SubscriptionSerial}</span>
                    </div>
                  ) : null}

                  <p className="mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-2">{messageText}</p>

                  <div className="mt-3 text-xs text-gray-500 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
                    <span>ثبت: {formatDate(t.CreatedAt)}</span>
                    <span>آخرین بروزرسانی: {formatDate(t.UpdatedAt)}</span>
                    {t.LastReplyAt ? <span>آخرین پاسخ: {formatDate(t.LastReplyAt)}</span> : null}
                    {t.AssignedAdmin ? <span>کارشناس: {t.AssignedAdmin}</span> : null}
                    {t.LastReplyFromSupport !== undefined && t.LastReplyFromSupport !== null ? (
                      <span>
                        آخرین پاسخ توسط:{" "}
                        {t.LastReplyFromSupport ? "پشتیبانی" : "کاربر"}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm p-0 sm:p-2"
          onClick={closeDrawer}
        >
          <div
            className="w-full sm:max-w-lg h-full bg-white shadow-2xl p-4 sm:p-6 overflow-auto rounded-none sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">تیکت جدید</h2>
              <button
                type="button"
                onClick={closeDrawer}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fi fi-sr-cross text-lg" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1">انتخاب اشتراک (اختیاری)</label>
                <div className="space-y-2 max-h-40 overflow-auto rounded-xl">
                  {subs.length === 0 ? (
                    <p className="text-xs text-gray-400">
                      اشتراکی یافت نشد. می‌توانید بدون انتخاب اشتراک نیز تیکت ارسال کنید.
                    </p>
                  ) : (
                    subs.map((s) => (
                      <label
                        key={s.Serial}
                        className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm cursor-pointer transition-colors ${
                          selectedSerial === s.Serial
                            ? "border-teal-500 bg-teal-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="subscription"
                          className="accent-teal-600"
                          checked={selectedSerial === s.Serial}
                          onChange={() => setSelectedSerial(s.Serial)}
                        />
                        <div>
                          <div className="font-bold">{s.CafeName || "بدون نام"}</div>
                          <div className="text-xs text-gray-500">
                            {s.Plan} • سریال: {s.Serial}
                          </div>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">موضوع تیکت</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-600"
                  placeholder="مثلاً مشکل در اتصال نرم‌افزار"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm mb-1">اولویت</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-600"
                    value={priority}
                    onChange={(e) => {
                      const value = e.target.value as
                        | "low"
                        | "normal"
                        | "high"
                        | "urgent";
                      setPriority(value);
                    }}
                  >
                    <option value="normal">عادی</option>
                    <option value="high">بالا</option>
                    <option value="urgent">فوری</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">دسته‌بندی (اختیاری)</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-600"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">بدون دسته‌بندی</option>
                    <option value="billing">مالی / صورتحساب</option>
                    <option value="technical">فنی</option>
                    <option value="general">عمومی</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">متن تیکت</label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-600 min-h-[150px]"
                  placeholder="لطفاً مشکل یا سوال خود را با جزئیات توضیح دهید..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white rounded-xl py-3 font-bold hover:bg-teal-700 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "در حال ارسال..." : "ارسال تیکت"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDetailDrawerOpen && selectedTicket && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm p-0 sm:p-2"
          onClick={closeDetailDrawer}
        >
          <div
            className="w-full sm:max-w-xl h-full bg-white shadow-2xl p-4 sm:p-6 overflow-auto rounded-none sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">جزئیات تیکت #{selectedTicket.ID}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedTicket.Subject}</p>
              </div>
              <button
                type="button"
                onClick={closeDetailDrawer}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fi fi-sr-cross text-lg" />
              </button>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span className={getStatusStyle(selectedTicket.Status).className}>
                  {getStatusStyle(selectedTicket.Status).label}
                </span>
                <span className={getPriorityStyle(selectedTicket.Priority).className}>
                  {getPriorityStyle(selectedTicket.Priority).label}
                </span>
                {selectedTicket.Category && (
                  <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 border-indigo-100">
                    {(() => {
                      const map: Record<string, string> = {
                        billing: "مالی / صورتحساب",
                        technical: "فنی",
                        general: "عمومی",
                      };
                      const key = selectedTicket.Category.toLowerCase();
                      return map[key] || selectedTicket.Category;
                    })()}
                  </span>
                )}
              </div>

              {selectedTicket.SubscriptionSerial && (
                <div className="text-gray-600">
                  <span className="font-semibold">اشتراک مرتبط: </span>
                  {selectedTicket.SubscriptionSerial}
                </div>
              )}

              <div className="text-gray-600 space-y-1">
                <div>
                  <span className="font-semibold">ثبت:</span>{" "}
                  {formatDate(selectedTicket.CreatedAt)}
                </div>
                <div>
                  <span className="font-semibold">آخرین بروزرسانی:</span>{" "}
                  {formatDate(selectedTicket.UpdatedAt)}
                </div>
                {selectedTicket.LastReplyAt && (
                  <div>
                    <span className="font-semibold">آخرین پاسخ:</span>{" "}
                    {formatDate(selectedTicket.LastReplyAt)}
                  </div>
                )}
                {selectedTicket.AssignedAdmin && (
                  <div>
                    <span className="font-semibold">کارشناس:</span>{" "}
                    {selectedTicket.AssignedAdmin}
                  </div>
                )}
                {selectedTicket.LastReplyFromSupport !== undefined &&
                  selectedTicket.LastReplyFromSupport !== null && (
                    <div>
                      <span className="font-semibold">آخرین پاسخ توسط:</span>{" "}
                      {selectedTicket.LastReplyFromSupport ? "پشتیبانی" : "کاربر"}
                    </div>
                  )}
              </div>

            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-bold mb-3">تاریخچه گفت‌وگو</h3>
              
              {isLoadingMessages ? (
                <div className="text-center text-gray-500 text-sm py-8">
                  در حال بارگذاری پیام‌ها...
                </div>
              ) : ticketMessages.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-8">
                  هنوز پیامی در این تیکت ثبت نشده است.
                </div>
              ) : (
                <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2">
                  {ticketMessages.map((msg) => {
                    const isUser = msg.SenderType === "user";
                    return (
                      <div
                        key={msg.ID}
                        className={`flex ${isUser ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-2xl ${
                            isUser
                              ? "bg-teal-600 text-white rounded-br-none"
                              : "bg-gray-100 text-gray-700 rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.Message}</p>
                          <span
                            className={`text-[10px] block mt-1 ${
                              isUser ? "text-white/80" : "text-gray-500"
                            }`}
                          >
                            {formatDate(msg.CreatedAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-sm font-bold mb-2">ارسال پاسخ جدید</h4>
                <textarea
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-600 min-h-[120px]"
                  placeholder="پاسخ خود را برای این تیکت بنویسید..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSendReply}
                  disabled={isSendingReply}
                  className="mt-3 w-full bg-teal-600 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-teal-700 transition-colors disabled:opacity-60"
                >
                  {isSendingReply ? "در حال ارسال..." : "ارسال پاسخ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}


