import { useState, type FC } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { TbMenu2 } from "react-icons/tb";
import clsx from "clsx";
import MobileSidebar from "./MobileSIdebar";

const Navbar: FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <nav 
                className={clsx(
                    "sticky top-0 z-30 flex justify-between p-4 items-center overflow-hidden",
                    "bg-[#2563EB] text-white shadow-lg",
                    "md:bg-base-100/80 md:backdrop-blur-md md:border-b md:border-base-300", 
                    "md:text-base-content md:shadow-none"
                )}
            >
                <div className="absolute inset-0 opacity-7xxxxxxxxxxxxxx0 md:hidden pointer-events-none">
                    <svg 
                        width="100%" 
                        height="100%" 
                        preserveAspectRatio="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.2">
                            
                            {/* Sisi Kiri */}
                            <rect 
                                x="5%" y="20" width="40" height="40" rx="8" fill="none" 
                                stroke="white" strokeWidth="0.5" transform="rotate(15 40 40)" 
                            />
                            <circle cx="12%" cy="70" r="1.5" fill="white" />
                            
                            {/* Area Tengah-Kiri */}
                            <rect 
                                x="25%" y="40" width="25" height="25" rx="6" fill="none" 
                                stroke="white" strokeWidth="0.5" transform="rotate(-10 100 50)" 
                            />
                            <rect 
                                x="30%" y="10" width="10" height="10" rx="2" fill="white" 
                                opacity="0.3" transform="rotate(45 120 15)" 
                            />
                            
                            {/* Area Tengah-Kanan */}
                            <rect 
                                x="55%" y="60" width="35" height="35" rx="10" fill="none" 
                                stroke="white" strokeWidth="0.5" transform="rotate(25 220 80)" 
                            />
                            <circle cx="65%" cy="20" r="2" fill="white" opacity="0.5" />
                            
                            {/* Sisi Kanan */}
                            <rect 
                                x="85%" y="15" width="20" height="20" rx="4" fill="none" 
                                stroke="white" strokeWidth="0.5" transform="rotate(-20 340 25)" 
                            />
                            <rect 
                                x="92%" y="75" width="12" height="12" rx="3" fill="white" 
                                opacity="0.2" transform="rotate(10 370 80)" 
                            />
                            
                            {/* Garis-garis penghubung samar untuk kesan modern */}
                            <line 
                                x1="10%" y1="30" x2="20%" y2="60" stroke="white" strokeWidth="0.2" 
                                opacity="0.3" 
                            />
                            <line 
                                x1="60%" y1="40" x2="80%" y2="20" stroke="white" strokeWidth="0.2" 
                                opacity="0.3" 
                            />
                        </g>
                    </svg>
                </div>
                <div 
                    className={clsx(
                        "absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl",
                        "md:hidden pointer-events-none"
                    )}
                ></div>

                <div className="flex items-center z-10">
                    <div className="font-black text-base flex items-center gap-2 pr-3 group">
                        <div className="relative flex items-center justify-center w-6 h-6 -translate-y-1">
                            <div 
                                className={clsx(
                                    "bg-warning w-2 h-2 rounded-full z-10",
                                    "shadow-[0_0_8px_rgba(255,255,255,0.6)] md:shadow-none"
                                )}
                            ></div>
                            <div 
                                className={clsx(
                                    "absolute w-full h-full border-b-2 border-warning",
                                    "md:border-primary rounded-full"
                                )}
                            ></div>
                        </div>
                        <span className="text-white md:text-base-content tracking-tight font-bold text-lg">
                            Fin<span className="md:text-primary">Flow</span>
                        </span>
                    </div>

                    <div className="hidden md:block h-5 w-[1px] bg-base-300 mx-3 opacity-50"></div>

                    <div className="hidden md:block">
                        <Breadcrumbs />
                    </div>
                </div>

                <div className="flex gap-4 items-center z-10">
                    <div 
                        className={clsx(
                            "bg-white/10 md:bg-base-200 p-1.5 rounded-xl transition-transform",
                            "cursor-pointer hover:bg-base-300/60 active:scale-90"
                        )}
                    >
                        <ThemeSwitcher />
                    </div>
                    
                    <button 
                        className={clsx(
                            "md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-90",
                            "transition-all"
                        )}
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <TbMenu2 size={24}/>
                    </button>
                </div>
            </nav>

            <MobileSidebar 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </>
    )
}

export default Navbar;