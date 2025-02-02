import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, IconButton, LinearProgress, Stack } from "@mui/material";
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
        <Stack direction="column" sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
            {loading && <LinearProgress />}
            <Header />
            <Box alignContent={'start'} justifyContent={'satrt'}>

                <IconButton onClick={handleToggleNav} sx={{ mr: 1, color: 'secondary.dark' }}>
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>
            </Box>

            <Navbar openNav={openNav} handleCloseNav={handleCloseNav} />
            <Outlet />

            {/* <Footer /> */}

        </Stack>
    )
}

export default MainLayout