import { useEffect, type FC } from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi"; // Pastikan install react-icons
import clsx from "clsx";

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileSidebar: FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <div 
            className={clsx(
                "fixed inset-0 z-[100] md:hidden transition-all duration-300",
                isOpen ? "visible" : "invisible"
            )}
        >
            <div 
                className={clsx(
                    "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
            />

            <aside 
                className={clsx(
                    "absolute top-0 left-0 w-3/4 max-w-xs h-full bg-base-100 shadow-xl",
                    "transition-transform duration-300 ease-in-out p-5",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex justify-between items-center mb-8">
                    <div className="font-black text-base flex items-center gap-2 pr-3">
                        <div 
                            className={clsx(
                                "relative flex items-center justify-center w-5 h-5 -translate-y-0.5"
                            )}
                        >
                            <div className="bg-warning w-2 h-2 rounded-full z-10"></div>
                            <div className="absolute w-full h-full border-b-2 border-primary rounded-full"></div>
                        </div>
                        <span className="text-base-content tracking-tight">
                            Fin<span className="text-primary">Flow</span>
                        </span>
                    </div>
                    <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
                        <HiX size={20} />
                    </button>
                </div>

                <nav className="flex flex-col gap-4 text-sm font-medium">
                    <Link 
                        to="/dashboard" 
                        onClick={onClose} 
                        className="hover:text-primary transition-colors"
                    >Dashboard</Link>
                    <Link 
                        to="/accounts" 
                        onClick={onClose} 
                        className="hover:text-primary transition-colors"
                    >My Wallet</Link>
                    <Link 
                        to="/plannings" 
                        onClick={onClose} 
                        className="hover:text-primary transition-colors"
                    >Budgeting</Link>
                    <div className="h-[1px] bg-base-300 my-2"></div>
                    <Link 
                        to="/settings" 
                        onClick={onClose} 
                        className="hover:text-primary transition-colors"
                    >Settings</Link>
                </nav>
            </aside>
        </div>
    );
};

export default MobileSidebar;