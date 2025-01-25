import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { IconButton, LinearProgress } from "@mui/material";
import { configureLoading } from "../utils/axiosInstance";
import Header from "./Header";
import Navbar from "./Navbar";
import Iconify from "../components/iconify/Iconify";

const MainLayout = () => {
    const [loading, setLoading] = useState(false);
    const [openNav, setOpenNav] = useState(false);


    const handleToggleNav = () => {
        setOpenNav(!openNav);
    };
    const handleCloseNav = () => {
        setOpenNav(false);
    };



    useEffect(() => {
        configureLoading(setLoading);
    }, []);

    return (
        <div>
            {loading && <LinearProgress />}
            <Header />

            <IconButton onClick={handleToggleNav} sx={{ mr: 1, color: 'text.primary' }}>
                <Iconify icon="eva:menu-2-fill" />
            </IconButton>

            <Navbar  openNav={openNav} handleCloseNav={handleCloseNav} />
            <Outlet />
            
            {/* <Footer /> */}

        </div>
    )
}

export default MainLayout