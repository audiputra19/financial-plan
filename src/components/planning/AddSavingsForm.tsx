import { type FC, type ReactNode, useState } from "react";
import Modal from "../Modal"; // Gunakan modal yang sudah kita perbaiki tadi
import clsx from "clsx";

interface FinancialGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    category: 'savings' | 'investment' | 'purchase';
    icon: ReactNode;
}

interface AddSavingsProps {
    isOpen: boolean;
    onClose: () => void;
    goal: FinancialGoal;
    onConfirm: (amount: number) => void;
}

export const AddSavingsForm: FC<AddSavingsProps> = ({ isOpen, onClose, goal, onConfirm }) => {
    const [amount, setAmount] = useState<number>(0);

    const handleConfirm = () => {
        onConfirm(Number(amount));
        setAmount(0);
        onClose();
    };

    const totalAmount = goal.currentAmount + amount;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add to Savings">
            <div className="space-y-6">
                <div className="text-center space-y-1">
                    <p className="text-xs font-bold opacity-50 uppercase tracking-widest">Alokasi Dana Untuk</p>
                    <h2 className="text-2xl font-black">{goal.name}</h2>
                </div>

                <div 
                    className={clsx(
                        "p-6 bg-base-200 rounded-[2rem] border-2",
                        totalAmount > goal.targetAmount ? "border-error/20" : "border-primary/20"
                    )}
                >
                    <label className="text-[10px] font-black opacity-40 uppercase mb-2 block text-center">Nominal Tabungan</label>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-black opacity-30">Rp</span>
                        <input 
                            type="number" 
                            autoFocus
                            value={amount ? amount : ''}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="0"
                            className="bg-transparent text-4xl font-black focus:outline-none w-full text-center placeholder:opacity-10"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {[50000, 100000, 500000].map((val) => (
                        <button 
                            key={val}
                            onClick={() => setAmount(val)}
                            className={clsx(
                                "py-3 rounded-2xl bg-base-100 border border-base-300 text-[10px]",
                                "font-black hover:border-primary hover:text-primary transition-all",
                                "cursor-pointer"
                            )}
                        >
                            +{(Number(val)/1000)}K
                        </button>
                    ))}
                </div>
                <button 
                    onClick={handleConfirm}
                    disabled={!amount || Number(amount) <= 0 || totalAmount > goal.targetAmount}
                    className={clsx(
                        "mt-5 w-full py-4 rounded-2xl text-white flex justify-center items-center gap-2",
                        "bg-primary  font-black text-primary-content lg:duration-500 disabled:opacity-30",
                        "transition-transform",
                        "enabled:cursor-pointer enabled:hover:-translate-y-1 enabled:active:scale-95",
                        "disabled:scale-100 disabled:opacity-30 disabled:grayscale cursor-pointer",
                        "disabled:cursor-not-allowed disabled:transform-none"
                    )}
                >
                    Deposit Now
                </button>
                
                <p className="text-[10px] text-center font-bold opacity-30 px-6">
                    Dana ini akan dikurangi dari saldo "Available to Spend" Anda.
                </p>
            </div>
        </Modal>
    );
};