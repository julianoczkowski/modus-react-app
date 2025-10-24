import { useEffect, useRef } from "react";
import { ModusWcTimeInput } from "@trimble-oss/moduswebcomponents-react";
import type { InputFeedbackProp } from "./ModusInputFeedback";

export interface ModusTimeInputProps {
  value?: string;
  label?: string;
  name?: string;
  inputId?: string;
  min?: string;
  max?: string;
  step?: number;
  showSeconds?: boolean;
  datalistId?: string;
  datalistOptions?: string[];
  autoComplete?: "on" | "off";
  bordered?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  inputTabIndex?: number;
  customClass?: string;
  feedback?: InputFeedbackProp;
  ariaLabel?: string;
  onInputChange?: (event: CustomEvent<Event>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export default function ModusTimeInput({
  value = "",
  label,
  name,
  inputId,
  min,
  max,
  step,
  showSeconds = false,
  datalistId,
  datalistOptions = [],
  autoComplete,
  bordered = true,
  disabled = false,
  readOnly = false,
  required = false,
  size = "md",
  inputTabIndex,
  customClass,
  feedback,
  ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusTimeInputProps) {
  const inputRef = useRef<HTMLModusWcTimeInputElement>(null);

  useEffect(() => {
    const timeInput = inputRef.current;
    if (!timeInput) {
      return;
    }

    if (Array.isArray(datalistOptions)) {
      timeInput.datalistOptions = [...datalistOptions];
    }
  }, [datalistOptions]);

  useEffect(() => {
    const timeInput = inputRef.current;
    if (!timeInput) {
      return;
    }

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<Event>);
    };

    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };

    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    if (onInputChange) {
      timeInput.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      timeInput.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      timeInput.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      if (onInputChange) {
        timeInput.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        timeInput.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        timeInput.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputBlur, onInputChange, onInputFocus]);

  useEffect(() => {
    const timeInput = inputRef.current;
    if (!timeInput) {
      return;
    }
    if (value !== undefined) {
      timeInput.value = value;
    }
  }, [value]);

  return (
    <ModusWcTimeInput
      ref={inputRef}
      value={value}
      label={label}
      name={name}
      inputId={inputId}
      min={min}
      max={max}
      step={step}
      showSeconds={showSeconds}
      datalistId={datalistId}
      datalistOptions={datalistOptions}
      autoComplete={autoComplete}
      bordered={bordered}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      size={size}
      inputTabIndex={inputTabIndex}
      customClass={customClass}
      feedback={feedback}
      aria-label={ariaLabel}
    />
  );
}
