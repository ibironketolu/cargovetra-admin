import * as Yup from "yup";

export const trackingSchema = Yup.object({
    sender_name: Yup.string().required("Required"),
    sender_contact_name: Yup.string().required("Required"),
    sender_address: Yup.string().required("Required"),
    sender_postal_code: Yup.string().required("Required"),
    sender_city: Yup.string().required("Required"),
    sender_other_info: Yup.string(),
    sender_email: Yup.string().email("Invalid email").required("Required"),
    sender_phone: Yup.string().required("Required"),

    receiver_name: Yup.string().required("Required"),
    receiver_contact_name: Yup.string().required("Required"),
    receiver_address: Yup.string().required("Required"),
    receiver_postal_code: Yup.string().required("Required"),
    receiver_city: Yup.string().required("Required"),
    receiver_other_info: Yup.string(),
    receiver_email: Yup.string().email("Invalid email").required("Required"),
    receiver_phone: Yup.string().required("Required"),

    service_type: Yup.string().required("Required"),
    weight: Yup.number().typeError("Weight must be a number").required("Required"),
    date_shipped: Yup.date().typeError("Date shipped must be a valid date").required("Required"),
    expected_delivery_date: Yup.date().typeError("Expected delivery date must be a valid date").required("Required"),
    description: Yup.string().required("Required"),
    quantity: Yup.number().typeError("Quantity must be a number").required("Required"),
    unit_value: Yup.number().typeError("Unit value must be a number").required("Required"),
});