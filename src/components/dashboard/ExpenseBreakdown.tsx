import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Food', value: 2500000 },
    { name: 'Self Reward', value: 1500000 },
    { name: 'Transport', value: 1200000 },
    { name: 'Subs', value: 850000 },
    { name: 'Rent', value: 700000 },
    { name: 'Utilities', value: 600000 },
    { name: 'Health', value: 500000 },
    { name: 'Gift', value: 450000 },
    { name: 'Hobby', value: 400000 },
    { name: 'Others', value: 300000 },
];

const ExpenseBreakdown = () => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    const getDynamicColor = (index: number) => {
        if (index === 0) return '#2563EB';

        const step = (index % 10) * 5; 
        const lightness = 40 + step;

        const chroma = index > 5 ? 0.03 : 0.05;
        
        return `oklch(${lightness}% ${chroma} 290)`;
    };

    return (
        <div className='p-5 w-full h-[430px] flex flex-col'>
            <style dangerouslySetInnerHTML={{ __html: `
                .recharts-surface:focus { outline: none !important; }
                .recharts-sector:focus { outline: none !important; }
                .recharts-wrapper:focus { outline: none !important; }
            `}} />

            <div>
                <h3 className='font-semibold tracking-tight text-base-content'>Expense Breakdown</h3>
            </div>

            <div className='flex justify-between items-center'>
                <p className='text-xs font-semibold text-base-content/50'>Total Expense</p>
                <p className='text-sm font-black text-primary'>Rp {total.toLocaleString('id-ID')}</p>
            </div>
            
            <div className='flex-1 w-full mt-5'>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                        <Pie
                            data={data}
                            cx='50%'
                            cy='50%'
                            innerRadius={88} 
                            outerRadius={118}
                            paddingAngle={4} 
                            cornerRadius={4} 
                            dataKey='value'
                            stroke='none'
                            style={{ outline: 'none' }}
                        >
                            {data.map((_, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={getDynamicColor(index)} 
                                />
                            ))}
                        </Pie>
                        
                        <Tooltip 
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ 
                                borderRadius: '8px', 
                                border: 'none', 
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fff',
                                fontSize: '12px'
                            }}
                            itemStyle={{ padding: '0px' }}
                            formatter={(value: any) => (
                                <span className='font-semibold text-slate-800'>
                                Rp {value?.toLocaleString('id-ID')}
                                </span>
                            )}
                        />
                        
                        <Legend 
                            verticalAlign='bottom' 
                            align='center' 
                            iconType='circle' 
                            iconSize={8}
                            wrapperStyle={{ fontSize: '11px', paddingTop: '20px', fontWeight: 500 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpenseBreakdown;