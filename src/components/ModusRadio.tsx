

import { useEffect, useRef } from "react";
import { ModusWcRadio } from "@trimble-oss/moduswebcomponents-react";

export interface ModusRadioProps {
  label?: string;
  value?: boolean;
  name?: string;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  disabled?: boolean;
  inputId?: string;
  inputTabIndex?: number;
  customClass?: string;
  "aria-label"?: string;
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export default function ModusRadio({
  label,
  value = false,
  name = "",
  size = "md",
  required = false,
  disabled = false,
  inputId,
  inputTabIndex,
  customClass,
  "aria-label": ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusRadioProps) {
  const radioRef = useRef<HTMLModusWcRadioElement>(null);

  useEffect(() => {
    const radio = radioRef.current;
    if (!radio) {
      return;
    }

    const handleChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange) {
      radio.addEventListener("inputChange", handleChange);
    }
    if (onInputFocus) {
      radio.addEventListener("inputFocus", handleFocus);
    }
    if (onInputBlur) {
      radio.addEventListener("inputBlur", handleBlur);
    }

    return () => {
      if (onInputChange) {
        radio.removeEventListener("inputChange", handleChange);
      }
      if (onInputFocus) {
        radio.removeEventListener("inputFocus", handleFocus);
      }
      if (onInputBlur) {
        radio.removeEventListener("inputBlur", handleBlur);
      }
    };
  }, [onInputChange, onInputFocus, onInputBlur]);

  return (
    <ModusWcRadio
      ref={radioRef}
      label={label}
      value={value}
      name={name}
      size={size}
      required={required}
      disabled={disabled}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
