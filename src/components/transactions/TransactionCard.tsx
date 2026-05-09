import clsx from "clsx";
import moment from "moment";
import type { FC, JSX } from "react";
import { MdMoreHoriz, MdOutlineCreditCard, MdOutlineDirectionsBus, MdOutlineFastfood, MdOutlineHomeWork, MdOutlineMedicalServices, MdOutlinePeople, MdOutlineShoppingBag } from "react-icons/md";
import { TbCash, TbEdit, TbTrash } from "react-icons/tb";

interface ItemsProps {
    id: number;
    transactionType: string;
    date: string;
    amount: number;
    category: string;
    wallet: string;
    note: string;
}

interface TransactionCardProps {
    items: ItemsProps[]
}

export const TransactionCard: FC<TransactionCardProps> = ({ items }) => {
    return (
        <div className="flex flex-col gap-4">
            {items.map((item) => {
                let icon = null;
                
                const categoryIcons: Record<string, JSX.Element> = {
                    food: <MdOutlineFastfood size={22} />,
                    transport: <MdOutlineDirectionsBus size={22} />,
                    living: <MdOutlineHomeWork size={22} />,
                    lifestyle: <MdOutlineShoppingBag size={22} />,
                    health: <MdOutlineMedicalServices size={22} />,
                    social: <MdOutlinePeople size={22} />,
                    debt: <MdOutlineCreditCard size={22} />,
                    cash: <TbCash size={22} />,
                    others: <MdMoreHoriz size={22} />,
                };
                icon = categoryIcons[item.category] || <MdMoreHoriz size={22} />;

                const isExpense = item.amount < 0 || item.transactionType.toLowerCase().includes('out');

                return (
                    <div
                        key={item.id}
                        className={clsx(
                            "group border border-base-300 bg-base-100 rounded-2xl overflow-hidden",
                            
                        )}
                    >
                        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex flex-1 gap-4 items-center">
                                <div 
                                    className={clsx(
                                        "p-3 bg-base-200 rounded-2xl shrink-0",
                                    )}
                                >
                                    {icon}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <h3 
                                        className={clsx(
                                            "font-bold text-base md:text-lg truncate tracking-tight capitalize"
                                        )}
                                    >
                                        {item.transactionType}
                                    </h3>
                                    <div className="flex flex-wrap gap-3 items-center text-[11px]">
                                        <span className="text-base-content/60 font-medium">
                                            {moment(item.date).format("DD MMM YYYY")}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-base-300" />
                                        <div className="flex flex-wrap gap-3 items-center">
                                            <span 
                                                className={clsx(
                                                    "px-2 py-0.5 bg-base-content/5 rounded-md font-bold",
                                                    "truncate max-w-[110px]",
                                                    isExpense ? "text-warning" : "text-primary"
                                                )}
                                            >
                                                {item.wallet}
                                            </span>
                                            <span 
                                                className={clsx(
                                                    "px-2 py-0.5 bg-base-content/5 rounded-md font-bold",
                                                    "italic truncate max-w-[110px]",
                                                    isExpense ? "text-warning" : "text-primary",
                                                )}
                                            >
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className={clsx(
                                    "flex justify-between md:justify-end items-center gap-4 py-2 md:pt-0"
                                )}
                            >
                                <div className={clsx(
                                    "text-lg font-black",
                                    isExpense ? "text-warning" : "text-primary"
                                )}>
                                    {isExpense ? "-" : "+"} IDR {Math.abs(item.amount).toLocaleString("id-ID")}
                                </div>
                                
                                <div className="flex gap-3">
                                    <button 
                                        className={clsx(
                                            "p-2 bg-base-200 hover:bg-base-300/60 text-base-content/60", 
                                            "hover:text-primary rounded-lg cursor-pointer",
                                            "active:scale-90 transition-transform"
                                        )}
                                    >
                                        <TbEdit size={20}/>
                                    </button>
                                    <button 
                                        className={clsx(
                                            "p-2 bg-base-200 hover:bg-base-300/60 text-base-content/60", 
                                            "hover:text-error rounded-lg cursor-pointer",
                                            "active:scale-90 transition-transform"
                                        )}
                                    >
                                        <TbTrash size={20}/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {item.note && (
                            <div className="px-5 py-3 bg-base-100 border-t border-base-300">
                                <p className="text-[13px] text-base-content/60 italic">
                                    <span className="font-bold not-italic mr-1">Note:</span> {item.note}
                                </p>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}