import Sidebar from '@/components/Sidebar'
import React from 'react'
import TrackingTableCheck from './_components/TrackingTableCheck'


const page = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <main className="flex-1 bg-[#0a101e] text-white p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Check Tracking Status</h1>

                <div>
                    <TrackingTableCheck />
                </div>
            </main>
        </div>
    )
}

export default page