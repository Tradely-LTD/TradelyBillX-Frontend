import React, { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react"; // Import from iconsax

interface InputProps {
  type?:
    | "text"
    | "password"
    | "email"
    | "datetime-local"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  classNameWrapper?: string;
  error?: string;
  label?: string;
  fullWidth?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rest?: any;
  ref?: any;
}

function Input({
  type = "text",
  placeholder = "",
  value,
  classNameWrapper,
  onChange,
  name,
  disabled = false,
  required = false,
  className = "",
  error,
  label,
  fullWidth = false,
  onBlur,
  onFocus,
  maxLength,
  min,
  max,
  leftIcon,
  rightIcon,
  ref,
  rest,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const containerStyles = {
    position: "relative" as const,
    width: fullWidth ? "100%" : "auto",
  };

  const inputWrapperStyles = {
    display: "flex",
    alignItems: "center",
    position: "relative" as const,
    width: "100%",
    border: "1px solid",
    borderColor: error ? "#ef4444" : isFocused ? "#2C7743" : "#CBD5E1",
    borderRadius: "6px",
    transition: "all 0.2s ease-in-out",
    backgroundColor: disabled ? "#f3f4f6" : "white",
    marginBottom: "10px",
  };

  const inputStyles = {
    padding: "0.75rem 1rem",
    paddingLeft: leftIcon ? "2.5rem" : "1rem",
    paddingRight: type === "password" || rightIcon ? "2.5rem" : "1rem",
    fontSize: "1rem",
    width: "100%",
    border: "none",
    outline: "none",
    borderRadius: "6px",
    backgroundColor: "transparent",
    cursor: disabled ? "not-allowed" : "text",
    fontWeight: 300,
    height: "40px",
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
    cursor: "pointer",
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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: "#ef4444" }}> *</span>}
        </label>
      )}
      <div style={containerStyles}>
        <div style={inputWrapperStyles} className={classNameWrapper}>
          {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}
          <input
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            disabled={disabled}
            required={required}
            className={className}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            min={min}
            max={max}
            ref={ref}
            style={inputStyles}
            {...rest}
          />
          {type === "password" ? (
            <span
              style={rightIconStyles}
              onClick={!disabled ? togglePasswordVisibility : undefined}
            >
              {showPassword ? (
                <EyeSlash size="20" color="#64748b" variant="Bold" />
              ) : (
                <Eye size="20" color="#64748b" variant="Bold" />
              )}
            </span>
          ) : (
            rightIcon && <span style={rightIconStyles}>{rightIcon}</span>
          )}
        </div>
      </div>
      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
}

export default Input;
