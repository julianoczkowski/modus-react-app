import { useEffect, useRef } from "react";
import { ModusWcMenuItem } from "@trimble-oss/moduswebcomponents-react";

export interface ModusMenuItemProps {
  label: string;
  value: string;
  subLabel?: string;
  startIcon?: string;
  selected?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  focused?: boolean;
  size?: "sm" | "md" | "lg";
  customClass?: string;
  onItemSelect?: (event: CustomEvent<{ value: string }>) => void;
}

export default function ModusMenuItem({
  label,
  value,
  subLabel,
  startIcon,
  selected = false,
  disabled = false,
  bordered = false,
  focused = false,
  size = "md",
  customClass,
  onItemSelect,
}: ModusMenuItemProps) {
  const menuItemRef = useRef<HTMLModusWcMenuItemElement>(null);

  useEffect(() => {
    const menuItem = menuItemRef.current;
    if (!menuItem) return;

    const handleItemSelect = (event: Event) => {
      onItemSelect?.(event as CustomEvent<{ value: string }>);
    };

    if (onItemSelect) {
      menuItem.addEventListener("itemSelect", handleItemSelect);
    }

    return () => {
      if (onItemSelect) {
        menuItem.removeEventListener("itemSelect", handleItemSelect);
      }
    };
  }, [onItemSelect]);

  return (
    <ModusWcMenuItem
      ref={menuItemRef}
      label={label}
      value={value}
      sub-label={subLabel}
      start-icon={startIcon}
      selected={selected}
      disabled={disabled}
      bordered={bordered}
      focused={focused}
      size={size}
      custom-class={customClass}
    />
  );
}
