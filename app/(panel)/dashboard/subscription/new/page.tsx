"use client"
import MultiStepForm from '@/app/components/MultiStepForm';
import React from 'react'

export default function NewSub() {
    return (
        <div className="">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900">ایجاد اشتراک جدید</h1>
                <p className="mt-2 text-gray-600">دریافت لایسنس نرم افزار</p>
            </div>
            <div className='w-full'>
                <MultiStepForm onFinish={(data) => { console.log('finished', data) }} />
            </div>
        </div>
    )
}