

import { useEffect, useRef } from "react";
import { ModusWcDate } from "@trimble-oss/moduswebcomponents-react";

export interface InputFeedbackProp {
  level: "error" | "info" | "success" | "warning";
  message?: string;
}

export interface ModusDateProps {
  value?: string; // Format: YYYY-MM-DD
  bordered?: boolean;
  disabled?: boolean;
  feedback?: InputFeedbackProp;
  inputId?: string;
  inputTabIndex?: number;
  label?: string;
  max?: string; // Format: YYYY-MM-DD
  min?: string; // Format: YYYY-MM-DD
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  customClass?: string;
  "aria-label"?: string;
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export default function ModusDate({
  value = "",
  bordered = true,
  disabled = false,
  feedback,
  inputId,
  inputTabIndex,
  label,
  max,
  min,
  name = "",
  readOnly = false,
  required = false,
  size = "md",
  customClass,
  "aria-label": ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusDateProps) {
  const dateRef = useRef<HTMLModusWcDateElement>(null);

  useEffect(() => {
    const date = dateRef.current;
    if (!date) return;

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange) date.addEventListener("inputChange", handleInputChange);
    if (onInputFocus) date.addEventListener("inputFocus", handleInputFocus);
    if (onInputBlur) date.addEventListener("inputBlur", handleInputBlur);

    return () => {
      if (onInputChange)
        date.removeEventListener("inputChange", handleInputChange);
      if (onInputFocus)
        date.removeEventListener("inputFocus", handleInputFocus);
      if (onInputBlur) date.removeEventListener("inputBlur", handleInputBlur);
    };
  }, [onInputChange, onInputFocus, onInputBlur]);

  return (
    <ModusWcDate
      ref={dateRef}
      value={value}
      bordered={bordered}
      disabled={disabled}
      feedback={feedback}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      label={label}
      max={max}
      min={min}
      name={name}
      readOnly={readOnly}
      required={required}
      size={size}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
