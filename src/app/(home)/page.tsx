import InvestmentCard from "@/components/InvestmentCard";
import Sidebar from "@/components/Sidebar";
import React from "react";
import Home from "./_components/Home";

const page = () => {
	return (
		<div className="flex">
			<Sidebar />

			<main className="flex-1 bg-[#0a101e] h-screen text-white p-6 overflow-y-auto">
				<Home />
			</main>
		</div>
	);
};

export default page;
