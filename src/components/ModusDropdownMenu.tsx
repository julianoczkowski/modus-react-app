import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ModusWcDropdownMenu } from "@trimble-oss/moduswebcomponents-react";
import ModusMenuItem from "./ModusMenuItem";
import type { MenuItem } from "./ModusMenu";

export interface ModusDropdownMenuProps {
  children?: ReactNode;
  menuItems?: MenuItem[];
  buttonColor?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  buttonSize?: "xs" | "sm" | "md" | "lg";
  buttonVariant?: "filled" | "outlined" | "borderless";
  customClass?: string;
  disabled?: boolean;
  menuBordered?: boolean;
  menuOffset?: number;
  menuPlacement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  menuSize?: "sm" | "md" | "lg";
  menuVisible?: boolean;
  buttonContent?: ReactNode;
  onMenuVisibilityChange?: (event: CustomEvent<{ isVisible: boolean }>) => void;
  onItemSelect?: (event: CustomEvent<{ value: string }>) => void;
}

export default function ModusDropdownMenu({
  children,
  menuItems,
  buttonColor = "primary",
  buttonSize = "md",
  buttonVariant = "filled",
  customClass,
  disabled = false,
  menuBordered = true,
  menuOffset = 10,
  menuPlacement = "bottom-start",
  menuSize = "md",
  menuVisible = false,
  buttonContent,
  onMenuVisibilityChange,
  onItemSelect,
}: ModusDropdownMenuProps) {
  const dropdownRef = useRef<HTMLModusWcDropdownMenuElement>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    const handleMenuVisibilityChange = (event: Event) => {
      onMenuVisibilityChange?.(event as CustomEvent<{ isVisible: boolean }>);
    };
    const handleItemSelect = (event: Event) => {
      onItemSelect?.(event as CustomEvent<{ value: string }>);

      // Close the menu after item selection
      const dropdown = dropdownRef.current;
      if (dropdown) {
        dropdown.menuVisible = false;
      }
    };

    if (onMenuVisibilityChange)
      dropdown.addEventListener(
        "menuVisibilityChange",
        handleMenuVisibilityChange
      );
    if (onItemSelect) dropdown.addEventListener("itemSelect", handleItemSelect);

    return () => {
      if (onMenuVisibilityChange)
        dropdown.removeEventListener(
          "menuVisibilityChange",
          handleMenuVisibilityChange
        );
      if (onItemSelect)
        dropdown.removeEventListener("itemSelect", handleItemSelect);
    };
  }, [onMenuVisibilityChange, onItemSelect]);

  return (
    <ModusWcDropdownMenu
      ref={dropdownRef}
      buttonColor={buttonColor}
      buttonSize={buttonSize}
      buttonVariant={buttonVariant}
      customClass={customClass}
      disabled={disabled}
      menuBordered={menuBordered}
      menuOffset={menuOffset}
      menuPlacement={menuPlacement}
      menuSize={menuSize}
      menuVisible={menuVisible}
    >
      {buttonContent && <div slot="button">{buttonContent}</div>}
      <div slot="menu">
        {menuItems
          ? menuItems.map((item) => (
              <ModusMenuItem
                key={item.value}
                label={item.label}
                value={item.value}
                subLabel={item.subLabel}
                startIcon={item.startIcon}
                selected={item.selected}
                disabled={item.disabled}
                bordered={item.bordered}
                onItemSelect={onItemSelect}
              />
            ))
          : children}
      </div>
    </ModusWcDropdownMenu>
  );
}
