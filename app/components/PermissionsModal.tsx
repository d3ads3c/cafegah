"use client";

import { useState } from "react";
import Modal from "./ui/Modal";
import CustomCheckbox from "./ui/CustomCheckbox";

export type Permission =
    | "view_dashboard"
    | "manage_menu"
    | "manage_orders"
    | "manage_customers"
    | "manage_categories"
    | "manage_users"
    | "manage_tables"
    | "manage_buylist"
    | "manage_accounting";

interface PermissionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (permissions: Permission[]) => void;
    selectedPermissions?: Permission[];
}

const permissionMap: { value: Permission; label: string; icon: string }[] = [
    {
        value: "view_dashboard",
        label: "مشاهده داشبورد",
        icon: "fi-br-eye",
    },
    {
        value: "manage_menu",
        label: "مدیریت منو",
        icon: "fi-br-menu",
    },
    {
        value: "manage_orders",
        label: "مدیریت سفارشات",
        icon: "fi-br-shopping-cart",
    },
    {
        value: "manage_customers",
        label: "مدیریت مشتریان",
        icon: "fi-br-user",
    },
    {
        value: "manage_categories",
        label: "مدیریت دسته بندی",
        icon: "fi-br-list",
    },
    {
        value: "manage_users",
        label: "مدیریت کاربران",
        icon: "fi-br-users",
    },
    {
        value: "manage_tables",
        label: "مدیریت میزها",
        icon: "fi-br-chair",
    },
    {
        value: "manage_buylist",
        label: "مدیریت لیست خریداری",
        icon: "fi-br-clipboard",
    },
    {
        value: "manage_accounting",
        label: "مدیریت حسابداری",
        icon: "fi-br-calculator",
    },
];

export default function PermissionsModal({
    isOpen,
    onClose,
    onSubmit,
    selectedPermissions = [],
}: PermissionsModalProps) {
    const [permissions, setPermissions] = useState<Permission[]>(
        selectedPermissions
    );

    const handleTogglePermission = (permission: Permission) => {
        setPermissions((prev) =>
            prev.includes(permission)
                ? prev.filter((p) => p !== permission)
                : [...prev, permission]
        );
    };

    const handleSelectAll = () => {
        if (permissions.length === permissionMap.length) {
            setPermissions([]);
        } else {
            setPermissions(permissionMap.map((p) => p.value));
        }
    };

    const handleSubmit = () => {
        onSubmit(permissions);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} width="w-[40%]">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        انتخاب دسترسی ها
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <i className="fi fi-br-cross text-lg"></i>
                    </button>
                </div>

                {/* Select All Button */}
                <div className="mb-6 p-4 bg-teal-50 rounded-xl border border-teal-200">
                    <div className="flex items-center gap-3">
                        <CustomCheckbox
                            checked={permissions.length === permissionMap.length}
                            onChange={handleSelectAll}
                        />
                        <span className="font-bold text-teal-900">
                            انتخاب تمام دسترسی ها
                        </span>
                    </div>
                </div>

                {/* Permissions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {permissionMap.map((perm) => (
                        <div
                            key={perm.value}
                            onClick={() => handleTogglePermission(perm.value)}
                            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                permissions.includes(perm.value)
                                    ? "border-teal-600 bg-teal-50"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <CustomCheckbox
                                    checked={permissions.includes(perm.value)}
                                    onChange={() => handleTogglePermission(perm.value)}
                                    className="mt-1 flex-shrink-0"
                                />
                                <div className="text-right flex-1">
                                    <i
                                        className={`fi ${perm.icon} text-xl mb-2 block ${
                                            permissions.includes(perm.value)
                                                ? "text-teal-600"
                                                : "text-gray-400"
                                        }`}
                                    ></i>
                                    <p
                                        className={`font-bold text-sm ${
                                            permissions.includes(perm.value)
                                                ? "text-teal-900"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {perm.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Box */}
                <div className="p-4 bg-blue-50 rounded-xl mb-6">
                    <p className="text-sm text-blue-800">
                        <span className="font-bold">
                            تعداد دسترسی های انتخاب شده:
                        </span>{" "}
                        {permissions.length} از {permissionMap.length}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-colors"
                    >
                        تأیید دسترسی ها
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        لغو
                    </button>
                </div>
            </div>
        </Modal>
    );
}
