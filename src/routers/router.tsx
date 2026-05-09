import { type FC } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AccountLayout from "../layouts/accountLayout";
import DashboardLayout from "../layouts/dashboardLayout";
import MainLayout from "../layouts/mainLayout";
import PlanningLayout from "../layouts/planningLayout";
import TransactionLayout from "../layouts/transactionLayout";
import BalanceTransfer from "../pages/accounts/BalanceTransfer";
import MyWallets from "../pages/accounts/MyWallets";
import Overview from "../pages/dashboard/Overview";
import Budgeting from "../pages/planning/Budgeting";
import FinancialGoals from "../pages/planning/FinancialGoals";
import QuickAdd from "../pages/transactions/QuickAdd";
import ListTransaction from "../pages/transactions/ListTransaction";

const Router: FC = () => {
    const routes = [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { index: true, element: <Navigate to="/dashboard" replace /> },
                {
                    path: 'dashboard',
                    element: <DashboardLayout />,
                    children: [
                        { index: true, element: <Overview /> },
                    ]
                },
                {
                    path: 'accounts',
                    element: <AccountLayout />,
                    children: [
                        { index: true, element: <MyWallets /> },
                        { path: 'balance_transfer', element: <BalanceTransfer /> }
                    ]
                },
                {
                    path: 'transactions',
                    element: <TransactionLayout />,
                    children: [
                        { index: true, element: <QuickAdd /> },
                        { path: 'list_transaction', element: <ListTransaction /> }
                    ]
                },
                {
                    path: 'plannings',
                    element: <PlanningLayout />,
                    children: [
                        { index: true, element: <Budgeting /> },
                        { path: 'financial_goals', element: <FinancialGoals /> }
                    ]
                }
            ]
        }
    ];

    const element = useRoutes(routes);

    return element;
}

export default Router;