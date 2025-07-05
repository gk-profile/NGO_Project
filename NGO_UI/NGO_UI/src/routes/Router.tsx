
import Dashboard from "@/pages/dashboard/Dashboard";
import { Login } from "@/pages/Login";
import ValidateUser from "@/pages/ValidateUser";
import { Navigate, useRoutes } from "react-router-dom";

export function RouterProvider() {
    return useRoutes([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: '/',
            element: <ValidateUser />,
            children: [
                { index: true, element: <Navigate to="dashboard" replace /> },
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                }
            ],}
    ])
}