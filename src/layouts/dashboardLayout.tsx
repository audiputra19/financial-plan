import clsx from "clsx";
import type { FC } from "react";
import { MdInsertChartOutlined } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardLayout: FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const links = [
        { id: 1, title: 'Overview', path: '/dashboard', icon: <MdInsertChartOutlined size={20} /> },
    ];

    return (
        <div className="flex h-full">
            <aside 
                className={clsx(
                    "hidden border-r border-base-300 bg-base-100 p-3",
                    "md:block md:w-52",
                    "lg:w-64"
                )}
            >
                <div className="px-3 pb-5 font-black">Dashboard</div>
                <ul className="flex flex-col gap-1">
                    {links.map(link => (
                        <li 
                            key={link.id}
                            className="flex flex-col"
                        >
                            <Link 
                                to={`${link.path}`}
                                className={clsx(
                                    "flex gap-2 items-center p-3 rounded-xl text-sm font-semibold",
                                    {
                                        "bg-gradient-to-r from-primary via-primary/70 to-primary/50 font-black text-primary-content" : currentPath === link.path,
                                        "hover:bg-base-300 text-base-content" : currentPath !== link.path
                                    }
                                )}
                            >
                                {link.icon} {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="flex-1 bg-base-200 h-screen overflow-y-auto">
                <Navbar />
                <div className="pb-25 md:pb-0">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;