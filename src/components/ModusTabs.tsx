import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { ModusWcTabs } from "@trimble-oss/moduswebcomponents-react";

export type ModusTabsStyle = "bordered" | "boxed" | "lifted" | "none";
export type ModusTabsSize = "sm" | "md" | "lg";

export interface ModusTab {
  label?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  customClass?: string;
}

export interface ModusTabsProps {
  tabs: ModusTab[];
  panels: ReactNode[];
  activeTabIndex?: number;
  size?: ModusTabsSize;
  tabStyle?: ModusTabsStyle;
  customClass?: string;
  ariaLabel?: string;
  onTabChange?: (detail: { previousTab: number; newTab: number }) => void;
}

export default function ModusTabs({
  tabs = [],
  panels = [],
  activeTabIndex = 0,
  size = "md",
  tabStyle = "bordered",
  customClass,
  ariaLabel = "Tabs navigation",
  onTabChange,
}: ModusTabsProps) {
  const tabsRef = useRef<HTMLModusWcTabsElement>(null);

  useEffect(() => {
    const tabsElement = tabsRef.current;
    if (!tabsElement) {
      return;
    }

    tabsElement.activeTabIndex = activeTabIndex;
  }, [activeTabIndex]);

  useEffect(() => {
    const tabsElement = tabsRef.current;
    if (!tabsElement) {
      return;
    }

    const handleTabChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        previousTab: number;
        newTab: number;
      }>;
      onTabChange?.(customEvent.detail);
    };

    if (onTabChange) {
      tabsElement.addEventListener("tabChange", handleTabChange);
    }

    return () => {
      if (onTabChange) {
        tabsElement.removeEventListener("tabChange", handleTabChange);
      }
    };
  }, [onTabChange]);

  return (
    <ModusWcTabs
      ref={tabsRef}
      size={size}
      tabStyle={tabStyle}
      custom-class={customClass}
      active-tab-index={activeTabIndex}
      aria-label={ariaLabel}
      tabs={tabs}
    >
      {panels.map((panel, index) => (
        <div key={`tab-panel-${index}`} slot={`tab-${index}`}>
          {panel}
        </div>
      ))}
    </ModusWcTabs>
  );
}
