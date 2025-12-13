'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MySubscriptions } from '@/types/AllTypes';
import InviteUserModal from '@/app/components/InviteUserModal';
import ProgressBar from '@/app/components/ui/ProgressBar';

interface InvitedUser {
    UserID: string;
    Email: string;
    Permissions: string;
    Status: string;
    SubscriptionSerial: string;
}

export default function SubscriptionManagementPage() {
    const params = useParams();
    const subscriptionSerial = params.sub as string;

    const [subscription, setSubscription] = useState<MySubscriptions | null>(null);
    const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchSubscriptionDetails = async () => {
        try {
            const res = await fetch('/api/subscriptions/detail', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ serial: subscriptionSerial }),
            });

            const data = await res.json();
            if (res.ok) {
                setSubscription(data.subscription);
                setInvitedUsers([]);
            }
        } catch (error) {
            console.error('Error fetching subscription details:', error);
        } finally {
            setLoading(false);
        }
    };

    const GetSubUsers = async () => {
        try {
            const res = await fetch('/api/subscriptions/users', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ serial: subscriptionSerial }),
            });

            const data = await res.json();
            if (data.Status === 'Success' && data.Users) {
                setInvitedUsers(data.Users);
            }
        } catch (error) {
            console.error('Error fetching subscription details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (subscriptionSerial) {
            fetchSubscriptionDetails();
            GetSubUsers();
        }
    }, [subscriptionSerial]);

    const handleInviteSuccess = () => {
        setRefreshing(true);
        fetchSubscriptionDetails();
        setTimeout(() => setRefreshing(false), 1000);
    };

    const handleRemoveUser = async (userId: string) => {
        try {
            const res = await fetch('/api/subscriptions/remove-user', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subscriptionSerial,
                    userId
                }),
            });

            if (res.ok) {
                setInvitedUsers(invitedUsers.filter(u => u.UserID !== userId));
            }
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">در حال بارگذاری...</p>
                </div>
            </div>
        );
    }

    if (!subscription) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-500 font-bold mb-4">اشتراک یافت نشد</p>
                    <Link href="/dashboard" className="text-teal-600 hover:underline">
                        بازگشت به داشبورد
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">مدیریت اشتراک</h1>
                        <p className="text-gray-500 mt-2">مدیریت جزئیات و کاربران اشتراک خود</p>
                    </div>
                    <Link
                        href="/dashboard"
                        className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
                    >
                        <i className="fi fi-br-arrow-left"></i>
                        بازگشت
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Subscription Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">اطلاعات اشتراک</h2>

                            <div className="space-y-6">
                                {/* Cafe Name */}
                                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <i className="fi fi-br-store-alt text-2xl text-teal-500"></i>
                                        <div>
                                            <p className="text-sm text-gray-500">نام کافه</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {subscription.CafeName || 'بدون نام'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Plan */}
                                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <i className="fi fi-br-check-circle text-2xl text-teal-500"></i>
                                        <div>
                                            <p className="text-sm text-gray-500">پلن</p>
                                            <p className="text-lg font-bold text-gray-900">{subscription.Plan}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <i className="fi fi-br-info text-2xl text-teal-500"></i>
                                        <div>
                                            <p className="text-sm text-gray-500">وضعیت</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${subscription.Status === 'active'
                                                        ? 'bg-green-500'
                                                        : 'bg-orange-500'
                                                        }`}
                                                ></div>
                                                <p className="font-bold text-gray-900">
                                                    {subscription.Status === 'active'
                                                        ? 'فعال'
                                                        : 'غیرفعال'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Serial */}
                                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <i className="fi fi-br-hash text-2xl text-teal-500"></i>
                                        <div>
                                            <p className="text-sm text-gray-500">شناسه</p>
                                            <p className="text-lg font-bold text-gray-900 font-mono">
                                                {subscription.Serial}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Days Remaining */}
                                <div className="pb-4 border-b border-gray-100">
                                    <p className="text-sm text-gray-500 mb-2">روز های باقی‌مانده</p>
                                    <ProgressBar
                                        progress={0}
                                        days={Number(subscription.Days ?? 0)}
                                    />
                                </div>

                                {/* Buy Date */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <i className="fi fi-br-calendar text-2xl text-teal-500"></i>
                                        <div>
                                            <p className="text-sm text-gray-500">تاریخ خریداری</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {subscription.BuyDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Invited Users Section */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">کاربران دعوت شده</h2>
                                <span className="bg-teal-100 text-teal-700 rounded-full px-3 py-1 text-sm font-bold">
                                    {invitedUsers.length} کاربر
                                </span>
                            </div>

                            {invitedUsers.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">
                                                    ایمیل
                                                </th>
                                                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">
                                                    وضعیت
                                                </th>
                                                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">
                                                    دسترسی‌ها
                                                </th>
                                                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">
                                                    عملیات
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invitedUsers.map((user) => (
                                                <tr
                                                    key={user.UserID}
                                                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="py-3 px-4 text-gray-900 font-medium">
                                                        {user.Email}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span
                                                            className={`text-xs font-bold px-3 py-1 rounded-full ${user.Status === 'active'
                                                                ? 'bg-green-100 text-green-700'
                                                                : user.Status === 'invited'
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : 'bg-red-100 text-red-700'
                                                                }`}
                                                        >
                                                            {user.Status === 'active'
                                                                ? 'پذیرفته شده'
                                                                : user.Status === 'invited'
                                                                    ? 'دعوت شده'
                                                                    : 'رد شده'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-600 text-sm">
                                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                            {user.Permissions.split(',').length} دسترسی
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <button
                                                            onClick={() => handleRemoveUser(user.UserID)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded px-2 py-1 transition-colors"
                                                        >
                                                            <i className="fi fi-br-trash text-lg"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <i className="fi fi-br-users text-4xl text-gray-300 mb-3 block"></i>
                                    <p className="text-gray-500">هنوز کاربری دعوت نشده است</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Invite Button */}
                    <div>
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">عملیات سریع</h3>

                            <button
                                onClick={() => setShowInviteModal(true)}
                                className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 mb-3"
                            >
                                <i className="fi fi-br-user-add"></i>
                                دعوت کاربر جدید
                            </button>

                            <div className="bg-blue-50 rounded-xl p-4 mt-6">
                                <h4 className="font-bold text-blue-900 mb-3">نکات مهم</h4>
                                <ul className="space-y-2 text-sm text-blue-800">
                                    <li className="flex items-start gap-2">
                                        <i className="fi fi-br-check text-blue-600 mt-1"></i>
                                        <span>کاربران دعوت شده می‌توانند دسترسی‌های مختلف داشته باشند</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <i className="fi fi-br-check text-blue-600 mt-1"></i>
                                        <span>می‌توانید دسترسی‌ها را برای هر کاربر مختلف تنظیم کنید</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <i className="fi fi-br-check text-blue-600 mt-1"></i>
                                        <span>کاربران پس از پذیرش دعوت نامه دسترسی خواهند داشت</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invite Modal */}
            <InviteUserModal
                isOpen={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                subscriptionSerial={subscriptionSerial}
            />
        </div>
    );
}
