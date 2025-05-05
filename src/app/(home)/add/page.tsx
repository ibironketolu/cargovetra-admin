import React from 'react'
import CreateTrackingForm from './_components/CreateTrackingForm'
import Sidebar from '@/components/Sidebar'

const page = () => {
    return (

        <div className="flex">
            <Sidebar />

            <main className="flex-1 bg-[#0a101e] text-white p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Add Shipmemt</h1>

                <div>
                    <CreateTrackingForm />
                </div>
            </main>
        </div>
    )
}

export default page