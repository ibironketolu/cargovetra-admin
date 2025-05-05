import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-linear":
					"linear-brown-gradient(133deg, #2B3221 9.11%, rgba(242, 242, 242, 0.00) 298.89%)",
			},
			colors: {
				// Add your custom colors here
				primary: {
					100: "#F24343",
				},
				black: {
					100: "#000000",
				},
				bg: {
					100: "#F6F6F6",
				},
				secondary: {
					100: "#9747FF",
				},
				// Add more colors as needed
			},
			fontSize: {
				xxs: "10px",
			},
		},
	},
	plugins: [],
};
export default config;
