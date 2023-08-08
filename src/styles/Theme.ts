export const theme = {
  name: "dark",
  colors: {
    bodyBg: "linear-gradient(180deg, #D0D0D0, #F0F0F0)",
    primaryBg: "#E6E6E6",
    secondaryBg: "#F0F0F0",
    thirdBg: "#D0D0D0",
    accent: "#0077FF",
    accent2: "#005FCC",
    primaryFont: "#555",
    secondaryFont: "#fff",
    shadowPrimary: "0 0 15px 2px rgba(22, 24, 40, 0.2)",
  },
  media: {
    tablet: "screen and (max-width: 768px)",
    mobile: "screen and (max-width: 576px)",
  },
};

export const lightTheme = {
  name: "light",
  colors: {
    bodyBg: "linear-gradient(180deg, #D0D0D0, #F0F0F0)",
    primaryBg: "#E6E6E6",
    secondaryBg: "#F0F0F0",
    thirdBg: "#D0D0D0",
    accent: "#0077FF",
    accent2: "#005FCC",
    primaryFont: "#555555",
    secondaryFont: "#808080",
    shadowPrimary: "0 0 15px 2px rgba(22, 24, 40, 0.2)",
  },
  media: {
    tablet: "screen and (max-width: 768px)",
    mobile: "screen and (max-width: 576px)",
  },
};

export type ThemeT = typeof theme;
