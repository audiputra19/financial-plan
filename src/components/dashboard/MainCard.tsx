import clsx from "clsx";
import type { FC, JSX } from "react";
import { MdArrowForward } from "react-icons/md";

interface ItemsProps {
    id: number, 
    icon: JSX.Element,
    title: string,
    desc: string,
    value: number,
}

interface MainCardProps {
    items: ItemsProps[]
}

export const MainCard: FC<MainCardProps>  = ({ items }) => {
    return (
        <div 
            className={clsx(
                "grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4"
            )}
        >
            {items.map((item) => (
                <button 
                    key={item.id}
                    className={clsx(
                        "border border-base-300 bg-base-100 rounded-2xl group/item cursor-pointer",
                        "transition-transform duration-500 text-left",
                        "lg:hover:scale-102 active:scale-95"
                    )}
                >
                    <section 
                        className={clsx(
                            `p-5 flex flex-col gap-5 text-base-content`,
                        )}
                    >
                        <div className="flex gap-3 items-start">
                            <div 
                                className={clsx(
                                    "p-3 bg-base-200 text-base-content rounded-2xl flex-none text-primary",
                                )}
                            >
                                {item.icon}
                            </div>
                            <div className="flex flex-col">
                                <div className="font-semibold">{item.title}</div>
                                <div 
                                    className={clsx(
                                        'text-[12px] font-semibold text-base-content/50',
                                    )}
                                >
                                    {item.desc}
                                </div>
                            </div>
                        </div>
                        <div className="text-lg font-black">
                            <span className="mr-2">IDR</span> 
                            {item.value.toLocaleString("id-ID")}
                        </div>
                    </section>
                    <footer className="border-t border-base-300 py-3 px-5">
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
                </button>
            ))}
        </div>
    )
}