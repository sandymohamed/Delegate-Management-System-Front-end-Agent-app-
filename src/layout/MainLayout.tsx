import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, IconButton, LinearProgress, Stack } from "@mui/material";
import { configureLoading } from "../utils/axiosInstance";
import Header from "./Header";
import Navbar from "./Navbar";
import Iconify from "../components/iconify/Iconify";

const MainLayout: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openNav, setOpenNav] = useState<boolean>(false);

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
    <Stack
      direction="column"
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      {loading && <LinearProgress />}
      <Header />
      <Box
        sx={{
          alignContent: "start",
          justifyContent: "start",
          px: { xs: 1, sm: 2 },
          py: 0.5,
        }}
      >
        <IconButton
          onClick={handleToggleNav}
          sx={{ mr: 1, color: "secondary.dark", p: { xs: 1, sm: 1.5 } }}
          aria-label="القائمة"
          size="medium"
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      </Box>

      <Navbar openNav={openNav} handleCloseNav={handleCloseNav} />
      <Box component="main" sx={{ flex: 1, px: { xs: 1.5, sm: 2 }, pb: 2 }}>
        <Outlet />
      </Box>

      {/* <Footer /> */}
    </Stack>
  );
};

export default MainLayout;
