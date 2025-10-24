import type { ReactNode } from "react";
import { ModusWcCard } from "@trimble-oss/moduswebcomponents-react";

export interface ModusCardProps {
  children?: ReactNode;
  backgroundFigure?: boolean;
  bordered?: boolean;
  layout?: "vertical" | "horizontal";
  padding?: "normal" | "compact";
  customClass?: string;
  "aria-label"?: string;
  header?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
}

export default function ModusCard({
  children,
  backgroundFigure = false,
  bordered = false,
  layout = "vertical",
  padding = "normal",
  customClass,
  "aria-label": ariaLabel,
  header,
  title,
  subtitle,
  actions,
  footer,
}: ModusCardProps) {
  return (
    <ModusWcCard
      backgroundFigure={backgroundFigure}
      bordered={bordered}
      layout={layout}
      padding={padding}
      customClass={customClass}
      aria-label={ariaLabel}
    >
      {header && <div slot="header">{header}</div>}
      {title && <div slot="title">{title}</div>}
      {subtitle && <div slot="subtitle">{subtitle}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
      {footer && <div slot="footer">{footer}</div>}
    </ModusWcCard>
  );
}
