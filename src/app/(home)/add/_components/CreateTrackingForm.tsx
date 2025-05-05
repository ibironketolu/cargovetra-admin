'use client';
import { createShipment } from '@/components/Utils/endPoints';
import { APICall } from '@/components/Utils/extras';
import { trackingInitialValues } from '@/components/Utils/initialValues';
import { trackingSchema } from '@/components/Utils/validationSchemas';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useFilePicker } from "use-file-picker";


export default function CreateTrackingForm() {

    const [image, setImage] = useState(false);

    const [imagePicker, { filesContent, plainFiles, clear }] = useFilePicker({
        readAs: "DataURL",
        accept: ["image/*", "pdf"],
        multiple: false,
        limitFilesConfig: { max: 1 },
        maxFileSize: 1,
    });

    const handleSubmit = async (values: typeof trackingInitialValues, { setSubmitting, resetForm }: FormikHelpers<typeof trackingInitialValues>) => {
        console.log('Submitting new tracking:', values);
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

            const request = await APICall(createShipment, [formData], true, true)

            if (request.status === 200 || request.status === 201) {
                resetForm()
                clear()
            }



        } catch (error) {
            console.log(error);

        } finally {
            setSubmitting(false);
        }
    };




    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Create Tracking</h1>

            <Formik
                initialValues={trackingInitialValues}
                validationSchema={trackingSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                ["sender_name", "Sender Name"],
                                ["sender_contact_name", "Sender Contact Name"],
                                ["sender_address", "Sender Address"],
                                ["sender_postal_code", "Sender Postal Code"],
                                ["sender_city", "Sender City"],
                                ["sender_other_info", "Sender Other Info"],
                                ["sender_email", "Sender Email"],
                                ["sender_phone", "Sender Phone"],
                                ["receiver_name", "Receiver Name"],
                                ["receiver_contact_name", "Receiver Contact Name"],
                                ["receiver_address", "Receiver Address"],
                                ["receiver_postal_code", "Receiver Postal Code"],
                                ["receiver_city", "Receiver City"],
                                ["receiver_other_info", "Receiver Other Info"],
                                ["receiver_email", "Receiver Email"],
                                ["receiver_phone", "Receiver Phone"],
                                ["service_type", "Service Type"],
                                ["description", "Package Description"],
                                ["weight", "Weight (KG)", "number"],
                                ["date_shipped", "Date Shipped", "date"],
                                ["expected_delivery_date", "Expected Delivery Date", "date"],
                                ["quantity", "Quantity", "number"],
                                ["unit_value", "Unit Value", "number"],
                            ].map(([name, label, type = "text"]) => (
                                <div key={name} className="flex flex-col">
                                    <label htmlFor={name} className="text-sm font-medium">
                                        {label}
                                    </label>
                                    <Field
                                        name={name}
                                        type={type}
                                        className="border p-2 rounded text-black-100"
                                    />
                                    <ErrorMessage
                                        name={name}
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                            ))}
                        </div>


                        <div className='mt-5'>
                            <label htmlFor='' className='text-sm font-medium '>
                                Upload Image
                            </label>
                            <div onClick={() => imagePicker()} className='w-full py-4 cursor-pointer rounded-lg shadow border border-gray-300 text-gray-500'>
                                <div className='text-center'>
                                    {filesContent.length ? (
                                        <>
                                            {filesContent.map((file, index) => (
                                                <div
                                                    className=' mb-10 flex justify-center'
                                                    key={index}
                                                >
                                                    <img
                                                        style={{
                                                            width: "150px",
                                                            height: "150px",
                                                        }}
                                                        className='max-w-sm '
                                                        alt={file.name}
                                                        src={file.content}
                                                    ></img>
                                                    <br />
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {image ? (
                                                <div className='flex justify-center'>
                                                    <img
                                                        className='max-w-[150px] rounded-lg inline'
                                                        src={
                                                            ``
                                                        }
                                                    // src={
                                                    // 	selectedEpisodeInfo.rss_details.picture_url
                                                    // }
                                                    ></img>
                                                </div>
                                            ) : (
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth={1.5}
                                                    stroke='currentColor'
                                                    className='w-32 inline'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                                                    />
                                                </svg>
                                            )}
                                        </>
                                    )}
                                    <div className='text-xs text-black-100 mt-14 px-6'>
                                        We recommend uploading an artwork of at least 1400x1400
                                        pixels and maximum 1MB. We support jpg, png, gif and
                                        tiff formats.
                                    </div>
                                    <div className='mt-4'>
                                        <button
                                            type='button'

                                            className='bg-white rounded-full py-2 px-4 text-sm font-semibold text-black-100'
                                        >
                                            Upload image
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600"
                            >
                                {isSubmitting ? `Creating` : `Create Tracking`}
                            </button>
                        </div>
                    </Form>

                )}
            </Formik>
        </div>
    );
}
