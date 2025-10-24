import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

interface ModusButtonProps {
  // Button appearance
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "xs" | "sm" | "md" | "lg";
  shape?: "rectangle" | "square" | "circle";

  // Button behavior
  disabled?: boolean;
  fullWidth?: boolean;
  pressed?: boolean;
  type?: "button" | "submit" | "reset";

  // Content
  children?: ReactNode;
  icon?: string;
  iconPosition?: "left" | "right" | "only";

  // Accessibility
  ariaLabel?: string;

  // Events
  onButtonClick?: () => void;

  // Styling
  className?: string;
}

export default function ModusButton({
  color = "primary",
  variant = "filled",
  size = "md",
  shape = "rectangle",
  disabled = false,
  fullWidth = false,
  pressed = false,
  type = "button",
  children,
  icon,
  iconPosition = "left",
  ariaLabel,
  onButtonClick,
  className,
}: ModusButtonProps) {
  // Handle icon rendering
  const renderIcon = (
    iconName: string,
    position: "left" | "right" | "only"
  ) => {
    const iconStyle =
      position === "left"
        ? { marginRight: "8px" }
        : position === "right"
        ? { marginLeft: "8px" }
        : {};

    return (
      <i className="modus-icons" style={iconStyle}>
        {iconName}
      </i>
    );
  };

  // Determine content based on icon position
  const renderContent = () => {
    if (!icon) {
      return children;
    }

    switch (iconPosition) {
      case "left":
        return (
          <>
            {renderIcon(icon, "left")}
            {children}
          </>
        );
      case "right":
        return (
          <>
            {children}
            {renderIcon(icon, "right")}
          </>
        );
      case "only":
        return renderIcon(icon, "only");
      default:
        return children;
    }
  };

  // Handle aria-label for icon-only buttons
  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (iconPosition === "only" && typeof children === "string") {
      return children; // Use text content as aria-label for icon-only buttons
    }
    return undefined;
  };

  return (
    <ModusWcButton
      color={color}
      variant={variant}
      size={size}
      shape={shape}
      disabled={disabled}
      fullWidth={fullWidth}
      pressed={pressed}
      type={type}
      aria-label={getAriaLabel()}
      onButtonClick={onButtonClick}
      custom-class={className}
    >
      {renderContent()}
    </ModusWcButton>
  );
}
