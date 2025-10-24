import "@trimble-oss/moduswebcomponents-react/modus-wc-styles.css";

interface ModusProviderProps {
  children: React.ReactNode;
}

export default function ModusProvider({ children }: ModusProviderProps) {
  return <>{children}</>;
}
