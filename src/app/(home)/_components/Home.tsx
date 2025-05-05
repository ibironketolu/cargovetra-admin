"use client"
import { useAppSelector } from '@/components/Hooks'
import InvestmentCard from '@/components/InvestmentCard'
import { getStatus } from '@/components/Utils/endPoints'
import { APICall } from '@/components/Utils/extras'
import React, { useEffect, useState } from 'react'

const Home = () => {

    const [data, setData] = useState<any>([])

    const { user } = useAppSelector((state) => state.auth);

    const getDash = async () => {

        try {
            const res = await APICall(getStatus, [], false, true);
            setData(res?.data?.data)
        } catch (error) {
            console.error("Error fetching shipments:", error);
        } finally {

        }
    };

    useEffect(() => {
        getDash()
    }, [])


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Welcome {user?.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <InvestmentCard
                    title="Total Shipments"
                    range={data?.total_shipments}
                    interest="15 % Weekly"
                />

                <InvestmentCard
                    title="Total Tracking"
                    range={data?.total_trackings}
                    interest="15 % Weekly"
                />

                <InvestmentCard
                    title="Total Shipments"
                    range={data?.total_shipments}
                    interest="15 % Weekly"
                />

                <InvestmentCard
                    title="Order Delivered"
                    range={data?.shipments_by_status?.delivered}
                    interest="15 % Weekly"
                />

                <InvestmentCard
                    title="Order In Transit"
                    range={data?.shipments_by_status?.in_transit}
                    interest="15 % Weekly"
                />

                <InvestmentCard
                    title="Order Pending"
                    range={data?.shipments_by_status?.pending}
                    interest="15 % Weekly"
                />

            </div>
        </div>
    )
}

export default Home