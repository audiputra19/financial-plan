import clsx from "clsx";
import { useState, type FC } from "react";
import { HiLightningBolt, HiOutlineLightningBolt } from "react-icons/hi";
import { MdMoreHoriz, MdOutlineCreditCard, MdOutlineDirectionsBus, MdOutlineFastfood, MdOutlineHomeWork, MdOutlineMedicalServices, MdOutlinePeople, MdOutlineShoppingBag } from "react-icons/md";
import moment from 'moment-timezone'

interface FormProps {
    transactionType: string;
    date: string;
    amount: number;
    category: string;
    wallet: string;
    note: string;
}

const QuickAdd: FC = () => {
    const now = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");
    const [form, setForm] = useState<FormProps>({
        transactionType: 'expense',
        date: now,
        amount: 0,
        category: '',
        wallet: '',
        note: '',
    });
    // console.log(form);

    const categories = [
        { id: 'food', label: 'Food', icon: <MdOutlineFastfood size={20} /> },
        { id: 'transport', label: 'Transport', icon: <MdOutlineDirectionsBus size={20} /> },
        { id: 'living', label: 'Living', icon: <MdOutlineHomeWork size={20} /> },
        { id: 'lifestyle', label: 'Lifestyle', icon: <MdOutlineShoppingBag size={20} /> },
        { id: 'health', label: 'Health', icon: <MdOutlineMedicalServices size={20} /> },
        { id: 'social', label: 'Social', icon: <MdOutlinePeople size={20} /> },
        { id: 'debt', label: 'Debt', icon: <MdOutlineCreditCard size={20} /> },
        { id: 'others', label: 'Others', icon: <MdMoreHoriz size={20} /> },
    ];

    return (
        <>
            <main className="p-5 max-w-[1440px] mx-auto w-full">
                <section 
                    className={clsx(
                        "flex justify-center",
                    )}
                >
                    <div 
                        className={clsx(
                            "w-full border border-base-300 bg-base-100 rounded-2xl p-6 md:p-8",
                            "md:w-[500px]"
                        )}
                    >
                        <header>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-black text-base-content tracking-tight">Quick Add</h1>
                                    <p className="text-base-content/50 text-sm font-medium">New transaction</p>
                                </div>
                                <div className={clsx(
                                    "p-3 rounded-2xl transition-colors duration-500",
                                    form.transactionType === 'expense' ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
                                )}>
                                    <HiLightningBolt size={24} />
                                </div>
                            </div>
                        </header>
                        <section className="mt-6">
                            <div className="flex flex-col gap-5">
                                <div className="">
                                    <div className="bg-base-200 p-1 rounded-3xl flex">
                                        {['expense', 'income'].map(item => {
                                            return (
                                                <button
                                                    onClick={() => 
                                                        setForm(prev => ({
                                                            ...prev,
                                                            transactionType: item
                                                        }))
                                                    }
                                                    className={clsx(
                                                        "flex-1 py-2.5 text-sm font-bold rounded-3xl cursor-pointer transition-color duration-300 capitalize",
                                                        form.transactionType === item 
                                                            ? item === 'income' 
                                                                ? "bg-warning text-warning-content shadow-sm" 
                                                                : "bg-primary text-primary-content shadow-sm"
                                                            : "text-base-content/50 hover:text-base-content"
                                                    )}
                                                >
                                                    {item}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <input 
                                        type="date"
                                        value={form.date} 
                                        className={clsx(
                                            "input border w-full border-base-300 rounded-2xl bg-base-200",
                                            "select-primary"
                                        )} 
                                        onChange={(e) => 
                                            setForm(prev => ({
                                                ...prev,
                                                date: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="number" 
                                        placeholder="Amount" 
                                        className={clsx(
                                            "input border w-full border-base-300 rounded-2xl bg-base-200",
                                            "select-primary"
                                        )}
                                        value={form.amount === 0 ? "" : form.amount}
                                        onChange={(e) => 
                                            setForm(prev => ({
                                                ...prev,
                                                amount: Number(e.target.value)
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-base-content/50 font-bold">Category</label>
                                    <div className="grid grid-cols-4 gap-3 mt-3">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => 
                                                    setForm(prev => ({
                                                        ...prev,
                                                        category: cat.id
                                                    }))
                                                }
                                                className={clsx(
                                                    "flex flex-col p-3",
                                                    "rounded-2xl border gap-1 cursor-pointer",
                                                    "group/item bg-base-200",
                                                    form.category === cat.id 
                                                        ? form.transactionType === 'income'
                                                            ? "border-warning/50 bg-warning/5 text-warning" 
                                                            : "border-primary/50 bg-primary/5 text-primary"
                                                        : "border-base-300 hover:border-base-300 hover:bg-base-200/50 text-base-content"
                                                )}
                                            >
                                                <div 
                                                    className={clsx(
                                                        "flex flex-col justify-center items-center gap-1",
                                                        "group-hover/item:scale-105 md:group-hover/item:scale-110 transition-transform duration-300",
                                                        "will-change-transform"
                                                    )}
                                                >
                                                    {cat.icon}
                                                    <span className="text-[11px] font-semibold">{cat.label}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <select 
                                        className={clsx(
                                            "select border w-full border-base-300 rounded-2xl bg-base-200",
                                            "select-primary"
                                        )} 
                                        value={form.wallet}
                                        onChange={(e) => 
                                            setForm(prev => ({
                                                ...prev,
                                                wallet: e.target.value
                                            }))
                                        }
                                    >
                                        <option value="" disabled>Choose Wallet</option>
                                        <option value="ShopeePay">ShopeePay</option>
                                        <option value="GoPay">GoPay</option>
                                        <option value="OVO">OVO</option>
                                        <option value="Mandiri">Mandiri</option>
                                    </select>
                                </div>
                                <div>
                                    <textarea
                                        className={clsx(
                                            "textarea border w-full border-base-300 rounded-2xl bg-base-200",
                                            "select-primary"
                                        )} 
                                        placeholder="Where is that money going?"
                                    >
                                    </textarea>
                                </div>
                                <button
                                    className={clsx(
                                        form.transactionType === 'income' 
                                        ? "bg-warning text-warning-content lg:hover:bg-warning/90"
                                        : "bg-primary text-primary-content lg:hover:bg-primary/90",
                                        "py-4 rounded-2xl flex justify-center font-black",
                                        "items-center gap-1 cursor-pointer transition-transform",
                                        "lg:duration-300 mt-3",
                                        "lg:hover:-translate-y-0.5 active:scale-98"
                                    )}
                                    value={form.note}
                                    onChange={(e) => 
                                        setForm(prev => ({
                                            ...prev,
                                            note: e.target.value
                                        }))
                                    }
                                >
                                    Save Transaction
                                </button>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
        </>
    )
}

export default QuickAdd;