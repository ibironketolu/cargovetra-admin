import Sidebar from '@/components/Sidebar'
import React from 'react'
import UpdateShippingTrackingForm from './_components/UpdateShippingTracking'


const page = ({ params }: { params: { id: string } }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <main className="flex-1 bg-[#0a101e] text-white p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Tracking List</h1>

                <div>
                    <UpdateShippingTrackingForm id={params?.id} />
                </div>
            </main>
        </div>
    )
}

export default page