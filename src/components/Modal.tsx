import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, type FC, type ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <div className="flex min-h-full items-start justify-center p-4 md:p-10">
                        
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className={clsx(
                                "relative w-full max-w-md rounded-2xl bg-base-100 shadow-2xl border border-base-300",
                                "flex flex-col h-auto my-auto"
                            )}
                        >
                            <header className="flex items-center justify-between border-b border-base-300 p-6">
                                <h3 className="font-black text-xl tracking-tight">{title}</h3>
                                <button 
                                    onClick={onClose}
                                    className="rounded-full p-2 hover:bg-base-200 transition-colors cursor-pointer"
                                >
                                    <IoClose size={24} />
                                </button>
                            </header>

                            <div className="p-6">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;