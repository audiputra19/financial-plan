import clsx from "clsx";
import type { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { MdAccountBalanceWallet, MdOutlineAccountBalanceWallet, MdOutlineSpaceDashboard, MdSpaceDashboard } from "react-icons/md";
import { RiMoneyDollarCircleFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbChecklist, TbLayoutList, TbLayoutListFilled, TbMoneybagMove, TbPigFilled, TbPigMoney } from "react-icons/tb";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const MainLayout: FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const links = [
        { id: 1, title: 'Dashboard', path: '/dashboard', icon: <MdOutlineSpaceDashboard size={22} /> },
        { id: 2, title: 'Accounts', path: '/accounts', icon: <MdOutlineAccountBalanceWallet size={22} /> },
        { id: 3, title: 'Transactions', path: '/transactions', icon: <TbMoneybagMove size={22} /> },
        { id: 4, title: 'Planning', path: '/plannings', icon: <TbChecklist size={22} /> },
    ];

    // FOR MOBILE
    const isHome = currentPath === '/dashboard';
    const isWallet = currentPath === '/accounts';
    const isGoals = currentPath === '/plannings/financial_goals';
    const isList = currentPath === '/transactions/list_transaction';

    return (
        <div className="flex h-screen flex-col md:flex-row">
            {/* WEB */}

            {/* MAIN SIDEBAR */}
            <aside 
                className="hidden md:flex w-[60px] flex-col gap-1 items-center py-3 border-r 
                    border-base-300 bg-base-220"
            >
                {links.map(link => {
                    const isActive = currentPath.startsWith(link.path)

                    return (
                        <Link 
                            key={link.id}
                            title={link.title} 
                            to={link.path}
                        >
                            <div 
                                className={clsx(
                                    "tooltip tooltip-right p-2 rounded-xl",
                                    "before:text-[13px]",
                                    {
                                        "bg-primary text-primary-content" : isActive,    
                                        "hover:bg-base-300 text-base-content" : !isActive
                                    }
                                )}
                                data-tip={link.title}
                            >
                                {link.icon}
                            </div>
                        </Link>
                    )
                })}
            </aside>

            <div className="bg-base-200 flex-1 overflow-hidden">
                <Outlet /> 
            </div>

            {/* MOBILE */}
            <div className="md:hidden">
                <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[60]">
                    <button 
                        className={clsx(
                            "h-18 w-18 rounded-full bg-primary border-6 border-base-100", 
                            "text-primary-content flex justify-center items-center"
                        )}
                        onClick={() => navigate('/transactions')}
                    >
                        <FaPlus size={22}/>
                    </button>
                </div>
                <nav 
                    className="fixed bottom-0 left-0 right-0 h-16 bg-base-100 flex justify-around 
                        items-center z-50 font-semibold shadow-xl"   
                >
                    <Link 
                        to="/dashboard" 
                        className={clsx("flex flex-col gap-1 items-center text-[10px] min-w-[60px]",
                            {
                                "text-primary font-black" : isHome,
                                "text-base-content" : !isHome,
                            }
                        )}
                    >
                        {isHome ? (
                            <MdSpaceDashboard size={22} />
                        ) : (
                            <MdOutlineSpaceDashboard size={22} />
                        )}
                        <span>Home</span>
                    </Link>
                    <Link 
                        to="/accounts" 
                        className={clsx("flex flex-col gap-1 items-center text-[10px] min-w-[60px]",
                            {
                                "text-primary font-black" : isWallet,
                                "text-base-content" : !isWallet,
                            }
                        )}
                    >
                        {isWallet ? (
                            <MdAccountBalanceWallet size={22} />
                        ) : (
                            <MdOutlineAccountBalanceWallet size={22} />
                        )}
                        <span>My Wallet</span>
                    </Link>
                    <div className="w-12 flex-none"></div>
                    <Link 
                        to="/transactions/list_transaction" 
                        className={clsx("flex flex-col gap-1 items-center text-[10px] min-w-[60px]",
                            {
                                "text-primary font-black" : isList,
                                "text-base-content" : !isList,
                            }
                        )}
                    >
                        {isList ? (
                            <TbLayoutListFilled size={22} />
                        ) : (
                            <TbLayoutList size={22} />
                        )}
                        <span>List Input</span>
                    </Link>
                    <Link 
                        to="/plannings/financial_goals" 
                        className={clsx("flex flex-col gap-1 items-center text-[10px] min-w-[60px]",
                            {
                                "text-primary font-black" : isGoals,
                                "text-base-content" : !isGoals,
                            }
                        )}
                    >
                        {isGoals ? (
                            <TbPigFilled size={22} />
                        ) : (
                            <TbPigMoney size={22} />
                        )}
                        <span>Goals</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default MainLayout;