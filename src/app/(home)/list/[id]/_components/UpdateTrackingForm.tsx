'use client';

import { getAShipment, updateShipment } from '@/components/Utils/endPoints';
import { APICall } from '@/components/Utils/extras';
import { trackingSchema } from '@/components/Utils/validationSchemas';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useFilePicker } from 'use-file-picker';

interface UpdateTrackingFormProps {
    id: string;
}

const UpdateTrackingForm: React.FC<UpdateTrackingFormProps> = ({ id }) => {
    const [shipment, setShipment] = useState<any>(null);
    const [initialValues, setInitialValues] = useState<any>(null);

    const getShipment = async () => {
        try {
            const res = await APICall(getAShipment, [id], false, false);
            const data = res?.data?.data || {};
            setShipment(data);
            setInitialValues({
                sender_name: data.sender?.name ?? '',
                sender_contact_name: data.sender?.contact_name ?? '',
                sender_address: data.sender?.address ?? '',
                sender_postal_code: data.sender?.postal_code ?? '',
                sender_city: data.sender?.city ?? '',
                sender_other_info: data.sender?.other_info ?? '',
                sender_email: data.sender?.email ?? '',
                sender_phone: data.sender?.phone ?? '',

                receiver_name: data.receiver?.name ?? '',
                receiver_contact_name: data.receiver?.contact_name ?? '',
                receiver_address: data.receiver?.address ?? '',
                receiver_postal_code: data.receiver?.postal_code ?? '',
                receiver_city: data.receiver?.city ?? '',
                receiver_other_info: data.receiver?.other_info ?? '',
                receiver_email: data.receiver?.email ?? '',
                receiver_phone: data.receiver?.phone ?? '',

                service_type: data.details?.service_type ?? '',
                weight: parseFloat(data.details?.weight ?? 0),
                date_shipped: data.details?.date_shipped ?? '',
                expected_delivery_date: data.details?.expected_delivery_date ?? '',
                description: data.details?.description ?? '',
                quantity: data.details?.quantity ?? 1,
                unit_value: parseFloat(data.details?.unit_value ?? 0),
            });

        } catch (error) {
            console.error('Error fetching shipments:', error);
        }
    };

    useEffect(() => {
        getShipment();
    }, []);

    const handleSubmit = async (
        values: typeof initialValues,
        { setSubmitting }: FormikHelpers<typeof initialValues>
    ) => {
        try {
            const formData = new FormData();

            // Append each key-value pair to formData
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value as any);
            });

            // Append image and tags to formData
            if (filesContent.length > 0) {
                formData.append("images", plainFiles[0]);
            }

            const data = { ...values, image: formData.get("images") };

            console.log(data);

            const request = await APICall(updateShipment, [id, formData], true, true)





        } catch (error) {
            console.log(error);

        } finally {
            setSubmitting(false);
        }
    };

    const [image, setImage] = useState(false);
    const [imagePicker, { filesContent, plainFiles }] = useFilePicker({
        readAs: 'DataURL',
        accept: ['image/*', 'pdf'],
        multiple: false,
        limitFilesConfig: { max: 1 },
        maxFileSize: 1,
    });

    if (!initialValues) {
        return <div className="text-center py-12">Loading form...</div>;
    }

    return (
        <div className="max-w-7xl  mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Update Tracking</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={trackingSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                ['sender_name', 'Sender Name'],
                                ['sender_contact_name', 'Sender Contact Name'],
                                ['sender_address', 'Sender Address'],
                                ['sender_postal_code', 'Sender Postal Code'],
                                ['sender_city', 'Sender City'],
                                ['sender_other_info', 'Sender Other Info'],
                                ['sender_email', 'Sender Email'],
                                ['sender_phone', 'Sender Phone'],
                                ['receiver_name', 'Receiver Name'],
                                ['receiver_contact_name', 'Receiver Contact Name'],
                                ['receiver_address', 'Receiver Address'],
                                ['receiver_postal_code', 'Receiver Postal Code'],
                                ['receiver_city', 'Receiver City'],
                                ['receiver_other_info', 'Receiver Other Info'],
                                ['receiver_email', 'Receiver Email'],
                                ['receiver_phone', 'Receiver Phone'],
                                ['service_type', 'Service Type'],
                                ['description', 'Package Description'],
                                ['weight', 'Weight (KG)', 'number'],
                                ['date_shipped', 'Date Shipped', 'date'],
                                ['expected_delivery_date', 'Expected Delivery Date', 'date'],
                                ['quantity', 'Quantity', 'number'],
                                ['unit_value', 'Unit Value', 'number'],
                            ].map(([name, label, type = 'text']) => (
                                <div key={name} className="flex flex-col">
                                    <label htmlFor={name} className="text-sm font-medium">
                                        {label}
                                    </label>
                                    <Field
                                        name={name}
                                        type={type}
                                        className="border p-2 rounded text-black-100"
                                    />
                                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-medium">Upload Image</label>
                            <div
                                onClick={() => imagePicker()}
                                className="w-full py-4 cursor-pointer rounded-lg shadow border border-gray-300 text-gray-500 text-center"
                            >
                                {filesContent.length > 0 ? (
                                    filesContent.map((file, index) => (
                                        <div className="flex justify-center mb-4" key={index}>
                                            <img
                                                src={file.content}
                                                alt={file.name}
                                                style={{ width: '150px', height: '150px' }}
                                                className="rounded"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-16 h-16 mx-auto"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 15.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12z"
                                            />
                                        </svg>
                                        <p className="mt-4 text-xs">Click to upload an image (max 1MB, jpg/png/gif/pdf)</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600"
                            >
                                {isSubmitting ? 'Submitting...' : 'Update Tracking'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateTrackingForm;
