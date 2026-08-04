import { COLORS } from "../constants/colors";

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: COLORS.background.main,
  borderRadius: "0.5rem",
  overflow: "hidden",
  border: `1px solid ${COLORS.border}`,
};

const theadStyle: React.CSSProperties = {
  backgroundColor: COLORS.background.card,
};

const thStyle: React.CSSProperties = {
  padding: "0.75rem",
  textAlign: "left",
  fontWeight: 600,
  color: COLORS.text.primary,
  borderBottom: `2px solid ${COLORS.border}`,
};

const tdStyle: React.CSSProperties = {
  padding: "0.75rem",
  borderBottom: `1px solid ${COLORS.border}`,
  color: COLORS.text.primary,
};

const emptyStyle: React.CSSProperties = {
  padding: "2rem",
  textAlign: "center",
  color: COLORS.text.secondary,
};

const actionButtonsStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
};

export { tableStyle, theadStyle, thStyle, tdStyle, actionButtonsStyle, emptyStyle };