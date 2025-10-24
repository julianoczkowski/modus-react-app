

import { ModusWcIcon } from "@trimble-oss/moduswebcomponents-react";

interface ModusIconProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  decorative?: boolean;
  customClass?: string;
  ariaLabel?: string;
  color?: string;
}

export default function ModusIcon({
  name,
  size = "md",
  decorative = true,
  customClass = "",
  ariaLabel,
  color,
}: ModusIconProps) {
  // If decorative is false and no ariaLabel is provided, generate one
  const finalAriaLabel = !decorative && !ariaLabel ? `${name} icon` : ariaLabel;

  return (
    <ModusWcIcon
      name={name}
      size={size}
      decorative={decorative}
      custom-class={customClass}
      aria-label={finalAriaLabel}
      style={color ? { color } : undefined}
    />
  );
}
