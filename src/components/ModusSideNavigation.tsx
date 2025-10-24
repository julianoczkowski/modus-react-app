import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ModusWcSideNavigation } from "@trimble-oss/moduswebcomponents-react";
import ModusMenu from "./ModusMenu";
import type { MenuItem } from "./ModusMenu";

type SideNavSize = "sm" | "md" | "lg";

export interface ModusSideNavigationProps {
  items: MenuItem[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  collapseOnClickOutside?: boolean;
  maxWidth?: string;
  size?: SideNavSize;
  customClass?: string;
  autoCollapseOnSelect?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onItemSelect?: (item: MenuItem) => void;
}

export default function ModusSideNavigation({
  items,
  expanded,
  defaultExpanded = false,
  collapseOnClickOutside = true,
  maxWidth = "256px",
  size = "md",
  customClass,
  autoCollapseOnSelect = true,
  onExpandedChange,
  onItemSelect,
}: ModusSideNavigationProps) {
  const navRef = useRef<HTMLModusWcSideNavigationElement>(null);
  const isControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const currentExpanded = useMemo(
    () => (isControlled ? Boolean(expanded) : internalExpanded),
    [expanded, internalExpanded, isControlled]
  );

  // Synchronize expanded state to the web component
  useEffect(() => {
    const nav = navRef.current;
    if (nav && nav.expanded !== currentExpanded) {
      nav.expanded = currentExpanded;
    }
  }, [currentExpanded]);

  // Keep collapse-on-click-outside and max-width up to date
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    nav.collapseOnClickOutside = collapseOnClickOutside;
    nav.maxWidth = maxWidth;
    if (customClass) {
      nav.customClass = customClass;
    } else {
      nav.customClass = undefined;
    }
  }, [collapseOnClickOutside, maxWidth, customClass]);

  // Handle expanded change events from the component
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    const handleExpandedChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      const newExpanded = customEvent.detail;

      if (!isControlled) {
        setInternalExpanded(newExpanded);
      }
      onExpandedChange?.(newExpanded);
    };

    nav.addEventListener("expandedChange", handleExpandedChange);

    return () => {
      nav.removeEventListener("expandedChange", handleExpandedChange);
    };
  }, [isControlled, onExpandedChange]);

  const collapseNavigation = useCallback(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    nav.expanded = false;
    if (!isControlled) {
      setInternalExpanded(false);
    }
    onExpandedChange?.(false);
  }, [isControlled, onExpandedChange]);

  const handleItemSelect = useCallback(
    (item: MenuItem) => {
      onItemSelect?.(item);
      if (autoCollapseOnSelect) {
        collapseNavigation();
      }
    },
    [autoCollapseOnSelect, collapseNavigation, onItemSelect]
  );

  return (
    <ModusWcSideNavigation
      ref={navRef}
      custom-class={customClass}
      collapseOnClickOutside={collapseOnClickOutside}
      expanded={currentExpanded}
      maxWidth={maxWidth}
    >
      <ModusMenu
        items={items}
        size={size}
        orientation="vertical"
        bordered={false}
        onItemSelect={handleItemSelect}
      />
    </ModusWcSideNavigation>
  );
}

export type { MenuItem as ModusSideNavigationItem };
