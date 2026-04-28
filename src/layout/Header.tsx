import React, { useEffect } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import AccountPopover from "./AccountPopover";
import { useAuth } from "../context/AuthContext";
import { useThemeMode } from "../context/ThemeModeContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchVan } from "../redux/slices/vanSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Van } from "../types/Van";
import Iconify from "../components/iconify/Iconify";
// ----------------------------------------------------------------------------
const Header: React.FC = () => {
  const { user } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const dispatch = useDispatch<AppDispatch>();

  const vanDetails: Van | null = useSelector(
    (state: RootState) => state.van.vanDetails
  );

  useEffect(() => {
    if (user) dispatch(fetchVan(user?.id));
  }, [dispatch, user?.id]);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      alignContent="center"
      justifyContent="space-between"
      sx={{
        backgroundColor: "secondary.main",
        p: { xs: 1.5, sm: 2 },
        color: "white",
        flexWrap: "wrap",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
        Logo goes here!
      </Typography>
      <Typography
        variant="body2"
        sx={{
          display: { xs: "none", sm: "block" },
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
        }}
      >
        {vanDetails?.name}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <IconButton
          size="small"
          onClick={toggleMode}
          sx={{ color: "white" }}
          aria-label={mode === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
        >
          <Iconify icon={mode === "dark" ? "eva:sun-fill" : "eva:moon-fill"} />
        </IconButton>
        <AccountPopover />
      </Stack>
    </Stack>
  );
};

export default Header;
