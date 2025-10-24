import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ModusWcChip } from "@trimble-oss/moduswebcomponents-react";

export interface ModusChipProps {
  children?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  label?: string;
  showRemove?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outline";
  customClass?: string;
  "aria-label"?: string;
  onChipClick?: (event: CustomEvent<MouseEvent | KeyboardEvent>) => void;
  onChipRemove?: (event: CustomEvent<MouseEvent | KeyboardEvent>) => void;
}

export default function ModusChip({
  children,
  active = false,
  disabled = false,
  hasError = false,
  label = "",
  showRemove = false,
  size = "md",
  variant = "filled",
  customClass,
  "aria-label": ariaLabel,
  onChipClick,
  onChipRemove,
}: ModusChipProps) {
  const chipRef = useRef<HTMLModusWcChipElement>(null);

  useEffect(() => {
    const chip = chipRef.current;
    if (!chip) return;

    const handleChipClick = (event: Event) => {
      onChipClick?.(event as CustomEvent<MouseEvent | KeyboardEvent>);
    };
    const handleChipRemove = (event: Event) => {
      onChipRemove?.(event as CustomEvent<MouseEvent | KeyboardEvent>);
    };

    if (onChipClick) chip.addEventListener("chipClick", handleChipClick);
    if (onChipRemove) chip.addEventListener("chipRemove", handleChipRemove);

    return () => {
      if (onChipClick) chip.removeEventListener("chipClick", handleChipClick);
      if (onChipRemove)
        chip.removeEventListener("chipRemove", handleChipRemove);
    };
  }, [onChipClick, onChipRemove]);

  return (
    <ModusWcChip
      ref={chipRef}
      active={active}
      disabled={disabled}
      hasError={hasError}
      label={label}
      showRemove={showRemove}
      size={size}
      variant={variant}
      customClass={customClass}
      aria-label={ariaLabel}
    >
      {children}
    </ModusWcChip>
  );
}
