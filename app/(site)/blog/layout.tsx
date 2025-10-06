export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-teal-600">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-teal-100 tracking-wide uppercase">وبلاگ کافه‌گاه</h2>
                        <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight">
                            همه چیز درباره مدیریت کافه
                        </p>
                        <p className="max-w-xl mt-5 mx-auto text-xl text-teal-100">
                            آخرین مقالات، نکات و ترفندها برای مدیریت بهتر کافه
                        </p>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}
