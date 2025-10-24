import { createContext } from "react";

export type Theme =
  | "modus-classic-light"
  | "modus-classic-dark"
  | "modus-modern-light"
  | "modus-modern-dark"
  | "connect-light"
  | "connect-dark";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isModern: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
