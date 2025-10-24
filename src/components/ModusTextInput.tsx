import { useEffect, useRef } from "react";
import { ModusWcTextInput } from "@trimble-oss/moduswebcomponents-react";
import type { InputFeedbackProp } from "./ModusInputFeedback";

interface ModusTextInputProps {
  // Basic input properties
  value?: string;
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "search"
    | "url"
    | "tel"
    | "date"
    | "time";
  placeholder?: string;
  name?: string;
  inputId?: string;

  // Input behavior
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  bordered?: boolean;

  // Input features
  includeClear?: boolean;
  includeSearch?: boolean;
  clearAriaLabel?: string;

  // Validation and feedback
  feedback?: InputFeedbackProp;
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  // Mobile optimization
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
  autoComplete?: string;
  autoCorrect?: "on" | "off";
  enterkeyhint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send";
  inputMode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  inputTabIndex?: number;

  // Styling and layout
  size?: "sm" | "md" | "lg";
  customClass?: string;
  label?: string;

  // Accessibility
  "aria-label"?: string;

  // Events
  onInputChange?: (event: CustomEvent<InputEvent>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export default function ModusTextInput({
  value = "",
  type = "text",
  placeholder = "",
  name = "",
  inputId,
  disabled = false,
  readOnly = false,
  required = false,
  bordered = true,
  includeClear = false,
  includeSearch = false,
  clearAriaLabel = "Clear text",
  feedback,
  maxLength,
  minLength,
  pattern,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  enterkeyhint,
  inputMode = "text",
  inputTabIndex,
  size = "md",
  customClass = "",
  label,
  "aria-label": ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ModusTextInputProps) {
  const textInputRef = useRef<HTMLModusWcTextInputElement>(null);

  useEffect(() => {
    const textInput = textInputRef.current;
    if (!textInput) return;

    const handleInputChange = (event: Event) => {
      onInputChange?.(event as CustomEvent<InputEvent>);
    };

    const handleInputFocus = (event: Event) => {
      onInputFocus?.(event as CustomEvent<FocusEvent>);
    };

    const handleInputBlur = (event: Event) => {
      onInputBlur?.(event as CustomEvent<FocusEvent>);
    };

    // Add event listeners
    if (onInputChange) {
      textInput.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      textInput.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      textInput.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      // Cleanup event listeners
      if (onInputChange) {
        textInput.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        textInput.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        textInput.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputChange, onInputFocus, onInputBlur]);

  return (
    <ModusWcTextInput
      ref={textInputRef}
      value={value}
      type={type}
      placeholder={placeholder}
      name={name}
      input-id={inputId}
      disabled={disabled}
      read-only={readOnly}
      required={required}
      bordered={bordered}
      include-clear={includeClear}
      include-search={includeSearch}
      clear-aria-label={clearAriaLabel}
      feedback={feedback}
      max-length={maxLength}
      min-length={minLength}
      pattern={pattern}
      auto-capitalize={autoCapitalize}
      auto-complete={autoComplete}
      auto-correct={autoCorrect}
      enterkeyhint={enterkeyhint}
      input-mode={inputMode}
      input-tab-index={inputTabIndex}
      size={size}
      custom-class={customClass}
      label={label}
      aria-label={ariaLabel}
    />
  );
}
