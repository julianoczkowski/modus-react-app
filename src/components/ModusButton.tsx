import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

/**
 * Props for the ModusButton component.
 */
interface ModusButtonProps {
  /** The color of the button. */
  color?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';
  /** The variant of the button. */
  variant?: 'filled' | 'outlined' | 'borderless';
  /** The size of the button. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** The shape of the button. */
  shape?: 'rectangle' | 'square' | 'circle';

  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether the button should take up the full width of its container. */
  fullWidth?: boolean;
  /** Whether the button is pressed. */
  pressed?: boolean;
  /** The type of the button. */
  type?: 'button' | 'submit' | 'reset';

  /** The content to display inside the button. */
  children?: ReactNode;
  /** An icon to display in the button. */
  icon?: string;
  /** The position of the icon relative to the button text. */
  iconPosition?: 'left' | 'right' | 'only';

  /** The ARIA label for the button. */
  ariaLabel?: string;

  /** A callback function to handle button clicks. */
  onButtonClick?: () => void;

  /** A custom CSS class to apply to the button. */
  className?: string;
}

/**
 * Renders a Modus button component.
 * @param {ModusButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered button component.
 */
export default function ModusButton({
  color = 'primary',
  variant = 'filled',
  size = 'md',
  shape = 'rectangle',
  disabled = false,
  fullWidth = false,
  pressed = false,
  type = 'button',
  children,
  icon,
  iconPosition = 'left',
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
