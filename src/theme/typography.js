// @project - Tajawal: Arabic-friendly, clean and modern. Mobile-first.
const fontFamily = '"Tajawal", "Segoe UI", Roboto, sans-serif';

/***************************  MODERN DASHBOARD TYPOGRAPHY (MOBILE-FIRST)  ***************************/

export default function typography(theme) {
  return {
    fontFamily,

    // heading - large: mobile base, then sm, md
    h1: {
      fontWeight: 400,
      fontSize: 32,
      lineHeight: 1.222,
      letterSpacing: -0.25,
      [theme.breakpoints.up("sm")]: {
        fontSize: 45,
        lineHeight: 1.156,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 57,
        lineHeight: 1.123,
      },
    },

    h2: {
      fontWeight: 400,
      fontSize: 24,
      lineHeight: 1.333,
      letterSpacing: 0,
      [theme.breakpoints.up("sm")]: {
        fontSize: 36,
        lineHeight: 1.222,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 45,
        lineHeight: 1.156,
      },
    },

    h3: {
      fontWeight: 400,
      fontSize: 20,
      lineHeight: 1.4,
      letterSpacing: 0,
      [theme.breakpoints.up("sm")]: {
        fontSize: 24,
        lineHeight: 1.333,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 28,
        lineHeight: 1.286,
      },
    },

    h4: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0,
      [theme.breakpoints.up("sm")]: {
        fontSize: 20,
        lineHeight: 1.4,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 24,
        lineHeight: 1.333,
      },
    },

    h5: {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0.15,
      [theme.breakpoints.up("md")]: {
        fontSize: 22,
        lineHeight: 1.273,
        letterSpacing: 0,
      },
    },

    h6: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0.5,
      [theme.breakpoints.up("md")]: {
        fontSize: 22,
        lineHeight: 1.364,
        letterSpacing: 0,
      },
    },

    body1: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.429,
      letterSpacing: 0.25,
      [theme.breakpoints.up("md")]: {
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 0.5,
      },
    },

    body2: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 1.5,
      letterSpacing: 0.25,
      [theme.breakpoints.up("md")]: {
        fontSize: 14,
        lineHeight: 1.429,
      },
    },

    subtitle1: {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 1.429,
      letterSpacing: 0.1,
      [theme.breakpoints.up("md")]: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 0.15,
      },
    },

    subtitle2: {
      fontWeight: 600,
      fontSize: 12,
      lineHeight: 1.5,
      letterSpacing: 0.1,
      [theme.breakpoints.up("md")]: {
        fontSize: 14,
        lineHeight: 1.429,
      },
    },

    caption: {
      fontWeight: 600,
      fontSize: 12,
      lineHeight: 1.333,
      letterSpacing: 0,
    },

    caption1: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0.5,
    },

    caption2: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1.429,
      letterSpacing: 0.1,
    },

    button: {
      textTransform: "capitalize",
    },
  };
}
