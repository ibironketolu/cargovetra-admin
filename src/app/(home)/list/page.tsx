import Sidebar from '@/components/Sidebar'
import React from 'react'
import TrackingTable from './_components/TrackingTable'

const page = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <main className="flex-1 bg-[#0a101e] text-white p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Tracking List</h1>

                <div>
                    <TrackingTable />
                </div>
            </main>
        </div>
    )
}

export default page