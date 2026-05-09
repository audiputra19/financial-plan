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

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className={clsx(
                            "relative w-full max-w-md overflow-hidden rounded-2xl",
                            "bg-base-100 shadow-2xl border border-base-300"
                        )}
                    >
                        <header className="flex items-center justify-between border-b border-base-300 p-4">
                            <h3 className="font-bold text-lg">{title}</h3>
                            <button 
                                onClick={onClose}
                                className="rounded-full p-1 hover:bg-base-200 transition-colors cursor-pointer"
                            >
                                <IoClose size={24} />
                            </button>
                        </header>

                        <div className="p-5">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;