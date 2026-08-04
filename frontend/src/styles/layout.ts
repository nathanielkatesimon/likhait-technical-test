import { COLORS } from "../constants/colors";

const pageStyle: React.CSSProperties = {
  padding: "48px 64px",
  minHeight: "100vh",
  background: COLORS.secondary.s01,
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  justifyContent: "space-between",
};

const leftHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "40px",
  fontWeight: 700,
  color: COLORS.secondary.s10,
  margin: 0,
  flexShrink: 0,
};

const loadingStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "48px",
  fontSize: "18px",
  color: COLORS.secondary.s08,
};

export { pageStyle, headerStyle, leftHeaderStyle, titleStyle, loadingStyle };