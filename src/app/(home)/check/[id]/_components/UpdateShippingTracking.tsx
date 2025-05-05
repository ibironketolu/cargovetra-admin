'use client';

import { getAShipment, getAShipmentTracking, updateShipment, updateShipmentTracking } from '@/components/Utils/endPoints';
import { APICall } from '@/components/Utils/extras';
import { trackingSchema } from '@/components/Utils/validationSchemas';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { useSearchParams } from 'next/navigation';

interface UpdateShippingTrackingFormProps {
    id: string;
}

const UpdateShippingTrackingForm: React.FC<UpdateShippingTrackingFormProps> = ({ id }) => {
    const [shipment, setShipment] = useState<any>(null);
    const [initialValues, setInitialValues] = useState<any>(null);

    const params = useSearchParams().toString();
    const search = params.replace(/=$/, "");



    const getShipment = async () => {
        try {
            const res = await APICall(getAShipmentTracking, [id], false, false);
            const data = res?.data?.data?.trackings[0] || {};
            setShipment(data);
            setInitialValues({
                shipment_id: data?.shipment_id ?? 0,
                location: data?.location ?? "",
                date: data?.date ?? "",
                remark: data?.remark ?? "",
                status: data?.status ?? "",
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
            console.log(values);

            const request = await APICall(updateShipmentTracking, [search, values], true, true)

        } catch (error) {
            console.log(error);

        } finally {
            setSubmitting(false);
        }
    };

    const shipmentCheckpointSchema = Yup.object({
        shipment_id: Yup.number().required('Shipment ID is required'),
        location: Yup.string().required('Location is required'),
        date: Yup.date().required('Date is required'),
        remark: Yup.string().required('Remark is required'),
        status: Yup.string()
            .oneOf(['in_transit', 'delivered', 'on_hold'], 'Invalid status')
            .required('Status is required'),
    });

    if (!initialValues) {
        return <div className="text-center py-12">Loading form...</div>;
    }

    return (
        <div className="max-w-7xl  mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Update Tracking</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={shipmentCheckpointSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        {[
                            ['shipment_id', 'Shipment ID', 'number'],
                            ['location', 'Location', 'text'],
                            ['date', 'Date', 'date'],
                            ['remark', 'Remark', 'text'],
                        ].map(([name, label, type]) => (
                            <div key={name}>
                                <label htmlFor={name} className="block font-medium text-sm">
                                    {label}
                                </label>
                                <Field name={name} type={type} className="w-full p-2 border rounded text-black-100" />
                                <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
                            </div>
                        ))}

                        <div>
                            <label htmlFor="status" className="block font-medium text-sm">
                                Status
                            </label>
                            <Field as="select" name="status" className="w-full p-2 border rounded text-black-100">
                                <option className='text-black-100' value="">Select status</option>
                                <option className='text-black-100' value="in_transit">In Transit</option>
                                <option className='text-black-100' value="on_hold">On Hold</option>
                                <option className='text-black-100' value="delivered">Delivered</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Update Tracking'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateShippingTrackingForm;
