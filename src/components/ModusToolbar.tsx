

import type { ReactNode } from "react";
import { forwardRef } from "react";
import { ModusWcToolbar } from "@trimble-oss/moduswebcomponents-react";

export interface ModusToolbarProps {
  startContent?: ReactNode;
  centerContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
  ariaLabel?: string;
  customClass?: string;
  className?: string;
  role?: string;
}

const ModusToolbar = forwardRef<HTMLModusWcToolbarElement, ModusToolbarProps>(
  (
    {
      startContent,
      centerContent,
      endContent,
      children,
      ariaLabel,
      customClass,
      className,
      role,
    },
    ref
  ) => {
    const combinedClass =
      [customClass, className].filter(Boolean).join(" ") || undefined;

    return (
      <ModusWcToolbar
        ref={ref}
        aria-label={ariaLabel}
        role={role}
        custom-class={combinedClass}
      >
        {startContent && <div slot="start">{startContent}</div>}
        {centerContent && <div slot="center">{centerContent}</div>}
        {endContent && <div slot="end">{endContent}</div>}
        {children}
      </ModusWcToolbar>
    );
  }
);

ModusToolbar.displayName = "ModusToolbar";

export default ModusToolbar;
