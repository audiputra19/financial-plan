import { type FC, useState, type ReactNode } from "react";
import { TbTargetArrow, TbDeviceLaptop, TbPlaneDeparture, TbPigMoney, TbPlus } from "react-icons/tb";
import clsx from "clsx";
import { AddSavingsForm } from "../../components/planning/AddSavingsForm";

interface FinancialGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    category: 'savings' | 'investment' | 'purchase';
    icon: ReactNode;
}

const FinancialGoals: FC = () => {
    const [isSavingsOpen, setIsSavingsOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<FinancialGoal | null>(null);
    
    const [goals, setGoals] = useState<FinancialGoal[]>([
        { 
            id: '1', 
            name: "MacBook Pro M3", 
            targetAmount: 35000000, 
            currentAmount: 15000000, 
            deadline: "Desember 2026",
            category: 'purchase',
            icon: <TbDeviceLaptop size={24} />
        },
        { 
            id: '2', 
            name: "Liburan ke Jepang", 
            targetAmount: 20000000, 
            currentAmount: 18000000, 
            deadline: "Oktober 2026",
            category: 'purchase',
            icon: <TbPlaneDeparture size={24} />
        }
    ]);

    const handleConfirmSavings = (amount: number) => {
        if (!selectedGoal) return;

        setGoals(prev => prev.map(g =>
            g.id === selectedGoal.id
                ? { ...g, currentAmount: g.currentAmount + amount }
                : g
        ));
    };

    return (
        <>
            <section className="p-5 max-w-[1440px] mx-auto w-full">
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-base-content tracking-tight">Your Goals</h1>
                        <p className="text-base-content/50 text-sm font-medium">Keep Steady, Audi</p>
                    </div>
                    <div>
                        <div 
                            className={clsx(
                                "py-2 px-3 rounded-2xl bg-primary text-primary-content text-xs",
                                "flex items-center gap-1 font-semibold cursor-pointer transition-transform",
                                "duration-300",
                                "hover:bg-primary/90 hover:-translate-y-0.5 active:scale-98"
                            )}
                        >
                            <TbPlus size={20}/>
                            <div className="hidden md:block ">
                                Add Goals
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal) => {
                        const progress = (goal.currentAmount / goal.targetAmount) * 100;
                        
                        return (
                            <div key={goal.id} className="bg-base-100 border border-base-300 rounded-2xl p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                                        {goal.icon}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black uppercase opacity-40 tracking-widest block">Progress</span>
                                        <span className="text-2xl font-black text-primary">{progress.toFixed(0)}%</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-black mb-1">{goal.name}</h3>
                                    <p className="text-xs font-bold opacity-40">Target: {goal.deadline}</p>
                                </div>

                                <div className="h-4 w-full bg-base-200 rounded-full overflow-hidden mb-4 p-1">
                                    <div 
                                        className="h-full bg-primary rounded-full transition-all duration-1000"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-bold opacity-40 uppercase">Saved</p>
                                        <p className="font-black text-sm">{goal.currentAmount.toLocaleString('id-ID')}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold opacity-40 uppercase">Goal</p>
                                        <p className="font-black text-sm text-base-content/60">{goal.targetAmount.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => {
                                        setSelectedGoal(goal);
                                        setIsSavingsOpen(true);
                                    }}
                                    className={clsx(
                                        "mt-6 w-full py-4 rounded-2xl bg-base-200 font-black text-xs",
                                        "hover:bg-primary hover:text-white uppercase tracking-widest duration-500",
                                        "transition-transform cursor-pointer lg:hover:-translate-y-1 active:scale-98"
                                    )}
                                >
                                    Add Savings
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
            {isSavingsOpen && selectedGoal && (
                <AddSavingsForm 
                    isOpen={isSavingsOpen}
                    onClose={() => setIsSavingsOpen(false)}
                    goal={selectedGoal}
                    onConfirm={handleConfirmSavings}
                />
            )}
        </>
    );
}

export default FinancialGoals;