import clsx from "clsx";
import { useState, type FC } from "react";
import { TbEye, TbEyeOff, TbPlus } from "react-icons/tb";
import { MyWalletCard } from "../../components/accounts/wallets/MyWalletCard";
import { AddWalletForm } from "../../components/accounts/wallets/AddWalletForm";

interface FormProps {
    accountName: string;
    accountType: string;
    currentBalance: number;
    color: string;
}

const MyWallets: FC = () => {
    const [form, setForm] = useState<FormProps>({
        accountName: "",
        accountType: "",
        currentBalance: 0,
        color: "#FE9A37"
    });
    const [visibleWallet, setVisibleWallet] = useState<number[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [visibleAll, setVisibileAll] = useState<boolean>(false);

    const toggleVisibility = (id: number) => {
        setVisibleWallet((prev) => 
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }

    const MaskedValue = () => (
        <div className="flex gap-1 items-center h-full">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-base-content" />
            ))}
        </div>
    );

    const wallets = [
        {
            id: 1,
            accountName: 'GoPay',
            value: 1000000,
            color: '#00AED6',
        },
        {
            id: 2,
            accountName: 'Bibit',
            value: 20000000,
            color: '#10B981',
        },
        {
            id: 3,
            accountName: 'Bank Mandiri',
            value: 5000000,
            color: '#085B94',
        },
        {
            id: 4,
            accountName: 'Bank BSI',
            value: 3000000,
            color: '#14B8A6',
        },
    ];

    const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.value, 0);

    return (
        <>
            <main className="p-5 max-w-[1440px] mx-auto w-full">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">My Wallet</h1>
                        <p className="text-base-content/50 text-sm font-medium">
                            Here is the summary of overall data
                        </p>
                    </div>
                    <div>
                        <div 
                            className={clsx(
                                "py-2 px-3 rounded-2xl bg-primary text-primary-content text-xs",
                                "flex items-center gap-1 font-semibold cursor-pointer transition-transform",
                                "duration-300",
                                "lg:hover:bg-primary/90 lg:hover:-translate-y-0.5 active:scale-98"
                            )}
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <TbPlus size={20}/>
                            <div className="hidden md:block ">
                                Add Wallet
                            </div>
                        </div>
                    </div>
                </header>
                <section className="mt-4">
                    {wallets.length === 0 ? (
                        <div className="flex justify-center text-xl font-bold text-base-content/50">
                            There is no wallet
                        </div>
                    ) : (
                        <>
                            <div>
                                <div className={clsx(
                                        "flex flex-col gap-1 border border-base-300 bg-base-100 w-fit", 
                                        "p-5 rounded-2xl"
                                    )}
                                >
                                    <div className="text-sm font-semibold text-base-content/50">
                                        Total Balance
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <div className="flex items-center text-lg font-black min-w-[200px]">
                                            <span className="mr-2">IDR</span>
                                            {visibleAll 
                                            ? totalBalance.toLocaleString("id-ID")
                                            : <MaskedValue />}
                                        </div>
                                        <div 
                                            className={clsx(
                                                "p-2 rounded-lg flex justify-center",
                                                "items-center bg-base-200 text-base-content/60 cursor-pointer",
                                                "lg:hover:bg-base-300/60 active:scale-90 transition-transform"
                                            )}
                                            onClick={() => {
                                                setVisibileAll(!visibleAll);
                                                setVisibleWallet([]);
                                            }}
                                        >
                                            {visibleAll ? (
                                                <TbEyeOff size={20}/>
                                            ) : (
                                                <TbEye size={20}/>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <MyWalletCard 
                                    items={wallets}
                                    visibleWallet={visibleWallet}
                                    toggleVisibility={toggleVisibility}
                                    visibleAll={visibleAll}
                                    maskedDisplay={<MaskedValue />}
                                />
                            </div>
                        </>
                    )}
                </section>
            </main>
            <AddWalletForm 
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                form={form}
                setForm={setForm}
            />
        </>
    )
}

export default MyWallets;