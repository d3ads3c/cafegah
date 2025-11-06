"use client";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    width?: string;  // e.g., 'w-1/2', 'w-96'
    height?: string; // e.g., 'h-1/2', 'h-96'
    children?: React.ReactNode;
}

export default function ModalView({
    isOpen = true,
    onClose,
    width = "w-[500px]",
    height = "h-auto",
    children
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
                onClick={onClose}
            >
                {/* Modal Container */}
                <div 
                    className={`bg-white rounded-2xl shadow-2xl ${width} ${height} max-h-[90vh] max-w-[90vw] overflow-auto`}
                    onClick={e => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>
    );
}