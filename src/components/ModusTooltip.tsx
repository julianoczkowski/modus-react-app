import { Children, forwardRef, useMemo } from "react";
import type { ReactNode } from "react";
import { ModusWcTooltip } from "@trimble-oss/moduswebcomponents-react";

export type TooltipPosition = "auto" | "top" | "bottom" | "left" | "right";

export interface ModusTooltipProps {
  content: string;
  position?: TooltipPosition;
  disabled?: boolean;
  forceOpen?: boolean;
  tooltipId?: string;
  customClass?: string;
  className?: string;
  children?: ReactNode;
}

const ModusTooltip = forwardRef<HTMLModusWcTooltipElement, ModusTooltipProps>(
  (
    {
      content,
      position = "auto",
      disabled = false,
      forceOpen = false,
      tooltipId,
      customClass,
      className,
      children,
    },
    ref
  ) => {
    const normalizedChild = useMemo(() => {
      const childArray = Children.toArray(children);
      if (childArray.length === 0) {
        return null;
      }
      if (childArray.length === 1) {
        return childArray[0];
      }
      return (
        <span className="inline-flex items-center gap-1">{childArray}</span>
      );
    }, [children]);

    const combinedClass =
      [customClass, className].filter(Boolean).join(" ") || undefined;

    return (
      <ModusWcTooltip
        ref={ref}
        content={content}
        position={position}
        disabled={disabled}
        force-open={forceOpen}
        tooltip-id={tooltipId}
        custom-class={combinedClass}
      >
        {normalizedChild}
      </ModusWcTooltip>
    );
  }
);

ModusTooltip.displayName = "ModusTooltip";

export default ModusTooltip;
