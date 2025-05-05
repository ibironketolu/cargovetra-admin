'use client';
import { FaWallet, FaHome, FaChartPie, FaSignOutAlt } from 'react-icons/fa';
import { MdSupport } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { BsBoxSeam, BsCurrencyDollar } from 'react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { resetAuth } from './Redux/Auth';
import { useAppDispatch } from './Hooks';
import { AUTH_TOKEN_KEY } from './Utils/data';
import Cookies from "js-cookie";
import { APICall } from './Utils/extras';
import { logout } from './Utils/endPoints';

const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, link: `/` },
    { name: 'Add Shipment', icon: <FaChartPie />, link: `/add` },
    { name: 'Shipment List', icon: <BsCurrencyDollar />, link: `/list` },
    { name: 'Add Tracking Info', icon: <FaWallet />, link: `/tracking` },
    { name: 'Check Tracking Info', icon: <BsBoxSeam />, link: `/check` },
    // { name: 'Staking', icon: <FaChartPie /> },
    // { name: 'Earnings', icon: <FaChartPie /> },
    // { name: 'Manage wallets', icon: <FaWallet /> },
    // { name: 'Account', icon: <AiOutlineUser /> },
    // { name: 'Support', icon: <MdSupport /> },
];

export default function Sidebar() {

    const pathname = usePathname();

    const dispatch = useAppDispatch();

    const signOut = async () => {
        Cookies.remove(AUTH_TOKEN_KEY);
        // try {
        //     await APICall(logout)
        // } catch (error) {
        //     console.log(error);

        // } finally {
        //     window.location.pathname = "/login";
        // }
        window.location.pathname = "/login";
    };

    return (
        <div className="w-64 bg-[#0E1726] text-white h-auto flex flex-col justify-between">
            <div>
                <div className="p-4 flex items-center space-x-2 text-lg font-bold border-b border-gray-700">
                    {/* <img src="/logo.png" className="w-8 h-8" alt="Logo" /> */}
                    <span>Cargo Vetra</span>
                </div>


                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            href={item.link}
                            key={item.name}
                            className={`flex items-center space-x-2 p-3 hover:bg-blue-600 transition cursor-pointer ${pathname == item.link ? `bg-blue-600` : ``}`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-700">
                <button onClick={() => {
                    dispatch(resetAuth());
                    signOut();
                }} className="flex items-center space-x-2 text-red-500 hover:text-red-600">
                    <FaSignOutAlt />
                    <span>Sign out</span>
                </button>
            </div>
        </div>
    );
}
