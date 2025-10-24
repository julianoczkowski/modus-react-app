import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ModusWcAutocomplete } from "@trimble-oss/moduswebcomponents-react";

export interface AutocompleteItem {
  label: string;
  value: string;
  visibleInMenu: boolean;
  selected?: boolean;
}

export interface AutocompleteNoResults {
  label: string;
  subLabel: string;
  severity?: "error" | "info" | "success" | "warning";
}

export interface ModusAutocompleteProps {
  bordered?: boolean;
  disabled?: boolean;
  multiSelect?: boolean;
  items: AutocompleteItem[];
  value?: string;
  placeholder?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  debounceMs?: number;
  minChars?: number;
  leaveMenuOpen?: boolean;
  showSpinner?: boolean;
  noResults?: AutocompleteNoResults;
  customClass?: string;
  readOnly?: boolean;
  required?: boolean;
  inputId?: string;
  inputTabIndex?: number;
  name?: string;
  "aria-label"?: string;
  onInputChange?: (event: CustomEvent<Event>) => void;
  onInputFocus?: (event: CustomEvent<FocusEvent>) => void;
  onInputBlur?: (event: CustomEvent<FocusEvent>) => void;
  onItemSelect?: (event: CustomEvent<AutocompleteItem>) => void;
  onChipRemove?: (event: CustomEvent<AutocompleteItem>) => void;
  children?: ReactNode;
}

export default function ModusAutocomplete({
  bordered = true,
  disabled = false,
  multiSelect = false,
  items,
  value = "",
  placeholder,
  label,
  size = "md",
  debounceMs = 300,
  minChars = 0,
  leaveMenuOpen = false,
  showSpinner = false,
  noResults,
  customClass,
  readOnly = false,
  required = false,
  inputId,
  inputTabIndex,
  name,
  "aria-label": ariaLabel,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onItemSelect,
  onChipRemove,
  children,
}: ModusAutocompleteProps) {
  const autocompleteRef = useRef<HTMLModusWcAutocompleteElement>(null);

  useEffect(() => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) return;

    const handleInputChange = (event: Event) => {
      const customEvent = event as CustomEvent<Event>;
      onInputChange?.(customEvent);
    };

    const handleInputFocus = (event: Event) => {
      const customEvent = event as CustomEvent<FocusEvent>;
      onInputFocus?.(customEvent);
    };

    const handleInputBlur = (event: Event) => {
      const customEvent = event as CustomEvent<FocusEvent>;
      onInputBlur?.(customEvent);
    };

    const handleItemSelect = (event: Event) => {
      const customEvent = event as CustomEvent<AutocompleteItem>;
      onItemSelect?.(customEvent);
    };

    const handleChipRemove = (event: Event) => {
      const customEvent = event as CustomEvent<AutocompleteItem>;
      onChipRemove?.(customEvent);
    };

    // Add event listeners
    if (onInputChange)
      autocomplete.addEventListener("inputChange", handleInputChange);
    if (onInputFocus)
      autocomplete.addEventListener("inputFocus", handleInputFocus);
    if (onInputBlur)
      autocomplete.addEventListener("inputBlur", handleInputBlur);
    if (onItemSelect)
      autocomplete.addEventListener("itemSelect", handleItemSelect);
    if (onChipRemove)
      autocomplete.addEventListener("chipRemove", handleChipRemove);

    return () => {
      // Cleanup event listeners
      if (onInputChange)
        autocomplete.removeEventListener("inputChange", handleInputChange);
      if (onInputFocus)
        autocomplete.removeEventListener("inputFocus", handleInputFocus);
      if (onInputBlur)
        autocomplete.removeEventListener("inputBlur", handleInputBlur);
      if (onItemSelect)
        autocomplete.removeEventListener("itemSelect", handleItemSelect);
      if (onChipRemove)
        autocomplete.removeEventListener("chipRemove", handleChipRemove);
    };
  }, [onInputChange, onInputFocus, onInputBlur, onItemSelect, onChipRemove]);

  return (
    <ModusWcAutocomplete
      ref={autocompleteRef}
      bordered={bordered}
      disabled={disabled}
      multiSelect={multiSelect}
      items={items}
      value={value}
      placeholder={placeholder}
      label={label}
      size={size}
      debounceMs={debounceMs}
      minChars={minChars}
      leaveMenuOpen={leaveMenuOpen}
      showSpinner={showSpinner}
      noResults={noResults}
      customClass={customClass}
      readOnly={readOnly}
      required={required}
      inputId={inputId}
      inputTabIndex={inputTabIndex}
      name={name}
      aria-label={ariaLabel}
    >
      {children}
    </ModusWcAutocomplete>
  );
}
