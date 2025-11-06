'use client';

import { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
    duration?: number; // in milliseconds, defaults to 3000
}

export default function Toast({
    message,
    type,
    isVisible,
    onClose,
    duration = 3000
}: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
            <div
                className={`
                    flex items-center gap-2 px-6 py-4 rounded-xl shadow-lg
                    ${type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}
                    transition-transform duration-300 ease-in-out
                `}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="mt-1 opacity-60 hover:opacity-100 transition-opacity"
                >
                    <i className="fi fi-sr-cross text-sm"></i>
                </button>
                {/* Message */}
                <p className="font-bold text-sm">{message}</p>
            </div>
        </div>
    );
}