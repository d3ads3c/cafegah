"use client";

interface CustomCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export default function CustomCheckbox({
    checked,
    onChange,
    label,
    disabled = false,
    className = "",
}: CustomCheckboxProps) {
    return (
        <label className={`flex items-center cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="hidden"
            />
            <div
                className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 ${
                    checked
                        ? "bg-teal-600 border-teal-600"
                        : "border-gray-300 bg-white hover:border-teal-400"
                }`}
            >
                {checked && (
                    <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M5 13l4 4L19 7"></path>
                    </svg>
                )}
            </div>
            {label && <span className="mr-2 font-medium text-gray-700">{label}</span>}
        </label>
    );
}
