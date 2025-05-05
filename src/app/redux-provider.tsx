"use client";
import store from "@/components/set-up/redux/store";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import * as _redux from "../components/set-up";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import axios from "axios";

_redux.setupAxios(axios, store);
export const loadingBarRef = React.createRef<LoadingBarRef | null>();

const queryClient = new QueryClient();

export default function ReduxProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<LoadingBar
				color='#F24343'
				ref={loadingBarRef as React.RefObject<LoadingBarRef>}
				height={5}
			/>
			<QueryClientProvider client={queryClient}>
				<ToastContainer position='top-right' hideProgressBar />
				<Provider store={store}>{children}</Provider>
			</QueryClientProvider>
		</>
	);
}
