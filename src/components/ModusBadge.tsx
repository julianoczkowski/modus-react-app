import type { ReactNode } from "react";
import { ModusWcBadge } from "@trimble-oss/moduswebcomponents-react";

export interface ModusBadgeProps {
  children: ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "high-contrast";
  variant?: "filled" | "text" | "counter";
  size?: "sm" | "md" | "lg";
  customClass?: string;
}

export default function ModusBadge({
  children,
  color = "primary",
  variant = "filled",
  size = "md",
  customClass,
}: ModusBadgeProps) {
  return (
    <ModusWcBadge
      color={color}
      variant={variant}
      size={size}
      customClass={customClass}
    >
      {children}
    </ModusWcBadge>
  );
}
