import * as React from "react";
import { Navigate, useRoutes } from "react-router";
import { Login, Dashboard, VanTrack, CreateInvoice, AgentInvoices, InvoiceDetails, CustomersList, CustomerInvoices, CreateCustomer } from './elements';
import ProtectedRoute from "./ProtectedRoute";
import { Typography } from "@mui/material";
import MainLayout from "../layout/MainLayout";

export default function Router() {
    return useRoutes([
        { path: "/login", element: <Login /> },
        {
            path: "/",
            element: (<ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>),
            children: [
                { element: <Navigate to="/dashboard" replace />, index: true },
                { path: "/dashboard", element: <Dashboard /> },
                { path: "/van", element: <VanTrack /> },
                { path: "/create-invoice", element: <CreateInvoice /> },
                { path: "/invoices", element: <AgentInvoices /> },
                { path: "/invoice/:id", element: <InvoiceDetails /> },
                { path: "/customers", element: <CustomersList /> },
                { path: "/customer-invoices/:id", element: <CustomerInvoices /> },
                { path: "/create-customer", element: <CreateCustomer /> },
            ],
        },
        { path: "*", element: <>Page 404</> },
    ]);
}



// import {
//     type RouteConfig,
//     route,
//     index,
//   } from "@react-router/dev/routes";
  
//   export default [
//     // parent route
//     route("dashboard", "./dashboard.tsx", [
//       // child routes
//       index("./home.tsx"),
//       route("settings", "./settings.tsx"),
//     ]),
//   ] satisfies RouteConfig;
  