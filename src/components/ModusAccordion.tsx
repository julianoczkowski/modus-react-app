import {
  ModusWcAccordion,
  ModusWcCollapse,
} from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";
import { useRef, useEffect } from "react";

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
  onExpandedChange?: (event: { expanded: boolean; index: number }) => void;
  className?: string;
}

export default function ModusAccordion({
  items,
  customClass = "",
  onExpandedChange,
  className = "",
}: ModusAccordionProps) {
  const accordionRef = useRef<HTMLModusWcAccordionElement>(null);

  // Set up event listener for accordion changes
  useEffect(() => {
    const accordion = accordionRef.current;
    if (accordion && onExpandedChange) {
      const handleExpandedChange = (event: Event) => {
        console.log("Accordion event received:", event);
        const customEvent = event as CustomEvent<{
          expanded: boolean;
          index: number;
        }>;
        console.log("Event detail:", customEvent.detail);
        onExpandedChange(customEvent.detail);
      };

      accordion.addEventListener("expandedChange", handleExpandedChange);

      return () => {
        accordion.removeEventListener("expandedChange", handleExpandedChange);
      };
    }
  }, [onExpandedChange]);

  return (
    <div className={className}>
      <ModusWcAccordion ref={accordionRef} custom-class={customClass}>
        {items.map((item) => (
          <ModusWcCollapse
            key={item.id}
            id={`collapse-${item.id}`}
            collapse-id={item.id}
            bordered={item.bordered || false}
            options={item.options}
          >
            <div slot="content">{item.content}</div>
          </ModusWcCollapse>
        ))}
      </ModusWcAccordion>
    </div>
  );
}
