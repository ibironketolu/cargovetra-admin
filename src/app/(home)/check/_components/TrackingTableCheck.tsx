'use client';

import Paginate from '@/components/Pagination';
import { DeleteShipmentTracking, getShipmentTracking } from '@/components/Utils/endPoints';
import { APICall } from '@/components/Utils/extras';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type TrackingItem = {
    id: number;
    trackingId: string;
    lastLocation: string;
    date: string;
    remark: string;
    currentStatus: string;
};

type Props = {
    data: TrackingItem[];
};

const dummyData = [
    {
        id: 1,
        trackingId: 'APT67877',
        lastLocation: 'Thailand',
        date: '2025-04-14',
        remark: 'In Transit',
        currentStatus: 'In transit',
    },
    {
        id: 2,
        trackingId: 'APT88901',
        lastLocation: 'Nigeria',
        date: '2025-04-15',
        remark: 'Cleared',
        currentStatus: 'Delivered',
    },
    // Add more entries as needed...
];

const ITEMS_PER_PAGE = 5;

export default function TrackingTableCheck() {
    const router = useRouter();

    const [shipments, setShipments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [total, setTotal] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        getShipments(currentPage, 15);
    }, [currentPage])

    const getShipments = async (page: any, perPage: any) => {
        setLoading(true);
        try {
            const res = await APICall(getShipmentTracking, [page, perPage], false, true);
            setShipments(res?.data?.data?.data || []);
            setTotal(res?.data?.data?.meta?.total || []);
        } catch (error) {
            console.error("Error fetching shipments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedId) return;
        await APICall(DeleteShipmentTracking, [selectedId], false, false)
        console.log("Deleting shipment with id:", selectedId);
        setShowModal(false);
        setSelectedId(null);
        // Refresh list
        await getShipments(currentPage, 15);
    };

    console.log(shipments, `see`);


    useEffect(() => {
        getShipments(currentPage, 15);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">List of Tracking Done</h2>

            {loading ? (
                <div className="space-y-4 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 bg-[#0f172a] p-4 rounded-lg">
                            <div className="h-4 w-8 bg-gray-700 rounded" />
                            <div className="h-4 w-32 bg-gray-700 rounded" />
                            <div className="h-4 w-24 bg-gray-700 rounded" />
                            <div className="h-4 w-24 bg-gray-700 rounded" />
                            <div className="h-4 w-20 bg-gray-700 rounded" />
                        </div>
                    ))}
                </div>

            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left border border-gray-200 text-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">S/N</th>
                                <th className="px-4 py-2">Tracking ID</th>
                                <th className="px-4 py-2">Location</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Remark</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments?.map((entry, idx) => (
                                <tr key={entry?.id} className="border-t">
                                    <td className="px-4 py-2 border">{idx + 1}</td>
                                    <td className="px-4 py-2 border">{entry?.tracking_id}</td>
                                    <td className="px-4 py-2 border">{entry?.location}</td>
                                    <td className="px-4 py-2 border">{entry?.created_at}</td>
                                    <td className="px-4 py-2 border">{entry?.remark}</td>
                                    <td className="px-4 py-2 border">
                                        <span
                                            className={`
      font-semibold px-2 py-1 rounded
      ${entry?.status === "in_transit"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : entry?.status === "on_hold"
                                                        ? "bg-red-100 text-red-700"
                                                        : entry?.status === "delivered"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-100 text-gray-600"
                                                }
    `}
                                        >
                                            {entry?.status === "in_transit"
                                                ? "In Transit"
                                                : entry?.status === "on_hold"
                                                    ? "On Hold"
                                                    : entry?.status === "delivered"
                                                        ? "Delivered"
                                                        : "Unknown"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 border space-x-2">
                                        <button
                                            onClick={() => router.push(`/check/${entry?.tracking_id}?${entry?.id}`)}
                                            className="bg-orange-400 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(entry?.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Paginate
                        totalDocs={total}
                        currentPage={currentPage}
                        itemsPerPage={15}
                        setCurrentPage={setCurrentPage}
                        forcePage={0}
                    />
                </div>
            )}



            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white text-black-100 rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-4">Are you sure you want to delete this shipment?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
