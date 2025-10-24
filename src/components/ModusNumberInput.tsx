

import { ModusWcNumberInput } from "@trimble-oss/moduswebcomponents-react";
import { useCallback, useEffect, useRef } from "react";

// Type definitions for number input interfaces
interface InputFeedback {
  level: "error" | "info" | "success" | "warning";
  message?: string;
}

interface ModusNumberInputProps {
  // Basic configuration
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;

  // Size and appearance
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  customClass?: string;

  // Input behavior
  type?: "number" | "range";
  inputMode?: "decimal" | "numeric" | "none";
  autoComplete?: "on" | "off";

  // Validation and constraints
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  // Currency support
  currencySymbol?: string;

  // Feedback system
  feedback?: InputFeedback;

  // Accessibility
  inputId?: string;
  inputTabIndex?: number;
  ariaLabel?: string;

  // Event handlers
  onInputFocus?: (event: FocusEvent) => void;
  onInputBlur?: (event: FocusEvent) => void;
  onInputChange?: (value: string) => void;
}

export default function ModusNumberInput({
  label,
  placeholder = "",
  value = "",
  name,
  size = "md",
  bordered = true,
  customClass,
  type = "number",
  inputMode = "numeric",
  autoComplete,
  min,
  max,
  step,
  required = false,
  disabled = false,
  readOnly = false,
  currencySymbol,
  feedback,
  inputId,
  inputTabIndex,
  ariaLabel,
  onInputFocus,
  onInputBlur,
  onInputChange,
}: ModusNumberInputProps) {
  const numberInputRef = useRef<HTMLElement>(null);

  // Event handlers with useCallback for performance
  const handleInputFocus = useCallback(
    (event: Event) => {
      const focusEvent = event as FocusEvent;
      onInputFocus?.(focusEvent);
    },
    [onInputFocus]
  );

  const handleInputBlur = useCallback(
    (event: Event) => {
      const focusEvent = event as FocusEvent;
      onInputBlur?.(focusEvent);
    },
    [onInputBlur]
  );

  const handleInputChange = useCallback(
    (event: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customEvent = event as any;
      onInputChange?.(
        customEvent.detail?.value || customEvent.target?.value || ""
      );
    },
    [onInputChange]
  );

  // Set up event listeners when component mounts
  useEffect(() => {
    const numberInput = numberInputRef.current;
    if (!numberInput) return;

    // Add event listeners
    numberInput.addEventListener("inputFocus", handleInputFocus);
    numberInput.addEventListener("inputBlur", handleInputBlur);
    numberInput.addEventListener("inputChange", handleInputChange);

    // Cleanup event listeners
    return () => {
      numberInput.removeEventListener("inputFocus", handleInputFocus);
      numberInput.removeEventListener("inputBlur", handleInputBlur);
      numberInput.removeEventListener("inputChange", handleInputChange);
    };
  }, [handleInputFocus, handleInputBlur, handleInputChange]);

  // Update number input properties when props change
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const numberInput = numberInputRef.current as any;
    if (!numberInput) return;

    // Update basic properties
    numberInput.value = value;
    numberInput.label = label;
    numberInput.placeholder = placeholder;
    numberInput.size = size;
    numberInput.type = type;
    numberInput.inputMode = inputMode;
    numberInput.bordered = bordered;
    numberInput.required = required;
    numberInput.disabled = disabled;
    numberInput.readOnly = readOnly;

    // Update constraints
    if (min !== undefined) {
      numberInput.min = min;
    }
    if (max !== undefined) {
      numberInput.max = max;
    }
    if (step !== undefined) {
      numberInput.step = step;
    }

    // Update currency symbol
    if (currencySymbol) {
      numberInput.currencySymbol = currencySymbol;
    }

    // Update feedback
    if (feedback) {
      numberInput.feedback = feedback;
    }

    // Update accessibility
    if (inputId) {
      numberInput.inputId = inputId;
    }
    if (inputTabIndex !== undefined) {
      numberInput.inputTabIndex = inputTabIndex;
    }
    if (ariaLabel) {
      numberInput.ariaLabel = ariaLabel;
    }
    if (autoComplete) {
      numberInput.autoComplete = autoComplete;
    }
    if (name) {
      numberInput.name = name;
    }
  }, [
    value,
    label,
    placeholder,
    size,
    type,
    inputMode,
    bordered,
    required,
    disabled,
    readOnly,
    min,
    max,
    step,
    currencySymbol,
    feedback,
    inputId,
    inputTabIndex,
    ariaLabel,
    autoComplete,
    name,
  ]);

  return (
    <ModusWcNumberInput
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={numberInputRef as any}
      custom-class={customClass}
    />
  );
}
