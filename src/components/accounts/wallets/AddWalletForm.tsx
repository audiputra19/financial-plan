import clsx from "clsx";
import { type Dispatch, type FC, type SetStateAction } from "react";
import Modal from "../../Modal";

interface FormProps {
    accountName: string;
    accountType: string;
    currentBalance: number;
    color: string;
}

interface AddWalletFormProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>;
    form: FormProps;
    setForm: Dispatch<SetStateAction<FormProps>>;
}

export const AddWalletForm: FC<AddWalletFormProps> = ({ 
    isAddModalOpen, setIsAddModalOpen, form, setForm 
}) => {
    const presetColors = [
        "#FE9A37", "#00AED6", "#4C2A86", "#118EEA", 
        "#0060AF", "#FDB913", "#FF6600", "#085B94",
    ];

    const extraPalettes = [
        "#F43F5E", "#EC4899", "#A855F7", "#6366F1",
        "#3B82F6", "#14B8A6", "#10B981", "#84CC16", 
        "#64748B", "#4B5563",
    ];

    return (
        <div>
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false)
                    setForm({
                        accountName: "",
                        accountType: "",
                        currentBalance: 0,
                        color: "#FE9A37"
                    })
                }}
                title="Form Add Wallet"
            >
                <div className="flex flex-col gap-5">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Account Name" 
                            className={clsx(
                                "input border w-full border-base-300 rounded-2xl bg-base-200",
                                "select-primary"
                            )}  
                            value={form.accountName}
                            onChange={(e) => 
                                setForm(prev => ({ ...prev, 
                                    accountName: e.target.value
                                }))
                            }
                        />
                    </div>
                    <div>
                        <select 
                            className={clsx(
                                "select border w-full border-base-300 rounded-2xl bg-base-200",
                                "select-primary"
                            )}
                            value={form.accountType}
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    accountType: e.target.value
                                }))
                            }
                        >
                            <option value="" disabled>Account Type</option>
                            <option value="Bank">Bank</option>
                            <option value="E-Wallet">E-Wallet</option>
                            <option value="Cash">Cash</option>
                            <option value="Investment">Investment</option>
                        </select>
                    </div>
                    <div>
                        <label 
                            className={clsx(
                                "input border w-full border-base-300 rounded-2xl bg-base-200",
                                "select-primary"
                            )}
                        >
                            IDR
                            <input 
                                type="number" 
                                placeholder="Current Balance" 
                                className="input outline-none ring-0"
                                value={form.currentBalance === 0 ? "" : form.currentBalance}
                                onChange={(e) => 
                                    setForm(prev => ({
                                        ...prev, 
                                        currentBalance: Number(e.target.value)
                                    }))
                                }
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        <div className="flex flex-col gap-3">
                            <label className="text-xs text-base-content/50">
                                Brand Color (ShopeePay, Mandiri, etc)
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {presetColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => 
                                            setForm(prev => ({
                                                ...prev, 
                                                color: color
                                            }))
                                        }
                                        className={clsx(
                                            "w-8 h-8 rounded-full transition-all duration-200 cursor-pointer",
                                            "hover:scale-110 active:scale-95",
                                            form.color === color 
                                                ? "ring-2 ring-offset-2 ring-base-content scale-110" 
                                                : ""
                                        )}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-xs text-base-content/50">
                                Solid Palette
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {extraPalettes.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        value={form.color}
                                        onClick={() => 
                                            setForm(prev => ({
                                                ...prev, 
                                                color: color
                                            }))
                                        }
                                        className={clsx(
                                            "w-8 h-8 rounded-full transition-all duration-200", 
                                            "cursor-pointer",
                                            "hover:scale-110 active:scale-95",
                                            form.color === color 
                                                ? "ring-2 ring-offset-2 ring-base-content scale-110" 
                                                : "shadow-inner"
                                        )}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        className={clsx(
                            "mt-5 w-full py-4 rounded-2xl text-white flex justify-center items-center gap-2",
                            "bg-warning hover:bg-warning/90 font-black text-warning-content duration-500",
                            "cursor-pointer hover:-translate-y-1 active:scale-98"
                        )}
                    >
                        Create Wallet
                    </button>
                </div>
            </Modal>
        </div>
    )
}