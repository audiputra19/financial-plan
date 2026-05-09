import clsx from "clsx";
import type { FC } from "react";
import { MdMoreHoriz, MdOutlineDirectionsBus, MdOutlineFastfood, MdOutlineShoppingBag } from "react-icons/md";


interface BudgetCategory {
    id: string;
    category: string;
    allocated: number;
    spent: number;
    icon: React.ReactNode;
}

const Budgeting: FC = () => {
    const budgetData: BudgetCategory[] = [
        { id: '1', category: 'Food', allocated: 2000000, spent: 1200000, icon: <MdOutlineFastfood size={22}/> },
        { id: '2', category: 'Transport', allocated: 800000, spent: 750000, icon: <MdOutlineDirectionsBus size={22}/> },
        { id: '3', category: 'Lifestyle', allocated: 1500000, spent: 1600000, icon: <MdOutlineShoppingBag size={22}/> },
    ];

    return (
        <main className="p-5 max-w-[1440px] mx-auto w-full">
            <section className="flex justify-center">
                <div 
                    className={clsx(
                        "w-full border border-base-300 bg-base-100 rounded-2xl p-6 md:p-8",
                        "md:w-[500px]"
                    )}
                >
                    <header className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-base-content tracking-tight">Monthly Budget</h1>
                            <p className="text-base-content/50 text-sm font-medium">May 2026</p>
                        </div>
                        <button className="p-3 bg-base-200 rounded-2xl cursor-pointer hover:bg-base-300/60">
                            <MdMoreHoriz size={20} />
                        </button>
                    </header>

                    <div className="flex flex-col gap-6">
                        {budgetData.map((item) => {
                            const percentage = (item.spent / item.allocated) * 100;
                            const isOverBudget = percentage > 100;

                            return (
                                <div key={item.id} className="flex flex-col gap-3">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex items-center gap-4">
                                            <div 
                                                className={clsx(
                                                    "p-3 rounded-2xl text-base-content bg-base-200",
                                                    ""
                                                )}
                                            >
                                                {item.icon}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-sm font-bold">{item.category}</div>
                                                <div className="text-[10px] opacity-50 uppercase font-semibold tracking-wider">
                                                    {isOverBudget ? 'Over Budget!' : 'Remaining'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <div className="text-sm font-bold">
                                                Rp {item.spent.toLocaleString('id-ID')}
                                            </div>
                                            <div className="text-[11px] opacity-50 font-semibold">
                                                of Rp {item.allocated.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-2 w-full bg-base-200 rounded-full overflow-hidden">
                                        <div 
                                            className={clsx(
                                                "h-full transition-all duration-500",
                                                isOverBudget ? "bg-error/80" : "bg-success/80"
                                            )}
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        className={clsx(
                            "mt-8 w-full py-4 rounded-2xl text-white flex justify-center items-center gap-2",
                            "bg-primary lg:hover:bg-primary/90 font-black text-primary-content lg:duration-500",
                            "transition-transform cursor-pointer lg:hover:-translate-y-1 active:scale-95"
                        )}
                    >
                        Adjust Budget
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Budgeting;