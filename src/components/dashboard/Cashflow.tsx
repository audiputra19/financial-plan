import type { FC } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const cashflowData = [
    { month: 'Jan', income: 8500000, expense: 5200000 },
    { month: 'Feb', income: 9200000, expense: 4800000 },
    { month: 'Mar', income: 7800000, expense: 6100000 },
    { month: 'Apr', income: 10500000, expense: 5500000 },
    { month: 'May', income: 9800000, expense: 6500000 },
    { month: 'Jun', income: 11000000, expense: 4200000 },
];

const Cashflow: FC = () => {
    return (
        <div className='p-5 w-full h-[430px] flex flex-col'>
            <style dangerouslySetInnerHTML={{ __html: `
                .recharts-wrapper, .recharts-surface, .recharts-sector, .recharts-rectangle {
                    outline: none !important;
                    box-shadow: none !important;
                    border: none !important;
                    -webkit-tap-highlight-color: transparent;
                }
                *:focus {
                    outline: none !important;
                }
            `}} />

            <div>
                <h3 className='font-semibold tracking-tight text-base-content'>Monthly Cashflow</h3>
            </div>

            <div className='flex justify-between items-center'>
                <p className='text-xs font-semibold text-base-content/50'>Income vs Expenses</p>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2563EB' }}></div>
                        <span className="text-[10px] font-bold opacity-60 uppercase">Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }}></div>
                        <span className="text-[10px] font-bold opacity-60 uppercase">Expense</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full mt-5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                        data={cashflowData} 
                        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                        accessibilityLayer={false}
                    >
                        <CartesianGrid 
                            vertical={false}
                            strokeDasharray="3 3" 
                            stroke="oklch(0% 0 0 / 0.18)" 
                        />
                        <XAxis 
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 12, fontWeight: 600, fill: 'currentColor', fillOpacity: 0.5 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 600, fill: 'currentColor', fillOpacity: 0.5 }}
                            tickFormatter={(value) => `${value / 1000000}M`}
                        />
                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                borderRadius: '16px',
                                border: 'none',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                padding: '12px',
                            }}
                            labelStyle={{ 
                                color: 'black',
                                fontWeight: 'bold', 
                                marginBottom: '4px',
                                fontSize: '12px'
                            }}
                            formatter={(value: any) => [
                                <span className="text-xs font-semibold text-slate-800" key={value}>
                                    Rp {value.toLocaleString('id-ID')}
                                </span>
                            ]}
                        />
                        <Bar 
                            dataKey="income" 
                            fill="#2563EB" 
                            radius={[10, 10, 10, 10]} 
                            barSize={12}
                            isAnimationActive={true}
                        />
                        <Bar 
                            dataKey="expense" 
                            fill="#F59E0B" 
                            radius={[10, 10, 10, 10]} 
                            barSize={12}
                            isAnimationActive={true}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Cashflow;