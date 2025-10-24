import { useCallback, useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import { ModusWcUtilityPanel } from "@trimble-oss/moduswebcomponents-react";

type UtilityPanelPosition = "left" | "right";

export interface ModusUtilityPanelProps {
  expanded?: boolean;
  position?: UtilityPanelPosition;
  pushContent?: boolean;
  panelWidth?: string;
  className?: string;
  children?: React.ReactNode;
  headerSlot?: React.ReactNode;
  headerText?: string;
  footerSlot?: React.ReactNode;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  onPanelOpened?: () => void;
  onPanelClosed?: () => void;
  onToggle?: (collapsed: boolean) => void;
  targetSelector?: string;
  targetElement?: HTMLElement | null;
}

export default function ModusUtilityPanel({
  expanded = false,
  position = "right",
  pushContent = false,
  panelWidth = "312px",
  className,
  children,
  headerSlot,
  headerText,
  footerSlot,
  ariaLabel,
  ariaExpanded,
  onPanelOpened,
  onPanelClosed,
  onToggle,
  targetSelector,
  targetElement,
}: ModusUtilityPanelProps) {
  const panelRef = useRef<HTMLModusWcUtilityPanelElement>(null);

  const resolvedTarget = useMemo(() => {
    if (targetElement) return targetElement;
    if (typeof document === "undefined") return undefined;
    if (targetSelector) {
      return document.querySelector<HTMLElement>(targetSelector) ?? undefined;
    }
    return undefined;
  }, [targetElement, targetSelector]);

  useEffect(() => {
    return () => {
      if (resolvedTarget) {
        resolvedTarget.classList.remove(
          "modus-wc-utility-panel-push-target-left"
        );
      }
    };
  }, [resolvedTarget]);
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    panel.expanded = expanded;
    panel.pushContent = pushContent;
    panel.targetElement = resolvedTarget;

    if (resolvedTarget) {
      if (position === "left" && pushContent) {
        resolvedTarget.classList.add("modus-wc-utility-panel-push-target-left");
      } else {
        resolvedTarget.classList.remove(
          "modus-wc-utility-panel-push-target-left"
        );
      }
    }
  }, [expanded, pushContent, resolvedTarget, position]);

  const handlePanelOpened = useCallback(() => {
    onPanelOpened?.();
    onToggle?.(false);
  }, [onPanelOpened, onToggle]);

  const handlePanelClosed = useCallback(() => {
    onPanelClosed?.();
    onToggle?.(true);
  }, [onPanelClosed, onToggle]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    panel.addEventListener("panelOpened", handlePanelOpened);
    panel.addEventListener("panelClosed", handlePanelClosed);

    return () => {
      panel.removeEventListener("panelOpened", handlePanelOpened);
      panel.removeEventListener("panelClosed", handlePanelClosed);
    };
  }, [handlePanelClosed, handlePanelOpened]);

  const positionClass =
    position === "left" ? "modus-utility-panel--left" : undefined;

  const combinedClass =
    [className, positionClass].filter(Boolean).join(" ") || undefined;

  const style = useMemo<CSSProperties | undefined>(() => {
    if (!panelWidth) return undefined;
    return {
      "--modus-wc-utility-panel-width": panelWidth,
    } as CSSProperties;
  }, [panelWidth]);

  const renderedHeader =
    headerSlot ??
    (headerText ? (
      <div className="text-xl font-bold text-foreground">{headerText}</div>
    ) : null);

  return (
    <ModusWcUtilityPanel
      ref={panelRef}
      expanded={expanded}
      pushContent={pushContent}
      className={combinedClass}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      style={style}
    >
      {renderedHeader && (
        <div slot="header" className="w-full min-w-full max-w-full block">
          {renderedHeader}
        </div>
      )}
      <div slot="body">{children}</div>
      {footerSlot && (
        <div slot="footer" className="w-full min-w-full max-w-full block">
          {footerSlot}
        </div>
      )}
    </ModusWcUtilityPanel>
  );
}
