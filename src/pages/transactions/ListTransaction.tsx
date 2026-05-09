import type { FC } from "react";
import { TransactionCard } from "../../components/transactions/TransactionCard";

const ListTransaction: FC = () => {
    const transactions = [
        {
            id: 1,
            transactionType: 'expense',
            date: '2026-05-06 12:45:00',
            amount: -20000,
            category: 'food',
            wallet: 'GoPay',
            note: 'Makan siang',
        },
        {
            id: 2,
            transactionType: 'income',
            date: '2026-05-06 14:15:00',
            amount: 50000,
            category: 'debt',
            wallet: 'Mandiri',
            note: 'Teman bayar hutang',
        },
        {
            id: 3,
            transactionType: 'expense',
            date: '2026-05-06 17:12:00',
            amount: -50000,
            category: 'transport',
            wallet: 'Cash',
            note: 'Beli bensin pertamax',
        }
    ]

    return (
        <>
            <main className="p-5 max-w-[1440px] mx-auto w-full">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">List Transaction</h1>
                        <p className="text-base-content/50 text-sm font-medium">
                            Here is the summary of overall data
                        </p>
                    </div>
                    <div>
                        
                    </div>
                </header>
                <section className="mt-4">
                    <TransactionCard 
                        items={transactions}
                    />
                </section>
            </main>
        </>
    )
}

export default ListTransaction;