import {
  ModusWcAccordion,
  ModusWcCollapse,
} from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";

interface CollapseOptions {
  title: string;
  description?: string;
  icon?: string;
  iconAriaLabel?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

interface AccordionItem {
  id: string;
  options: CollapseOptions;
  content: ReactNode;
  expanded?: boolean;
  bordered?: boolean;
}

interface ModusAccordionProps {
  items: AccordionItem[];
  customClass?: string;
  onExpandedChange?: (
    event: CustomEvent<{ expanded: boolean; index: number }>
  ) => void;
  className?: string;
}

export default function ModusAccordion({
  items,
  customClass = "",
  onExpandedChange,
  className = "",
}: ModusAccordionProps) {
  return (
    <div className={className}>
      <ModusWcAccordion
        custom-class={customClass}
        onExpandedChange={onExpandedChange}
      >
        {items.map((item) => (
          <ModusWcCollapse
            key={item.id}
            id={`collapse-${item.id}`}
            collapse-id={item.id}
            bordered={item.bordered || false}
            options={item.options}
            expanded={item.expanded}
          >
            <div slot="content">{item.content}</div>
          </ModusWcCollapse>
        ))}
      </ModusWcAccordion>
    </div>
  );
}
