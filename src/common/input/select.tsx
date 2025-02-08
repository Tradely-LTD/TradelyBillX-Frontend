import React, { useState } from "react";
import { Select } from "@radix-ui/themes";

interface SelectComponentProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  fullWidth?: boolean;
  placeholder?: string;
  leftIcon?: React.ReactNode;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  value,
  defaultValue,
  options,
  onChange,
  className = "",
  disabled = false,
  required = false,
  error,
  fullWidth = false,
  placeholder,
  leftIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = {
    position: "relative" as const,
    width: fullWidth ? "100%" : "auto",
  };

  const selectWrapperStyles = {
    display: "flex",
    alignItems: "center",
    position: "relative" as const,
    width: "100%",
    // border: "1px solid",
    borderColor: error ? "#ef4444" : isFocused ? "#2C7743" : "#CBD5E1",
    borderRadius: "6px",
    transition: "all 0.2s ease-in-out",
    backgroundColor: disabled ? "#f3f4f6" : "white",
    marginBottom: "10px",
  };

  const triggerStyles = {
    padding: "0.75rem 1rem",
    paddingLeft: leftIcon ? "2.5rem" : "1rem",
    paddingRight: "1rem",
    fontSize: "1rem",
    width: "100%",
    border: "none",
    outline: "none",
    borderRadius: "6px",
    backgroundColor: "transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 300,
    height: "40px",
    color: value ? "#000" : "#64748b",
  };

  const iconStyles = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.5rem",
    height: "1.5rem",
  };

  const leftIconStyles = {
    ...iconStyles,
    left: "0.75rem",
  };

  const rightIconStyles = {
    ...iconStyles,
    right: "0.75rem",
    pointerEvents: "none",
  };

  const labelStyles = {
    display: "block",
    marginBottom: "0.2rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
  };

  const errorStyles = {
    fontSize: "0.75rem",
    color: "#ef4444",
    marginTop: "0.25rem",
    fontWeight: 500,
  };

  const contentStyles = {
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    maxHeight: "300px",
    overflow: "auto",
  };

  const itemStyles = {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "#374151",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#F3F4F6",
    },
    "&[data-highlighted]": {
      backgroundColor: "#F3F4F6",
    },
  };

  return (
    <div style={containerStyles} className={className}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: "#ef4444" }}> *</span>}
        </label>
      )}

      <div style={selectWrapperStyles}>
        {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}

        <Select.Root
          onValueChange={onChange}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          <Select.Trigger
            style={triggerStyles}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* <Select.Value placeholder={placeholder || "Select option"} /> */}
          </Select.Trigger>

          <Select.Content style={contentStyles} position="popper">
            <Select.Group>
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value} style={itemStyles}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>

      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
};

export default SelectComponent;
