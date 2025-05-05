import React from 'react'
import Sidebar from '@/components/Sidebar'
import TrackingForm from './_components/TrackingForm'

const page = () => {
    return (

        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 bg-[#0a101e] text-white p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Add Tracking</h1>

                <div>
                    <TrackingForm />
                </div>
            </main>
        </div>
    )
}

export default page