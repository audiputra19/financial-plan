import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { TbEdit, TbEye, TbEyeOff, TbZoomScan } from "react-icons/tb";

interface ItemsProps {
    id: number,
    accountName: string,
    value: number,
    color: string,
}

interface MyWalletProps {
    items: ItemsProps[];
    visibleWallet: number[];
    toggleVisibility: (id: number) => void;
    visibleAll: boolean;
    maskedDisplay: ReactNode;
}

export const MyWalletCard: FC<MyWalletProps>  = ({ 
    items, visibleWallet, toggleVisibility, visibleAll, maskedDisplay 
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => {
                const isManuallyHidden = visibleWallet.includes(item.id);
                const showValue = visibleAll ? !isManuallyHidden : isManuallyHidden;

                return (
                    <div 
                        key={item.id}
                        className={clsx(
                            "col-span-1 border w-full rounded-2xl border border-base-300",
                            "bg-base-100 flex flex-col"
                        )}
                    >
                        <header className="flex justify-between items-center p-5">
                            <div 
                                className={clsx(
                                    "border border-base-300 bg-base-200 p-2 rounded-2xl flex gap-1",
                                    "font-semibold"
                                )}
                            >
                                <div 
                                    className={clsx(
                                        "w-4 h-4 text-xs rounded-full flex justify-center items-center",
                                        "text-white"
                                    )}
                                    style={{ backgroundColor: item.color }}
                                >
                                    {item.accountName.charAt(0)}
                                </div>
                                <div className="text-xs text-base-content font-bold">
                                    {item.accountName}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div 
                                    className={clsx(
                                        "border border-base-300 w-8 h-8 rounded-2xl flex justify-center",
                                        "items-center bg-base-200 text-base-content cursor-pointer"
                                    )}
                                    onClick={() => toggleVisibility(item.id)}
                                >
                                    {showValue ? (
                                        <TbEyeOff size={20}/>
                                    ) : (
                                        <TbEye size={20}/>
                                    )}
                                </div>
                                <div 
                                    className={clsx(
                                        "border border-base-300 w-8 h-8 rounded-2xl flex justify-center",
                                        "items-center bg-base-200 text-base-content cursor-pointer"
                                    )}
                                >
                                    <TbEdit size={20}/>
                                </div>
                            </div>
                        </header>
                        <section className="pb-5 px-5 flex-1 flex items-center">
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-semibold text-base-content/50">
                                    Available Balance
                                </div>
                                <div className="flex items-center text-lg font-black">
                                    <span className="mr-2">IDR</span> 
                                    {showValue 
                                    ? item.value.toLocaleString("id-ID") 
                                    : maskedDisplay}
                                </div>
                            </div>
                        </section>
                        <footer className="flex justify-end p-2 border-t border-base-300">
                            <button 
                                className={clsx(
                                    "bg-base-200 p-2 rounded-2xl flex gap-1 items-center text-xs",
                                    "font-semibold cursor-pointer text-base-content",
                                    "border border-base-300",
                                    "hover:bg-base-300/70"
                                )}
                            >
                                View All Activity
                                <TbZoomScan size={18}/>
                            </button>
                        </footer>
                    </div>
                )
            })}
        </div>
    )
}