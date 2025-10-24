

import { useEffect, useRef } from "react";
import { ModusWcThemeSwitcher } from "@trimble-oss/moduswebcomponents-react";
import type { IThemeConfig } from "@trimble-oss/moduswebcomponents";

export type ModusThemeConfig = IThemeConfig;

export interface ModusThemeSwitcherProps {
  customClass?: string;
  ariaLabel?: string;
  onThemeChange?: (config: ModusThemeConfig) => void;
}

export default function ModusThemeSwitcher({
  customClass,
  ariaLabel = "Toggle theme",
  onThemeChange,
}: ModusThemeSwitcherProps) {
  const switcherRef = useRef<HTMLModusWcThemeSwitcherElement>(null);

  useEffect(() => {
    const switcher = switcherRef.current;
    if (!switcher || !onThemeChange) {
      return;
    }

    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<IThemeConfig>;
      onThemeChange(customEvent.detail);
    };

    switcher.addEventListener("themeChange", handleThemeChange);

    return () => {
      switcher.removeEventListener("themeChange", handleThemeChange);
    };
  }, [onThemeChange]);

  return (
    <ModusWcThemeSwitcher
      ref={switcherRef}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
