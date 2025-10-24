

import { useEffect, useRef } from "react";
import { ModusWcSlider } from "@trimble-oss/moduswebcomponents-react";

type SliderSize = "sm" | "md" | "lg";

export interface ModusSliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  name?: string;
  size?: SliderSize;
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

export default function ModusSlider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  label,
  name,
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
}: ModusSliderProps) {
  const sliderRef = useRef<HTMLModusWcSliderElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) {
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
      slider.addEventListener("inputChange", handleInputChange);
    }
    if (onInputFocus) {
      slider.addEventListener("inputFocus", handleInputFocus);
    }
    if (onInputBlur) {
      slider.addEventListener("inputBlur", handleInputBlur);
    }

    return () => {
      if (onInputChange) {
        slider.removeEventListener("inputChange", handleInputChange);
      }
      if (onInputFocus) {
        slider.removeEventListener("inputFocus", handleInputFocus);
      }
      if (onInputBlur) {
        slider.removeEventListener("inputBlur", handleInputBlur);
      }
    };
  }, [onInputBlur, onInputChange, onInputFocus]);

  return (
    <ModusWcSlider
      ref={sliderRef}
      value={value}
      min={min}
      max={max}
      step={step}
      label={label}
      name={name}
      size={size}
      required={required}
      disabled={disabled}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
