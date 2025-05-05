"use client";


import { Field, Form, FormikProvider, useFormik } from "formik";
import { GoUnlock } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from "@/components/Hooks";
import { authLogin, resetAuth, updateProfile } from "@/components/Redux/Auth";
import { APICall } from "@/components/Utils/extras";
import { login } from "@/components/Utils/endPoints";
import { AUTH_TOKEN_KEY } from "@/components/Utils/data";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import * as Yup from "yup";
import TextInput from "@/components/TextInput";

const loginFormModel = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

interface FormValues {
	email: string;
	password: string;
}

const initialValues: FormValues = {
	email: "",
	password: "",
};
const Page = () => {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleLogin = async (
		value: FormValues,
		setSubmitting: (val: boolean) => void,
	) => {
		try {
			setSubmitting(true);
			await loginMutation.mutateAsync(value);
			setSubmitting(false);
		} catch (error) {
			// console.log(error);
			setSubmitting(false);
		}
	};

	const loginMutation = useMutation(
		(value: FormValues) => APICall(login, value),
		{
			onSuccess: (data, variables) => {
				dispatch(resetAuth());
				toast.success(data.data.message);
				Cookies.set(AUTH_TOKEN_KEY as string, data.data.data.token as string);

				dispatch(
					authLogin({
						token: data.data.data.token,
						user: data.data.data.user,
					}),
				);
				if (data.data.data.user) {
					router.push("/");
					formik.resetForm();
				}
			},
			onError: (error: any) => {
				toast.error(error.message);
			},
		},
	);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: loginFormModel,
		onSubmit: (values, { setSubmitting }) => {
			handleLogin(values, setSubmitting);
		},
	});
	return (
		<div
			className={`bg-[#0a101e] w-full h-screen grid place-items-center px-4 xs:px-4 sm:px-0`}
		>
			<FormikProvider value={formik}>
				<Form className='flex w-full sm:w-[480px] bg-white flex-shrink-0 justify-around h-[350px] xs:h-[400px] sm:h-[450px] flex-col rounded-md px-2 sm:px-4'>
					<div className=''>
						<div className='flex gap-2 sm:gap-3 py-1 sm:py-4 items-center justify-center'>
							{/* <Picture
								src={breakfast_connect}
								alt='abr logo'
								loading='eager'
								className='w-[2rem] h-[1.7rem] sm:w-[2.8rem] sm:h-[2.38rem] lg:w-[2.7rem] lg:h-[2.58rem]'
							/> */}
							<h3 className='text-base sm:text-xl font-extrabold'>LogiHub</h3>
						</div>
						<div className='flex gap-4 text-bg2-600 text-xs sm:text-sm font-light justify-center items-center w-full'>
							<hr className='w-[35%] hidden sm:block' />
							<h4 className='capitalize'>welcome home</h4>
							<hr className='w-[35%] hidden sm:block' />
						</div>
						<div className='space-y-3 mt-3 sm:mt-5'>
							<TextInput
								id='email'
								label='Email'
								className={`w-full px-2.5 py-3 text-xs md:text-sm border focus:border-primary-200 rounded-md outline-none placeholder:text-bg-800 ${formik.touched.email && formik.errors.email
									? "border-red-500"
									: "border-black-300"
									}`}
								placeholder='Enter your email'
								required
								type='text'
							/>
							<TextInput
								id='password'
								label='Password'
								className={`w-full px-2.5 py-3 text-xs md:text-sm border focus:border-primary-200 border-black-200 rounded-md outline-none placeholder:text-bg-800 ${formik.touched.email && formik.errors.email
									? "border-red-500"
									: "border-black-300"
									}`}
								placeholder='Enter your password'
								required
								type={showPassword ? "text" : "password"}
								togglePasswordVisibility={togglePasswordVisibility}
								showPasswordIcon={true}
								showPassword={showPassword}
							/>
						</div>
					</div>

					<button
						type='submit'
						className='flex items-center justify-center border relative text-primary-100 border-primary-100 hover:bg-primary-100 hover:text-white hover:border-transparent text-sm leading-[1.4] font-semibold py-2.5 sm:py-3 w-full rounded-md gap-1.5 transition'
					>
						{formik.isSubmitting && (
							<ImSpinner2 className='text-3xl animate-spin absolute right-2' />
						)}
						<GoUnlock className='text-xl' />
						Login
					</button>
				</Form>
			</FormikProvider>
		</div>
	);
};

export default Page;
