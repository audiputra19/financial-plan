import clsx from "clsx";
import { type Dispatch, type FC, type SetStateAction } from "react";
import Modal from "../Modal";
import { 
    MdOutlineDirectionsBus, MdOutlineFastfood, MdOutlineHomeWork, 
    MdOutlineShoppingBag, MdOutlineMedicalServices, MdOutlinePeople, 
    MdOutlineCreditCard, MdMoreHoriz 
} from "react-icons/md";
import { TbTrash } from "react-icons/tb";

const availableCategories = [
    { id: 'food', label: 'Food', icon: <MdOutlineFastfood size={20} />, color: 'bg-orange-100 text-orange-600' },
    { id: 'transport', label: 'Transport', icon: <MdOutlineDirectionsBus size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 'living', label: 'Living', icon: <MdOutlineHomeWork size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 'lifestyle', label: 'Lifestyle', icon: <MdOutlineShoppingBag size={20} />, color: 'bg-pink-100 text-pink-600' },
    { id: 'health', label: 'Health', icon: <MdOutlineMedicalServices size={20} />, color: 'bg-red-100 text-red-600' },
    { id: 'social', label: 'Social', icon: <MdOutlinePeople size={20} />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'debt', label: 'Debt', icon: <MdOutlineCreditCard size={20} />, color: 'bg-slate-100 text-slate-600' },
    { id: 'others', label: 'Others', icon: <MdMoreHoriz size={20} />, color: 'bg-gray-100 text-gray-600' },
];

interface FormProps {
    id: string;
    category: string;
    allocated: number;
}

interface AddBudgetFormProps {
    isAddBudgetOpen: boolean;
    setIsAddBudgetOpen: Dispatch<SetStateAction<boolean>>;
    form: FormProps[];
    setForm: Dispatch<SetStateAction<FormProps[]>>;
}

export const AddBudgetForm: FC<AddBudgetFormProps> = ({ 
    isAddBudgetOpen, setIsAddBudgetOpen, form, setForm 
}) => {
    const toggleCategory = (cat: typeof availableCategories[0]) => {
        const isExist = form.find(f => f.id === cat.id);
        if (isExist) {
            setForm(prev => prev.filter(f => f.id !== cat.id));
        } else {
            setForm(prev => [...prev, { id: cat.id, category: cat.label, allocated: 0 }]);
        }
    };

    const handleAmountChange = (id: string, value: string) => {
        setForm(prev => prev.map(f => f.id === id ? { ...f, allocated: Number(value) } : f));
    };

    const totalPlanned = form.reduce((acc, curr) => acc + curr.allocated, 0);

    return (
        <Modal
            isOpen={isAddBudgetOpen}
            onClose={() => {
                setIsAddBudgetOpen(false);
                setForm([]);
            }}
            title="Setup Monthly Budget"
        >
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-black opacity-50">
                        Choose Categories
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {availableCategories.map((cat) => {
                            const isActive = form.some(f => f.id === cat.id);
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => toggleCategory(cat)}
                                    className={clsx(
                                        "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2", 
                                        "transition-all shrink-0 font-bold text-xs cursor-pointer",
                                        isActive 
                                            ? "border-primary/20 bg-primary/10 text-primary" 
                                            : "border-base-300 bg-base-100 text-base-content/60",
                                        "lg:hover:border-primary/20 lg:hover:bg-primary/10 lg:hover:text-primary",
                                        "active:scale-90"    
                                    )}
                                >
                                    {cat.icon}
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-4 pr-1">
                    {form.length === 0 && (
                        <div className="text-center py-10 border-2 border-dashed border-base-300 rounded-2xl opacity-40">
                            <p className="text-sm font-bold italic">Pilih kategori di atas untuk mulai</p>
                        </div>
                    )}
                    
                    {form.map((f) => {
                        const catInfo = availableCategories.find(c => c.id === f.id);
                        return (
                            <div 
                                key={f.id} 
                                className={clsx(
                                    "flex items-center gap-4 p-4 border border-base-300 rounded-2xl",
                                    "bg-base-100"
                                )}>
                                <div className={clsx("p-3 rounded-2xl", catInfo?.color)}>
                                    {catInfo?.icon}
                                </div>
                                <div className="flex-1">
                                    <label className="text-[10px] uppercase font-black opacity-40 block mb-0.5">
                                        {f.category} Limit
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-sm opacity-60">Rp</span>
                                        <input 
                                            type="number" 
                                            value={f.allocated || ""}
                                            onChange={(e) => handleAmountChange(f.id, e.target.value)}
                                            placeholder="0"
                                            className="bg-transparent font-black text-xl focus:outline-none w-full"
                                        />
                                    </div>
                                </div>
                                <button 
                                    onClick={() => toggleCategory(catInfo!)}
                                    className={clsx(
                                        "p-2 text-error cursor-pointer bg-base-200 rounded-lg",
                                        "lg:hover:bg-base-300/60 active:scale-90 transition-transform"
                                    )}
                                >
                                    <TbTrash size={20}/>
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="space-y-4 pt-2">
                    <div className="p-5 bg-base-200 rounded-2xl border-2 border-dashed border-base-300">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold opacity-60">Total Planned</span>
                            <span className="text-lg font-black text-primary">
                                Rp {totalPlanned.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <p className="text-[10px] font-medium leading-relaxed opacity-50">
                            *Target ini akan memonitor pengeluaranmu dari semua wallet.
                        </p>
                    </div>

                    <button
                        disabled={form.length === 0}
                        className={clsx(
                            "mt-5 w-full py-4 rounded-2xl text-white flex justify-center items-center gap-2",
                            "bg-primary  font-black text-primary-content lg:duration-500 disabled:opacity-30",
                            "transition-transform",
                            "enabled:cursor-pointer enabled:hover:-translate-y-1 enabled:active:scale-95",
                            "disabled:scale-100 disabled:opacity-30 disabled:grayscale cursor-pointer",
                            "disabled:cursor-not-allowed disabled:transform-none"
                        )}
                    >
                        Save All Budget
                    </button>
                </div>
            </div>
        </Modal>
    );
};