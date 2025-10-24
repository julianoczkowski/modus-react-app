

import { useEffect, useRef } from "react";
import { ModusWcSwitch } from "@trimble-oss/moduswebcomponents-react";

type SwitchSize = "sm" | "md" | "lg";

export interface ModusSwitchProps {
  value?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  required?: boolean;
  size?: SwitchSize;
  label?: string;
  name?: string;
  inputId?: string;
  inputTabIndex?: number;
  customClass?: string;
  "aria-label"?: string;
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export default function ModusSwitch({
  value = false,
  disabled = false,
  indeterminate = false,
  required = false,
  size = "md",
  label,
  name,
  inputId,
  inputTabIndex,
  customClass,
  "aria-label": ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusSwitchProps) {
  const switchRef = useRef<HTMLModusWcSwitchElement>(null);

  useEffect(() => {
    const switchElement = switchRef.current;
    if (!switchElement) {
      return;
    }

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };
    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };
    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange) {
      switchElement.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      switchElement.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      switchElement.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      if (onInputChange) {
        switchElement.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        switchElement.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        switchElement.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputBlur, onInputChange, onInputFocus]);

  useEffect(() => {
    const switchElement = switchRef.current;
    if (!switchElement) {
      return;
    }

    switchElement.value = value;
    switchElement.indeterminate = indeterminate;
  }, [indeterminate, value]);

  return (
    <ModusWcSwitch
      ref={switchRef}
      value={value}
      disabled={disabled}
      indeterminate={indeterminate}
      required={required}
      size={size}
      label={label}
      name={name}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
