import { useTheme } from "../hooks/useTheme";
import { type Theme } from "../contexts/ThemeContextData";
import { useState, useEffect, useRef } from "react";
import {
  ModusWcDropdownMenu,
  ModusWcMenuItem,
} from "@trimble-oss/moduswebcomponents-react";

interface ThemeSwitcherDropdownProps {
  className?: string;
}

function ThemeSwitcherDropdownContent({
  className = "",
}: ThemeSwitcherDropdownProps) {
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLModusWcDropdownMenuElement>(null);

  // Add event listeners directly to the dropdown element
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      const handleItemSelect = (event: Event) => {
        const customEvent = event as CustomEvent;
        const selectedValue = customEvent.detail?.value as Theme;
        if (selectedValue && selectedValue !== theme) {
          setTheme(selectedValue);
          dropdown.menuVisible = false;
        }
      };

      dropdown.addEventListener("itemSelect", handleItemSelect);

      return () => {
        dropdown.removeEventListener("itemSelect", handleItemSelect);
      };
    }
  }, [theme, setTheme]);

  const themes: { value: Theme; label: string; description: string }[] = [
    {
      value: "modus-classic-light",
      label: "Classic Light",
      description: "Traditional light theme",
    },
    {
      value: "modus-classic-dark",
      label: "Classic Dark",
      description: "Traditional dark theme",
    },
    {
      value: "modus-modern-light",
      label: "Modern Light",
      description: "Contemporary light theme",
    },
    {
      value: "modus-modern-dark",
      label: "Modern Dark",
      description: "Contemporary dark theme",
    },
    {
      value: "connect-light",
      label: "Connect Light",
      description: "Connect light theme",
    },
    {
      value: "connect-dark",
      label: "Connect Dark",
      description: "Connect dark theme",
    },
  ];

  const getCurrentThemeLabel = () => {
    const currentTheme = themes.find((t) => t.value === theme);
    return currentTheme ? currentTheme.label : "Theme";
  };

  return (
    <div className={className}>
      <ModusWcDropdownMenu
        ref={dropdownRef}
        buttonVariant="filled"
        menuPlacement="bottom-end"
      >
        <div
          slot="button"
          className="flex items-center justify-between w-full min-w-[140px] px-3 py-2 gap-2"
        >
          <div className="flex-1 text-left text-md font-medium">
            {getCurrentThemeLabel()}
          </div>
          <i className="modus-icons text-base flex-shrink-0">expand_more</i>
        </div>
        <div slot="menu">
          {themes.map((themeOption) => (
            <ModusWcMenuItem
              key={themeOption.value}
              label={themeOption.label}
              value={themeOption.value}
              selected={theme === themeOption.value}
            />
          ))}
        </div>
      </ModusWcDropdownMenu>
    </div>
  );
}

export default function ThemeSwitcherDropdown(
  props: ThemeSwitcherDropdownProps
) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={props.className || ""}>
        <div className="animate-pulse">
          <div className="h-8 w-32 rounded bg-muted" />
        </div>
      </div>
    );
  }

  return <ThemeSwitcherDropdownContent {...props} />;
}
