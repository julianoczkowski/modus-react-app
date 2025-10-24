

import { forwardRef } from "react";
import { ModusWcDivider } from "@trimble-oss/moduswebcomponents-react";

type DividerColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "high-contrast";

type DividerOrientation = "horizontal" | "vertical";
type DividerPosition = "start" | "center" | "end";
type DividerThickness = "sm" | "md" | "lg";

export interface ModusDividerProps {
  color?: DividerColor;
  content?: string;
  orientation?: DividerOrientation;
  position?: DividerPosition;
  responsive?: boolean;
  customClass?: string;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  role?: string;
  thickness?: DividerThickness;
}

const ModusDivider = forwardRef<HTMLModusWcDividerElement, ModusDividerProps>(
  (
    {
      color = "tertiary",
      content,
      orientation = "horizontal",
      position = "center",
      responsive = true,
      customClass,
      className,
      ariaLabel,
      ariaHidden,
      role,
      thickness = "sm",
    },
    ref
  ) => {
    const thicknessClass =
      thickness !== "sm" ? `modus-divider-thickness-${thickness}` : undefined;
    const combinedClass =
      [customClass, className, thicknessClass].filter(Boolean).join(" ") ||
      undefined;

    return (
      <ModusWcDivider
        ref={ref}
        color={color}
        content={content}
        orientation={orientation}
        position={position}
        responsive={responsive}
        custom-class={combinedClass}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        role={role}
      />
    );
  }
);

ModusDivider.displayName = "ModusDivider";

export default ModusDivider;
