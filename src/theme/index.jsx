import PropTypes from "prop-types";

import { useMemo } from "react";
import { CacheProvider } from "@emotion/react";

// @mui
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
// @project
import { ThemeModeProvider, useThemeMode } from "../context/ThemeModeContext";
import palette from "./palette";
import componentsOverride from "./overrides";
import typography from "./typography";

/*************************** DEFAULT / AI THEME - MAIN ***************************/
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin, prefixer],
});

// Mobile-first breakpoints: base = xs (0), then sm, md, lg, xl
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// ----------------------------------------------------------------------
function ThemeCustomizationInner({ children }) {
  const { mode } = useThemeMode();

  const themePalette = useMemo(() => palette(mode), [mode]);

  let themeDefault = createTheme({
    direction: "rtl",
    spacing: 4,
    breakpoints,
    palette: {
      mode,
      ...themePalette,
    },
  });

  let theme = createTheme({
    ...themeDefault,
    typography: typography(themeDefault),
  });

  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}

ThemeCustomizationInner.propTypes = { children: PropTypes.any };

export default function ThemeCustomization({ children }) {
  return (
    <ThemeModeProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeCustomizationInner>{children}</ThemeCustomizationInner>
      </CacheProvider>
    </ThemeModeProvider>
  );
}

ThemeCustomization.propTypes = { children: PropTypes.any };
