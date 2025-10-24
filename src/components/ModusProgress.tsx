

import type { ReactNode } from "react";
import { useMemo } from "react";
import { ModusWcProgress } from "@trimble-oss/moduswebcomponents-react";

interface ModusProgressProps {
  variant?: "default" | "radial";
  value?: number;
  max?: number;
  indeterminate?: boolean;
  label?: string;
  customClass?: string;
  ariaLabel?: string;
  children?: ReactNode;
}

export default function ModusProgress({
  variant = "default",
  value = 0,
  max = 100,
  indeterminate = false,
  label = "",
  customClass = "",
  ariaLabel = "Progress status",
  children,
}: ModusProgressProps) {
  const normalizedValue = useMemo(() => {
    if (indeterminate) {
      return undefined;
    }

    if (max <= 0) {
      return 0;
    }

    const clampedValue = Math.min(Math.max(value, 0), max);
    return Number.isFinite(clampedValue) ? clampedValue : 0;
  }, [indeterminate, max, value]);

  return (
    <ModusWcProgress
      variant={variant}
      value={normalizedValue}
      max={max}
      indeterminate={indeterminate}
      label={label}
      custom-class={customClass}
      aria-label={ariaLabel}
    >
      {variant === "radial" ? children : null}
    </ModusWcProgress>
  );
}
