import * as React from "react";
import { Navigate, useRoutes } from "react-router";
import { Login, Dashboard, VanTrack, CreateInvoice, AgentInvoices, 
    InvoiceDetails, CustomersList, CustomerInvoices, CreateCustomer, ProductsList, 
    AddPayment
} from './elements';
import ProtectedRoute from "./ProtectedRoute";
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
                { path: "/create-payment/:invoice_id", element: <AddPayment /> },
                { path: "/products", 
                    element: <ProductsList /> ,
                     children: [
                    { path: "/products/create-product", element: <ProductsList /> },
                    { path: "/products/edit-product", element: <ProductsList /> },
                ]},

            ],
        },
        { path: "*", element: <>Page 404</> },
    ]);
}
  