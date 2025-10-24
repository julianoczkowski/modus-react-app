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
  onValueChange?: (event: CustomEvent<boolean>) => void;
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
  onValueChange,
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
    const handleValueChange = (event: Event) => {
      const customEvent = event as CustomEvent<InputEvent>;
      // 🚨 CRITICAL: Handle the value inversion bug
      // The value inversion bug is in the target.value, not the event detail
      const rawValue = (customEvent.target as HTMLModusWcCheckboxElement).value;
      const actualValue = !rawValue; // ✅ CORRECT: Invert the value

      // Create a new event with the corrected value
      const correctedEvent = new CustomEvent("valueChange", {
        detail: actualValue,
        bubbles: true,
        cancelable: true,
      });

      onValueChange?.(correctedEvent);
    };

    if (onInputChange)
      checkbox.addEventListener("inputChange", handleInputChange);
    if (onInputFocus) checkbox.addEventListener("inputFocus", handleInputFocus);
    if (onInputBlur) checkbox.addEventListener("inputBlur", handleInputBlur);
    if (onValueChange)
      checkbox.addEventListener("inputChange", handleValueChange);

    return () => {
      if (onInputChange)
        checkbox.removeEventListener("inputChange", handleInputChange);
      if (onInputFocus)
        checkbox.removeEventListener("inputFocus", handleInputFocus);
      if (onInputBlur)
        checkbox.removeEventListener("inputBlur", handleInputBlur);
      if (onValueChange)
        checkbox.removeEventListener("inputChange", handleValueChange);
    };
  }, [onInputChange, onInputFocus, onInputBlur, onValueChange]);

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
