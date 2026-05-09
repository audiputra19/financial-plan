import clsx from "clsx";
import type { FC } from "react";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { MdArrowForward } from "react-icons/md";
import { TbCreditCardPay, TbShieldDollar } from "react-icons/tb";
import ExpenseBreakdown from "../../components/dashboard/ExpenseBreakdown";
import Cashflow from "../../components/dashboard/Cashflow";
import { MainCard } from "../../components/dashboard/MainCard";

const Overview: FC = () => {
    const cards = [
        { 
            id: 1, 
            icon: <HiOutlineBanknotes size={25} />,
            title: 'Total Net Balance',
            desc: 'Total cash across all accounts.',
            value: 20000000,
        },
        { 
            id: 2, 
            icon: <TbCreditCardPay size={25} />,
            title: 'Daily Spending Limit',
            desc: 'Safe daily limit to spend.',
            value: 5000000, 
        },
        { 
            id: 3, 
            icon: <TbShieldDollar size={25} />,
            title: 'Total Saved',
            desc: 'Progress toward your financial goals.',
            value: 150000000,
        },
    ]

    return (
        <main className="p-5 max-w-[1440px] mx-auto w-full">
            <header>
                <h1 className="text-2xl font-black tracking-tight">Overview</h1>
                <p className="text-base-content/50 text-sm font-medium">
                    Here is the summary of overall data
                </p>
            </header>
            <section className="mt-4">
                <MainCard 
                    items={cards}
                />
            </section>
            <section className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className='bg-base-100 rounded-2xl border border-base-300 w-full flex flex-col'>
                    <ExpenseBreakdown />
                    <footer className="border-t border-base-300 py-3 px-5 group/item cursor-pointer">
                        <div className="flex justify-between text-base-content/50">
                            <div className="text-sm font-semibold">See detail</div>
                            <div 
                                className={clsx(
                                    "group-hover/item:translate-x-2 transition-transform duration-500"
                                )}
                            >
                                <MdArrowForward size={20}/>
                            </div>
                        </div>
                    </footer>
                </div>
                <div className='bg-base-100 rounded-2xl border border-base-300 w-full flex flex-col'>
                    <Cashflow />
                    <footer className="border-t border-base-300 py-3 px-5 group/item cursor-pointer">
                        <div className="flex justify-between text-base-content/50">
                            <div className="text-sm font-semibold">See detail</div>
                            <div 
                                className={clsx(
                                    "group-hover/item:translate-x-2 transition-transform duration-500"
                                )}
                            >
                                <MdArrowForward size={20}/>
                            </div>
                        </div>
                    </footer>
                </div>
            </section>
        </main>
    )
}

export default Overview;