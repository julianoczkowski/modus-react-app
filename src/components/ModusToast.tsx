

import { useEffect, useRef, useCallback } from "react";
import { ModusWcToast, ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import ModusAlert from "./ModusAlert";

export type ToastPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "middle-start"
  | "middle-center"
  | "middle-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ModusToastAction {
  label: string;
  color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  variant?: "filled" | "outlined" | "borderless";
  size?: "xs" | "sm" | "md" | "lg";
  dismissOnAction?: boolean;
  onClick?: (toastId: string) => void;
}

export interface ModusToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  dismissible?: boolean;
  delay?: number | null;
  position?: ToastPosition;
  customClass?: string;
  action?: ModusToastAction;
}

interface ModusToastProps {
  toasts: ModusToastItem[];
  defaultPosition?: ToastPosition;
  defaultDelay?: number | null;
  customClass?: string;
  className?: string;
  onDismiss?: (toastId: string) => void;
  onAction?: (toastId: string) => void;
}

export default function ModusToast({
  toasts,
  defaultPosition = "top-end",
  defaultDelay,
  customClass,
  className = "relative w-full pointer-events-none",
  onDismiss,
  onAction,
}: ModusToastProps) {
  const timers = useRef<Map<string, number>>(new Map());

  const handleDismiss = useCallback(
    (toastId: string) => {
      const timeoutId = timers.current.get(toastId);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timers.current.delete(toastId);
      }
      onDismiss?.(toastId);
    },
    [onDismiss]
  );

  const handleActionClick = useCallback(
    (toast: ModusToastItem) => {
      toast.action?.onClick?.(toast.id);
      onAction?.(toast.id);

      if (toast.action?.dismissOnAction !== false) {
        handleDismiss(toast.id);
      }
    },
    [handleDismiss, onAction]
  );

  const resolveDelay = useCallback(
    (toast: ModusToastItem) => {
      if (toast.delay === null) {
        return undefined;
      }
      if (typeof toast.delay === "number") {
        return toast.delay;
      }
      if (typeof defaultDelay === "number") {
        return defaultDelay;
      }
      return 4000;
    },
    [defaultDelay]
  );

  useEffect(() => {
    const activeToastIds = new Set(toasts.map((toast) => toast.id));

    timers.current.forEach((timeoutId, storedId) => {
      if (!activeToastIds.has(storedId)) {
        window.clearTimeout(timeoutId);
        timers.current.delete(storedId);
      }
    });

    toasts.forEach((toast) => {
      const delayMs = resolveDelay(toast);
      if (typeof delayMs === "number" && delayMs > 0 && !timers.current.has(toast.id)) {
        const timeoutId = window.setTimeout(() => {
          handleDismiss(toast.id);
        }, delayMs);
        timers.current.set(toast.id, timeoutId);
      }
    });
  }, [toasts, resolveDelay, handleDismiss]);

  useEffect(() => {
    const timersMap = timers.current;
    return () => {
      timersMap.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timersMap.clear();
    };
  }, []);

  return (
    <div className={className}>
      {toasts.map((toast) => {
        const resolvedDelay = resolveDelay(toast);
        const toastDelay =
          typeof resolvedDelay === "number" && resolvedDelay > 0 ? resolvedDelay : undefined;
        const toastPosition = toast.position ?? defaultPosition;

        return (
          <div key={toast.id} className="pointer-events-auto">
            <ModusWcToast
              position={toastPosition}
              delay={toastDelay}
              custom-class={toast.customClass ?? customClass}
            >
              <ModusAlert
                alertTitle={toast.title}
                alertDescription={toast.description}
                variant={toast.variant ?? "info"}
                dismissible={toast.dismissible}
                onDismissClick={() => handleDismiss(toast.id)}
              >
                {toast.action && (
                  <ModusWcButton
                    slot="button"
                    color={toast.action.color ?? "primary"}
                    variant={toast.action.variant ?? "filled"}
                    size={toast.action.size ?? "sm"}
                    onButtonClick={() => handleActionClick(toast)}
                  >
                    {toast.action.label}
                  </ModusWcButton>
                )}
              </ModusAlert>
            </ModusWcToast>
          </div>
        );
      })}
    </div>
  );
}
