import { ReactNode } from 'react';
import DashboardSidebar from '@/app/(panel)/dashboard/DashboardSidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar />
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
