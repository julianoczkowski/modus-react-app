import { useEffect, useRef, useState, useCallback } from "react";
import {
  ModusWcMenu,
  ModusWcMenuItem,
} from "@trimble-oss/moduswebcomponents-react";

export interface MenuItem {
  label: string;
  value: string;
  subLabel?: string;
  startIcon?: string;
  selected?: boolean;
  disabled?: boolean;
  bordered?: boolean;
}

interface ModusMenuProps {
  items: MenuItem[];
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  customClass?: string;
  ariaLabel?: string;
  onItemSelect?: (item: MenuItem) => void;
}

export default function ModusMenu({
  items,
  orientation = "vertical",
  size = "md",
  bordered = false,
  customClass = "",
  ariaLabel = "Menu",
  onItemSelect,
}: ModusMenuProps) {
  const menuRef = useRef<HTMLModusWcMenuElement>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  // Handle item selection
  const handleItemSelect = useCallback(
    (event: CustomEvent<{ value: string }>) => {
      const selectedItem = items.find(
        (item) => item.value === event.detail.value
      );
      if (selectedItem) {
        setSelectedValue(selectedItem.value);
        onItemSelect?.(selectedItem);
      }
    },
    [items, onItemSelect]
  );

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    menu.addEventListener("itemSelect", handleItemSelect as EventListener);

    return () => {
      menu.removeEventListener("itemSelect", handleItemSelect as EventListener);
    };
  }, [items, onItemSelect, handleItemSelect]);

  // Initialize selected value from items
  useEffect(() => {
    const selectedItem = items.find((item) => item.selected);
    if (selectedItem) {
      setSelectedValue(selectedItem.value);
    }
  }, [items]);

  return (
    <ModusWcMenu
      ref={menuRef}
      orientation={orientation}
      size={size}
      bordered={bordered}
      custom-class={customClass}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <ModusWcMenuItem
          key={`${item.value}-${index}`}
          label={item.label}
          value={item.value}
          sub-label={item.subLabel}
          start-icon={item.startIcon}
          selected={selectedValue === item.value || item.selected}
          disabled={item.disabled}
          bordered={item.bordered}
        />
      ))}
    </ModusWcMenu>
  );
}
