

import { ModusWcLoader } from "@trimble-oss/moduswebcomponents-react";

interface ModusLoaderProps {
  variant?: "spinner" | "ball" | "bars" | "dots" | "infinity" | "ring";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "xs" | "sm" | "md" | "lg";
  customClass?: string;
  ariaLabel?: string;
}

export default function ModusLoader({
  variant = "spinner",
  color = "primary",
  size = "md",
  customClass = "",
  ariaLabel = "Loading",
}: ModusLoaderProps) {
  return (
    <ModusWcLoader
      variant={variant}
      color={color}
      size={size}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
