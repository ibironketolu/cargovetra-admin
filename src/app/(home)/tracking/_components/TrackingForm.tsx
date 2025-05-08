'use client';
import { createTracking } from '@/components/Utils/endPoints';
import { APICall } from '@/components/Utils/extras';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

export default function TrackingForm() {
    const [submitting, setSubmittingState] = useState(false);

    const shipmentCheckpointSchema = Yup.object({
        shipment_id: Yup.number().required('Shipment ID is required'),
        location: Yup.string().required('Location is required'),
        date: Yup.date().required('Date is required'),
        remark: Yup.string().required('Remark is required'),
        status: Yup.string()
            .oneOf(['in_transit', 'delivered', 'on_hold'], 'Invalid status')
            .required('Status is required'),
    });

    const shipmentCheckpointInitialValues = {
        shipment_id: 1,
        location: '',
        date: '',
        remark: '',
        status: '',
    };

    const handleSubmit = async (
        values: typeof shipmentCheckpointInitialValues,
        { setSubmitting, resetForm }: FormikHelpers<typeof shipmentCheckpointInitialValues>
    ) => {
        setSubmittingState(true);
        try {
            console.log('Form submitted:', values);
            const request = await APICall(createTracking, [values], true, true)
            if (request.status === 200 || request.status === 201) {
                resetForm()

            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setSubmitting(false);
            setSubmittingState(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Add Shipment Tracking</h2>

            <Formik
                initialValues={shipmentCheckpointInitialValues}
                validationSchema={shipmentCheckpointSchema}
                onSubmit={handleSubmit}
            >
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
                            <option className='v' value="on_hold">On Hold</option>
                            <option className='text-black-100' value="delivered">Delivered</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={submitting}
                    >
                        {submitting ? 'Submitting...' : 'Create Tracking'}
                    </button>
                </Form>
            </Formik>
        </div>
    );
}
