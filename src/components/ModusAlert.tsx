import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ModusWcAlert } from "@trimble-oss/moduswebcomponents-react";

export interface ModusAlertProps {
  alertTitle?: string;
  alertDescription?: string;
  variant?: "info" | "success" | "warning" | "error";
  dismissible?: boolean;
  icon?: string;
  role?: "alert" | "log" | "marquee" | "status" | "timer";
  customClass?: string;
  onDismissClick?: (event: CustomEvent<void>) => void;
  children?: ReactNode;
}

export default function ModusAlert({
  alertTitle,
  alertDescription,
  variant = "info",
  dismissible = false,
  icon,
  role = "status",
  customClass,
  onDismissClick,
  children,
}: ModusAlertProps) {
  const alertRef = useRef<HTMLModusWcAlertElement>(null);

  useEffect(() => {
    const alert = alertRef.current;
    if (!alert || !onDismissClick) return;

    const handleDismissClick = (event: Event) => {
      const customEvent = event as CustomEvent<void>;
      onDismissClick(customEvent);
    };

    alert.addEventListener("dismissClick", handleDismissClick);
    return () => {
      alert.removeEventListener("dismissClick", handleDismissClick);
    };
  }, [onDismissClick]);

  return (
    <ModusWcAlert
      ref={alertRef}
      alert-title={alertTitle}
      alert-description={alertDescription}
      variant={variant}
      dismissible={dismissible}
      icon={icon}
      role={role}
      custom-class={customClass}
    >
      {children}
    </ModusWcAlert>
  );
}
