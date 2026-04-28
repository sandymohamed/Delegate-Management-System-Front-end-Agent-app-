/***************************  DEFAULT / AI THEME - PALETTE  ***************************/

// export default function palette() {
//   const textPrimary = '#1A1C1E'; // AI/neutral/10 - on surface
//   const textSecondary = '#42474E'; // AI/neutral variant/30 - on surface variant
//   const divider = '#C2C7CE'; // AI/neutral variant/80 - outline variant
//   const background = '#FFF';

//   const lightPalette = {
//     primary: {
//       lighter: '#CCE5FF', // AI/primary/90 - primary container / primary fixed
//       light: '#92CCFF', // AI/primary/80 - primary fixed dim
//       main: '#006397', // AI/primary/40 - primary
//       dark: '#004B73', // AI/primary/30 - on primary fixed variant
//       darker: '#001D31' // AI/primary/10 - on primary container / on primary fixed
//     },
//     secondary: {
//       lighter: '#D3E4F8', // AI/secondary/90 - secondary container / secondary fixed
//       light: '#B7C8DB', // AI/secondary/80 - secondary fixed dim
//       main: '#4F6070', // AI/secondary/40 - secondary
//       dark: '#384858', // AI/secondary/30 - on secondary fixed variant
//       darker: '#0B1D2B' // AI/secondary/10 - on secondary container / on secondary fixed
//     },
//     grey: {
//       50: '#F9F9FC', // AI/neutral/98 - surface / surface bright
//       100: '#F1F4F9', // AI/neutral/96 - surface container low
//       200: '#EBEEF3', // AI/neutral/94 - surface container
//       300: '#E6E8EE', // AI/neutral/92 - surface container high
//       400: '#E2E2E5', // AI/neutral/90 - surface container highest
//       500: '#D7DADF', // AI/neutral/87 - surface dim
//       600: divider, // AI/neutral variant/80 - outline variant
//       700: '#72787E', // AI/neutral variant/50 - outline
//       800: textSecondary, // AI/neutral variant/30 - on surface variant
//       900: textPrimary // AI/neutral/10 - on surface
//     },
//     text: {
//       primary: textPrimary, // AI/neutral/10 - on surface
//       secondary: textSecondary // AI/neutral variant/30 - on surface variant
//     },
//     divider,
//     background: {
//       default: background
//     }
//   };

//   return {
//     ...lightPalette
//   };
// }


export default function palette(mode = 'light') {
  const textPrimary = mode === 'light' ? '#1e293b' : '#E0E0E0';
  const textSecondary = mode === 'light' ? '#64748b' : '#A0A0A0';
  const divider = mode === 'light' ? '#e2e8f0' : '#42474E';
  const background = mode === 'light' ? '#f8fafc' : '#121212';

  const lightPalette = {
    primary: {
      lighter: '#e0f2fe',
      light: '#7dd3fc',
      main: '#0ea5e9',
      dark: '#0284c7',
      darker: '#0369a1',
    },
    secondary: {
      lighter: '#e9d5ff',
      light: '#c084fc',
      main: '#8b5cf6',
      dark: '#7c3aed',
      darker: '#6d28d9',
    },
    success: { lighter: '#d1fae5', main: '#10b981', dark: '#059669' },
    warning: { lighter: '#fef3c7', main: '#f59e0b', dark: '#d97706' },
    error: { lighter: '#fee2e2', main: '#ef4444', dark: '#dc2626' },
    info: { lighter: '#e0f2fe', main: '#0ea5e9', dark: '#0284c7' },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
      disabled: '#94a3b8',
    },
    divider,
    background: {
      default: background,
      paper: "#ffffff",
    },
  };

  const darkPalette = {
    primary: {
      lighter: '#003352', // Darker version of AI/primary/90
      light: '#004B73', // Darker version of AI/primary/80
      main: '#92CCFF', // Lighter version of AI/primary/40
      dark: '#B7C8DB', // Lighter version of AI/primary/30
      darker: '#D3E4F8' // Lighter version of AI/primary/10
    },
    secondary: {
      lighter: '#0B1D2B', // Darker version of AI/secondary/90
      light: '#384858', // Darker version of AI/secondary/80
      main: '#B7C8DB', // Lighter version of AI/secondary/40
      dark: '#D3E4F8', // Lighter version of AI/secondary/30
      darker: '#E0E0E0' // Lighter version of AI/secondary/10
    },
    grey: {
      50: '#121212', // Dark background
      100: '#1E1E1E', // Dark surface container low
      200: '#242424', // Dark surface container
      300: '#2A2A2A', // Dark surface container high
      400: '#303030', // Dark surface container highest
      500: '#424242', // Dark surface dim
      600: divider, // Dark divider
      700: '#72787E', // Neutral variant/50 (unchanged)
      800: textSecondary, // Dark secondary text
      900: textPrimary // Dark primary text
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
      disabled: "#94a3b8",
    },
    divider,
    background: {
      default: background,
      paper: "#1e1e1e",
    },
    success: { lighter: "#052e16", main: "#34d399", dark: "#6ee7b7" },
    warning: { lighter: "#422006", main: "#fbbf24", dark: "#fcd34d" },
    error: { lighter: "#450a0a", main: "#f87171", dark: "#fca5a5" },
    info: { lighter: "#003352", main: "#7dd3fc", dark: "#bae6fd" },
  };

  return mode === 'light' ? lightPalette : darkPalette;
}