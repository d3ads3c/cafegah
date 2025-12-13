"use client";

import { useState } from "react";
import Modal from "./ui/Modal";
import Toast from "./ui/Toast";
import PermissionsModal, { Permission } from "./PermissionsModal";

interface InviteUser {
    email: string;
    permissions: Permission[];
}

interface InviteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    subscriptionSerial: string | undefined;
}

export default function InviteUserModal({
    isOpen,
    onClose,
    subscriptionSerial,
}: InviteUserModalProps) {
    const [users, setUsers] = useState<InviteUser[]>([
        { email: "", permissions: [] },
    ]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [showPermissionsModal, setShowPermissionsModal] = useState(false);
    const [editingUserIndex, setEditingUserIndex] = useState<number | null>(null);

    const handleAddUser = () => {
        setUsers([...users, { email: "", permissions: [] }]);
    };

    const handleRemoveUser = (index: number) => {
        setUsers(users.filter((_, i) => i !== index));
    };

    const handleUserChange = (
        index: number,
        value: string
    ) => {
        const updatedUsers = [...users];
        updatedUsers[index] = {
            ...updatedUsers[index],
            email: value,
        };
        setUsers(updatedUsers);
    };

    const handleOpenPermissionsModal = (index: number) => {
        setEditingUserIndex(index);
        setShowPermissionsModal(true);
    };

    const handlePermissionsSubmit = (permissions: Permission[]) => {
        if (editingUserIndex !== null) {
            const updatedUsers = [...users];
            updatedUsers[editingUserIndex].permissions = permissions;
            setUsers(updatedUsers);
        }
        setEditingUserIndex(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate emails
        const validEmails = users.filter((u) => u.email.trim() !== "");
        if (validEmails.length === 0) {
            setToast({
                type: "error",
                message: "لطفا حداقل یک ایمیل وارد کنید",
            });
            setShowToast(true);
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        for (const user of validEmails) {
            if (!emailRegex.test(user.email)) {
                setToast({
                    type: "error",
                    message: `ایمیل "${user.email}" معتبر نیست`,
                });
                setShowToast(true);
                return;
            }
        }

        // Validate at least one permission selected
        for (const user of validEmails) {
            if (user.permissions.length === 0) {
                setToast({
                    type: "error",
                    message: `لطفا برای ${user.email} حداقل یک دسترسی انتخاب کنید`,
                });
                setShowToast(true);
                return;
            }
        }

        setLoading(true);

        try {
            const response = await fetch(
                "/api/subscriptions/invite-users",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        subscriptionSerial,
                        users: validEmails,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "خطایی رخ داد");
            }

            setToast({
                type: "success",
                message: "دعوت نامه ها با موفقیت ارسال شدند",
            });
            setShowToast(true);

            // Reset form
            setUsers([{ email: "", permissions: [] }]);

            // Close modal after 2 seconds
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            setToast({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "خطایی رخ داد",
            });
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} width="w-[600px]">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        دعوت کاربران
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <i className="fi fi-br-cross text-lg"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {users.map((user, index) => (
                            <div
                                key={index}
                                className="flex items-end gap-3 p-4 bg-gray-50 rounded-xl"
                            >
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        ایمیل
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        value={user.email}
                                        onChange={(e) =>
                                            handleUserChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        دسترسی ها
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => handleOpenPermissionsModal(index)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-right bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">
                                                {user.permissions.length > 0
                                                    ? `${user.permissions.length} دسترسی انتخاب شده`
                                                    : "انتخاب دسترسی ها"}
                                            </span>
                                            <i className="fi fi-br-angle-left text-gray-400"></i>
                                        </div>
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveUser(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <i className="fi fi-br-trash text-lg"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Permission levels explanation */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <h3 className="font-bold text-blue-900 mb-3">
                            نکات مهم:
                        </h3>
                        <div className="space-y-2 text-sm text-blue-800">
                            <p>
                                • برای هر کاربر می‌توانید دسترسی‌های مختلف انتخاب کنید
                            </p>
                            <p>
                                • روی دکمه "دسترسی ها" کلیک کنید تا دسترسی‌های دقیق را تنظیم کنید
                            </p>
                        </div>
                    </div>

                    {/* Add user button */}
                    <button
                        type="button"
                        onClick={handleAddUser}
                        className="mt-6 w-full py-3 border-2 border-teal-500 text-teal-600 font-bold rounded-xl hover:bg-teal-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <i className="fi fi-br-plus"></i>
                        افزودن کاربر دیگر
                    </button>

                    {/* Submit buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "در حال ارسال..." : "ارسال دعوت نامه"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            لغو
                        </button>
                    </div>
                </form>

                {toast && (
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        isVisible={showToast}
                        onClose={() => {
                            setShowToast(false);
                            setToast(null);
                        }}
                    />
                )}

                {/* Permissions Modal */}
                <PermissionsModal
                    isOpen={showPermissionsModal}
                    onClose={() => {
                        setShowPermissionsModal(false);
                        setEditingUserIndex(null);
                    }}
                    onSubmit={handlePermissionsSubmit}
                    selectedPermissions={
                        editingUserIndex !== null
                            ? users[editingUserIndex].permissions
                            : []
                    }
                />
            </div>
        </Modal>
    );
}
