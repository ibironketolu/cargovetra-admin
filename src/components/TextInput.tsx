import { ErrorMessage, Field } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
	id: string;
	label: string;
	value?: string;
	changeData?: any;
	className?: string;
	type?: string;
	required?: boolean;
	showPassword?: boolean;
	showPasswordIcon?: boolean;
	placeholder?: string;
	togglePasswordVisibility?: () => void;
}

const TextInput = ({
	id,
	label,
	value,
	changeData,
	className,
	type,
	required,
	showPassword,
	showPasswordIcon,
	togglePasswordVisibility,
	placeholder,
}: Props) => {
	return (
		<div className='flex flex-col gap-1'>
			<label
				className='flex items-center gap-1 text-sm sm:text-base'
				htmlFor={id}
			>
				{label} {required ? <span className='text-red-500'>*</span> : ""}
			</label>
			<div className='relative'>
				<Field
					type={type}
					name={id}
					className={className}
					placeholder={placeholder}
					required={required}
				/>
				{showPasswordIcon && (
					<span
						className='absolute top-5 md:top-6 right-4 transform -translate-y-1/2 cursor-pointer transition'
						onClick={togglePasswordVisibility}
					>
						{showPassword ? (
							<FaEyeSlash className='text-secondary-700' />
						) : (
							<FaEye className='text-secondary-700' />
						)}
					</span>
				)}
				<ErrorMessage
					name={id}
					component={"div"}
					className='text-red-600 text-xs text-left'
				/>
			</div>
		</div>
	);
};

export default TextInput;
