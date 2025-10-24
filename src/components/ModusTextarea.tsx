import { useEffect, useMemo, useRef } from "react";
import { ModusWcTextarea } from "@trimble-oss/moduswebcomponents-react";
import type { InputFeedbackProp } from "./ModusInputFeedback";

type TextareaSize = "sm" | "md" | "lg";
type EnterKeyHint =
  | "enter"
  | "done"
  | "go"
  | "next"
  | "previous"
  | "search"
  | "send";

export interface ModusTextareaProps {
  value?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  validText?: string;
  feedback?: InputFeedbackProp;
  size?: TextareaSize;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  enterkeyhint?: EnterKeyHint;
  name?: string;
  customClass?: string;
  ariaLabel?: string;
  onValueChange?: (value: string) => void;
}

export default function ModusTextarea({
  value = "",
  label,
  placeholder,
  helperText,
  errorText,
  validText,
  feedback,
  size = "md",
  rows,
  maxLength,
  minLength,
  required = false,
  disabled = false,
  readOnly = false,
  enterkeyhint,
  name,
  customClass,
  ariaLabel,
  onValueChange,
}: ModusTextareaProps) {
  const textareaRef = useRef<HTMLModusWcTextareaElement>(null);

  const computedFeedback = useMemo<InputFeedbackProp | undefined>(() => {
    if (feedback) {
      return feedback;
    }
    if (errorText) {
      return { level: "error", message: errorText };
    }
    if (validText) {
      return { level: "success", message: validText };
    }
    if (helperText) {
      return { level: "info", message: helperText };
    }
    return undefined;
  }, [errorText, feedback, helperText, validText]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    const handleValueChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      onValueChange?.(customEvent.detail);
    };

    if (onValueChange) {
      textarea.addEventListener("valueChange", handleValueChange);
    }

    return () => {
      if (onValueChange) {
        textarea.removeEventListener("valueChange", handleValueChange);
      }
    };
  }, [onValueChange]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.value = value;
  }, [value]);

  return (
    <ModusWcTextarea
      ref={textareaRef}
      value={value}
      label={label}
      placeholder={placeholder}
      feedback={computedFeedback}
      size={size}
      rows={rows}
      max-length={maxLength}
      min-length={minLength}
      required={required}
      disabled={disabled}
      read-only={readOnly}
      enterkeyhint={enterkeyhint}
      name={name}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
