

import { useEffect, useRef } from "react";
import { ModusWcBreadcrumbs } from "@trimble-oss/moduswebcomponents-react";

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export interface ModusBreadcrumbsProps {
  items: BreadcrumbItem[];
  size?: "sm" | "md" | "lg";
  customClass?: string;
  "aria-label"?: string;
  onBreadcrumbClick?: (event: CustomEvent<BreadcrumbItem>) => void;
}

export default function ModusBreadcrumbs({
  items,
  size = "md",
  customClass,
  "aria-label": ariaLabel,
  onBreadcrumbClick,
}: ModusBreadcrumbsProps) {
  const breadcrumbsRef = useRef<HTMLModusWcBreadcrumbsElement>(null);

  useEffect(() => {
    const breadcrumbs = breadcrumbsRef.current;
    if (!breadcrumbs || !onBreadcrumbClick) return;

    const handleBreadcrumbClick = (event: Event) => {
      const customEvent = event as CustomEvent<BreadcrumbItem>;
      onBreadcrumbClick(customEvent);
    };

    breadcrumbs.addEventListener("breadcrumbClick", handleBreadcrumbClick);
    return () => {
      breadcrumbs.removeEventListener("breadcrumbClick", handleBreadcrumbClick);
    };
  }, [onBreadcrumbClick]);

  return (
    <ModusWcBreadcrumbs
      ref={breadcrumbsRef}
      items={items}
      size={size}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
