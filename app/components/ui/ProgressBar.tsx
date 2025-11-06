import React from "react";

const ProgressBar = ({ progress = 50, days = 0 }) => {
    return (
        <div className="w-full max-w-md mx-auto">
            {/* Label */}
            <div className="flex justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">اعتبار</span>
                <span className="text-sm font-medium text-gray-700">{days} روز دیگر</span>
            </div>

            {/* Progress container */}
            <div className="w-full bg-teal-100 rounded-full h-3.5 overflow-hidden">
                <div
                    className="bg-teal-600 h-3.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
