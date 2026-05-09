import type { FC } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs: FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const routeLabels: Record<string, string> = {
        "accounts": "My Wallets",
        "dashboard": "Overview",
        "plannings": "Budgeting",
        "transactions": "Quick Add",
    };

    return (
        <nav className="flex text-xs text-base-content/50 items-center gap-2">
            <Link 
                to="/dashboard" 
                className="hover:text-primary flex items-center gap-1 font-black"
            >
                <span>Home</span>
            </Link>

            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                const displayName = routeLabels[value] || value
                    .replace(/_/g, " ")
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase());

                return (
                    <div key={to} className="flex items-center gap-2 font-black">
                        <MdOutlineArrowForwardIos size={12} />
                        {last ? (
                            <span className="text-base-content/90">
                                {displayName}
                            </span>
                        ) : (
                            <Link 
                                to={to} 
                                className="hover:text-primary transition-colors"
                            >
                                {displayName}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;