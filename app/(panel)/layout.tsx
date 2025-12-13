import { ReactNode } from 'react';
import DashboardSidebar from '@/app/(panel)/dashboard/DashboardSidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex max-h-screen min-h-screen bg-gray-50">
            <DashboardSidebar />
            <main className="flex-1 p-2 xl:p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
