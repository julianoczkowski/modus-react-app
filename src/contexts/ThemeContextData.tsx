import { createContext } from "react";

export type Theme =
  | "modus-classic-light"
  | "modus-classic-dark"
  | "modus-modern-light"
  | "modus-modern-dark"
  | "connect-light"
  | "connect-dark";

/**
 * Represents the shape of the theme context.
 */
export interface ThemeContextType {
  /** The current theme. */
  theme: Theme;
  /** A function to set the theme. */
  setTheme: (theme: Theme) => void;
  /** Whether the current theme is a dark theme. */
  isDark: boolean;
  /** Whether the current theme is a modern theme. */
  isModern: boolean;
}

/**
 * The context for managing the application's theme.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
