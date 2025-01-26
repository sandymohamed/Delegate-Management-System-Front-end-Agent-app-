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