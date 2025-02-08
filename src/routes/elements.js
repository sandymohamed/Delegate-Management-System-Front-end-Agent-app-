import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";

const Loadable =  (Component) => (props) => (
    <Suspense fallback={<LinearProgress />}>
        <Component {...props} />
    </Suspense>
)

// --------------------------------------
export const Login = Loadable(lazy(() => import('../pages/Login')));
export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
export const VanTrack = Loadable(lazy(() => import('../pages/VanTrack')));
export const CreateInvoice = Loadable(lazy(() => import('../pages/CreateInvoice')));
export const AgentInvoices = Loadable(lazy(() => import('../pages/AgentInvoices')));
export const InvoiceDetails = Loadable(lazy(() => import('../pages/InvoiceDetails')));
export const CustomersList = Loadable(lazy(() => import('../pages/CustomersList')));
export const CustomerInvoices = Loadable(lazy(() => import('../pages/CustomerInvoices')));
export const CreateCustomer = Loadable(lazy(() => import('../pages/CreateCustomer')));
export const ProductsList = Loadable(lazy(() => import('../pages/ProductsList')));
export const AddPayment = Loadable(lazy(() => import('../pages/AddPayment')));