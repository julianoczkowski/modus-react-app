import { ModusWcInputLabel } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

interface ModusInputLabelProps {
  forId?: string;
  labelText: string;
  subLabelText?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  customClass?: string;
  children?: ReactNode;
}

export default function ModusInputLabel({
  forId,
  labelText,
  subLabelText,
  required = false,
  size = "md",
  customClass = "",
  children,
}: ModusInputLabelProps) {
  return (
    <ModusWcInputLabel
      for-id={forId}
      label-text={labelText}
      sub-label-text={subLabelText}
      required={required}
      size={size}
      custom-class={customClass}
    >
      {children}
    </ModusWcInputLabel>
  );
}
