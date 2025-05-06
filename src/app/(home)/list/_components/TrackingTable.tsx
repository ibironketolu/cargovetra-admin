"use client";

import Paginate from "@/components/Pagination";
import { DeleteShipment, getShipment } from "@/components/Utils/endPoints";
import { APICall } from "@/components/Utils/extras";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TrackingTable = () => {
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
            const res = await APICall(getShipment, [page, perPage], false, true);
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
        await APICall(DeleteShipment, [selectedId], false, false)
        console.log("Deleting shipment with id:", selectedId);
        setShowModal(false);
        setSelectedId(null);
        // Refresh list
        await getShipments(currentPage, 15);
    };

    useEffect(() => {
        getShipments(currentPage, 15);
    }, []);

    return (
        <div className="bg-[#0a101e] shadow h-screen rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-1 text-white">List of Tracking Done</h2>
            <p className="text-sm text-gray-400 mb-4">Click to Update Tracking</p>

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
                            <tr className="bg-[#0a101e] text-xs text-gray-400 uppercase">
                                <th className="px-4 py-3 border">S/N</th>
                                <th className="px-4 py-3 border">Tracking ID</th>
                                <th className="px-4 py-3 border">Sender</th>
                                <th className="px-4 py-3 border">Receiver</th>
                                <th className="px-4 py-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((entry, idx) => (
                                <tr key={entry?.id} className="border-t">
                                    <td className="px-4 py-2 border">{entry?.id}</td>
                                    <td className="px-4 py-2 border">{entry?.tracking_id}</td>
                                    <td className="px-4 py-2 border">{entry?.sender?.name}</td>
                                    <td className="px-4 py-2 border">{entry?.receiver?.name}</td>
                                    <td className="px-4 py-2 border space-x-2">
                                        <button
                                            onClick={() => router.push(`/list/${entry?.id}`)}
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
};

export default TrackingTable;
