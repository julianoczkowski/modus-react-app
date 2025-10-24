import { useEffect, useRef } from "react";
import { ModusWcCheckbox } from "@trimble-oss/moduswebcomponents-react";

export interface ModusCheckboxProps {
  value?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  name?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  inputId?: string;
  inputTabIndex?: number;
  customClass?: string;
  "aria-label"?: string;
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export default function ModusCheckbox({
  value = false,
  disabled = false,
  indeterminate = false,
  label,
  name = "",
  required = false,
  size = "md",
  inputId,
  inputTabIndex,
  customClass,
  "aria-label": ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusCheckboxProps) {
  const checkboxRef = useRef<HTMLModusWcCheckboxElement>(null);

  useEffect(() => {
    const checkbox = checkboxRef.current;
    if (!checkbox) return;

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange)
      checkbox.addEventListener("inputChange", handleInputChange);
    if (onInputFocus) checkbox.addEventListener("inputFocus", handleInputFocus);
    if (onInputBlur) checkbox.addEventListener("inputBlur", handleInputBlur);

    return () => {
      if (onInputChange)
        checkbox.removeEventListener("inputChange", handleInputChange);
      if (onInputFocus)
        checkbox.removeEventListener("inputFocus", handleInputFocus);
      if (onInputBlur)
        checkbox.removeEventListener("inputBlur", handleInputBlur);
    };
  }, [onInputChange, onInputFocus, onInputBlur]);

  return (
    <ModusWcCheckbox
      ref={checkboxRef}
      value={value}
      disabled={disabled}
      indeterminate={indeterminate}
      label={label}
      name={name}
      required={required}
      size={size}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
