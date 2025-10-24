

import { useEffect, useRef } from "react";
import { ModusWcSelect } from "@trimble-oss/moduswebcomponents-react";

type SelectSize = "sm" | "md" | "lg";
type FeedbackLevel = "error" | "info" | "success" | "warning";

export interface ModusSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ModusSelectFeedback {
  level: FeedbackLevel;
  message?: string;
}

export interface ModusSelectProps {
  options: ModusSelectOption[];
  value?: string;
  label?: string;
  name?: string;
  size?: SelectSize;
  required?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  inputId?: string;
  inputTabIndex?: number;
  customClass?: string;
  feedback?: ModusSelectFeedback;
  "aria-label"?: string;
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export default function ModusSelect({
  options,
  value = "",
  label,
  name,
  size = "md",
  required = false,
  disabled = false,
  bordered = true,
  inputId,
  inputTabIndex,
  customClass,
  feedback,
  "aria-label": ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusSelectProps) {
  const selectRef = useRef<HTMLModusWcSelectElement>(null);

  // Sync options array with the web component
  useEffect(() => {
    const select = selectRef.current;
    if (!select) {
      return;
    }

    // Assign a new array to trigger re-render within the component
    select.options = [...options];
  }, [options]);

  // Sync feedback (object set via property, not attribute)
  useEffect(() => {
    const select = selectRef.current;
    if (!select) {
      return;
    }

    select.feedback = feedback;
  }, [feedback]);

  // Wire up events
  useEffect(() => {
    const select = selectRef.current;
    if (!select) {
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
      select.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      select.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      select.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      if (onInputChange) {
        select.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        select.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        select.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputChange, onInputFocus, onInputBlur]);

  return (
    <ModusWcSelect
      ref={selectRef}
      value={value}
      label={label}
      name={name}
      size={size}
      required={required}
      disabled={disabled}
      bordered={bordered}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
