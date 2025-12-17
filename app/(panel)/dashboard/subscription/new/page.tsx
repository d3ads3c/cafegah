"use client"
import MultiStepForm from '@/app/components/MultiStepForm';
import { useRouter } from 'next/navigation';

export default function NewSub() {
    const router = useRouter()
    return (
        <div className="w-full">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900">ایجاد اشتراک جدید</h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600">دریافت لایسنس نرم افزار</p>
            </div>
            <div className='w-full'>
                <MultiStepForm onFinish={() => { router.push('/dashboard') }} />
            </div>
        </div>
    )
}