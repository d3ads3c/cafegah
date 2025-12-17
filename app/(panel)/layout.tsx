import { ReactNode } from 'react';
import DashboardSidebar from '@/app/(panel)/dashboard/DashboardSidebar';
import MobileNavbar from '@/app/(panel)/dashboard/MobileNavbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex max-h-screen min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <DashboardSidebar />
            </div>
            {/* Mobile Navbar */}
            <div className="lg:hidden">
                <MobileNavbar />
            </div>
            <main className="flex-1 p-2 xl:p-8 overflow-auto mt-5 xl:mt-0 lg:pt-2 xl:pt-8 pt-16">
                {children}
            </main>
        </div>
    );
}
