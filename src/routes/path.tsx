import * as React from "react";
import { Navigate, useRoutes } from "react-router";
import {
  Login,
  Dashboard,
  VanTrack,
  CreateInvoice,
  AgentInvoices,
  InvoiceDetails,
  CustomersList,
  CustomerInvoices,
  CreateCustomer,
  ProductsList,
  AddPayment,
  CreateProduct,
} from "./elements";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const Router: React.FC = () => {
  return useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
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
        {
          path: "/products",
          // element: <ProductsList />,
          children: [
            { element: <Navigate to="/products/list" replace />, index: true },
            { path: "/products/list", element: <ProductsList /> },
            { path: "/products/create-product", element: <CreateProduct /> },
            { path: "/products/edit-product", element: <CreateProduct /> },
          ],
        },
      ],
    },
    { path: "*", element: <>Page 404</> },
  ]);
};

export default Router;
