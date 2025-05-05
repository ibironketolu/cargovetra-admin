"use client";

import { AxiosStatic } from "axios";
// https://api.wokpa.app/

export default function setupAxios(axios: AxiosStatic, store: any) {
	const workAPI = process.env.NEXT_PUBLIC_BACK_URL || "";
	axios.defaults.headers.common["Accept"] = "application/json";
	axios.interceptors.request.use(
		(config: any) => {
			const {
				auth: { token },
			} = store.getState();
			if (token) {
				if (config.headers && config.url.includes(workAPI)) {
					config.headers.Authorization = `Bearer ${token}`;
				}
			}
			return config;
		},

		(err: any) => Promise.reject(err),
	);
}
