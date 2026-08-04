/**
 * Reusable GridSelect component
 */

import React from "react";
import { COLORS } from "../constants/colors";
import { Button } from "./Button";

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string }>;
}

export function GridSelect({
  label,
  error,
  fullWidth = false,
  options,
  ...props
}: SelectBoxProps) {
  const [showOptions, setShowOptions] = React.useState(false);

  const handleOptionClick = (value: string) => {
    props.onChange?.({ target: { value } } as React.ChangeEvent<HTMLSelectElement>);
    setShowOptions(false);
  }

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: fullWidth ? "100%" : "auto",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: COLORS.text.primary,
  };

  const selectStyle: React.CSSProperties = {
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    border: `1px solid ${error ? COLORS.danger : COLORS.border}`,
    borderRadius: "0.375rem",
    outline: "none",
    transition: "border-color 0.2s",
    backgroundColor: COLORS.background.main,
    color: COLORS.text.primary,
    cursor: "pointer",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: COLORS.danger,
    marginTop: "-0.25rem",
  };

  return (
    <div style={{...containerStyle, position: "relative"}}>
      {label && <label style={labelStyle}>{label}</label>}
      <Button type="button" style={{...selectStyle, textAlign: "left"}} onClick={() => setShowOptions(!showOptions)}>
        {props.value}
      </Button>
      {showOptions && (
        <div style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(25px, 1fr))", 
          gap: "0.5rem",
          width: "452px",
          position: "absolute",
          backgroundColor: COLORS.background.main,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "0.375rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          bottom: "45px",
          padding: "0.5rem",
        }}>
          {options.map((option) => (
            <div 
              key={option.value}
              onClick={() => {
                handleOptionClick(option.value);
              }}
              onMouseEnter={(e) => {
                  e.currentTarget.style.background = COLORS.primary.p02;
              }}
              onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
              }}
              style={{
                cursor: "pointer",
                textAlign: "center"
            }}>
              {option.label}
            </div>
          ))}
        </div>
      )}
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}
