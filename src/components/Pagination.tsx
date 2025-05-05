import React, { Dispatch } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import ReactPaginate from "react-paginate";

interface PaginateProps {
	setCurrentPage: Dispatch<React.SetStateAction<number>>;
	forcePage?: number;
	currentPage: number;
	totalDocs: number;
	itemsPerPage: number;
}

const Paginate = ({
	totalDocs,
	currentPage,
	itemsPerPage,
	setCurrentPage,
}: PaginateProps) => {
	const pageCount = Math.ceil(totalDocs / itemsPerPage);
	const handlePageClick = (event: any) => {
		setCurrentPage(event.selected + 1);
	};
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalDocs);

	const displayText = `Showing ${startItem} - ${endItem} of ${totalDocs}`;

	return (

		// <ReactPaginate
		// 	breakLabel='...'
		// 	containerClassName='flex  justify-between w-full py-3 items-center gap-1.5 '
		// 	marginPagesDisplayed={1}
		// 	nextClassName='flex-1 flex justify-end'
		// 	pageClassName='flex items-center justify-center py-1.5 px-3  hover:bg-primary-400 hover:text-primary-300 text-gray-602 rounded-md transition-[.5] cursor-pointer'
		// 	pageLinkClassName='font-inter md:text-sm text-xxs font-medium flex'
		// 	activeClassName='!bg-primary-400 text-primary-300 rounded-md'
		// 	previousClassName='flex-1'
		// 	previousLabel={
		// 		<div
		// 			className={`flex w-fit mr-5 gap-2 py-1.5 px-2 rounded-lg border border-gray-100 items-center ${currentPage === 1
		// 				? "opacity-50 cursor-not-allowed"
		// 				: "cursor-pointer"
		// 				}`}
		// 		>
		// 			<FaArrowLeftLong className='text-xl text-black-200' />
		// 			<p className="text-sm text-gray-200">Previous</p>
		// 		</div>
		// 	}
		// 	onPageChange={handlePageClick}
		// 	pageRangeDisplayed={4}
		// 	forcePage={currentPage - 1}
		// 	pageCount={pageCount}
		// 	nextLabel={
		// 		<div
		// 			className={`flex  w-fit gap-2 py-1.5 px-2 rounded-lg border border-gray-100 items-center ${currentPage === pageCount
		// 				? "opacity-50 cursor-not-allowed"
		// 				: "cursor-pointer"
		// 				}`}
		// 		>
		// 			<p className="text-sm text-gray-200">Next</p>
		// 			<FaArrowRightLong className='text-xl text-black-200' />

		// 		</div>
		// 	}
		// 	renderOnZeroPageCount={null}
		// />

		<div className='py-5 md:px-4 mt-6'>
			<ReactPaginate
				breakLabel='...'
				containerClassName='flex items-center justify-between pb-16 xl:pb-5'
				nextClassName='flex-1 flex justify-end'
				pageClassName='flex items-center justify-center w-[40px] h-[40px]'
				pageLinkClassName='font-inter text-sm font-medium'
				activeClassName='bg-primary-300 text-white rounded-full'
				previousClassName='flex-1 '
				previousLabel={
					<div className={`flex items-center gap-2 hover:bg-primary-300 hover:text-white transition w-fit py-1.5 px-2 rounded-lg border border-gray-100 ${currentPage === 1
						? "opacity-50 cursor-not-allowed"
						: "cursor-pointer"
						}`}>
						<GoArrowLeft />
						<span className='text-sm hidden md:block font-semibold'>
							Previous
						</span>
					</div>
				}
				onPageChange={handlePageClick}
				pageRangeDisplayed={4}
				forcePage={currentPage - 1}
				pageCount={pageCount}
				nextLabel={
					<div className={`flex gap-2 py-1.5 px-2 hover:bg-primary-300 hover:text-white rounded-lg border border-gray-100 items-center ${currentPage === pageCount
						? "opacity-50 cursor-not-allowed"
						: "cursor-pointer"
						}`}>
						<span className='text-sm hidden md:block font-semibold'>
							Next
						</span>
						<GoArrowRight />
					</div>
				}
				renderOnZeroPageCount={null}
			/>
		</div>

	);
};

// const Paginate = ({
// 	totalDocs,
// 	currentPage,
// 	itemsPerPage,
// 	setCurrentPage,
// }: PaginateProps) => {
// 	const pageCount = Math.ceil(totalDocs / itemsPerPage);
// 	const handlePageClick = (event: any) => {
// 		setCurrentPage(event.selected + 1);
// 	};
// 	const startItem = (currentPage - 1) * itemsPerPage + 1;
// 	const endItem = Math.min(currentPage * itemsPerPage, totalDocs);

// 	const displayText = `Showing ${startItem} - ${endItem} of ${totalDocs}`;

// 	return (
// 		<div className="w-full flex flex-col items-center gap-3 md:gap-0">
// 			{/* Display Text */}
// 			<p className="text-xs md:text-sm text-gray-500">{displayText}</p>

// 			<ReactPaginate
// 				breakLabel="..."
// 				containerClassName="flex flex-wrap justify-center md:justify-between w-full items-center gap-2"
// 				marginPagesDisplayed={1}
// 				nextClassName="flex flex-1 justify-end"
// 				pageClassName="flex items-center justify-center py-1 px-2 md:py-1.5 md:px-3 hover:bg-primary-400 hover:text-primary-300 text-gray-602 rounded-md transition-all cursor-pointer"
// 				pageLinkClassName="font-inter text-xxs md:text-sm font-medium flex"
// 				activeClassName="!bg-primary-400 text-primary-300 rounded-md"
// 				previousClassName="flex-1"
// 				previousLabel={
// 					<div
// 						className={`flex items-center gap-2 py-1 px-2 md:py-1.5 md:px-2 rounded-lg border border-gray-100 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
// 							}`}
// 					>
// 						<FaArrowLeftLong className="text-lg text-black-200" />
// 						<p className="text-xs md:text-sm text-gray-200">Previous</p>
// 					</div>
// 				}
// 				onPageChange={handlePageClick}
// 				pageRangeDisplayed={2} // Reduced page range for better mobile display
// 				forcePage={currentPage - 1}
// 				pageCount={pageCount}
// 				nextLabel={
// 					<div
// 						className={`flex items-center gap-2 py-1 px-2 md:py-1.5 md:px-2 rounded-lg border border-gray-100 ${currentPage === pageCount
// 								? "opacity-50 cursor-not-allowed"
// 								: "cursor-pointer"
// 							}`}
// 					>
// 						<p className="text-xs md:text-sm text-gray-200">Next</p>
// 						<FaArrowRightLong className="text-lg text-black-200" />
// 					</div>
// 				}
// 				renderOnZeroPageCount={null}
// 			/>
// 		</div>
// 	);
// };


export default Paginate;
