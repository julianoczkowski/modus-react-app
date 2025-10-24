"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusSideNavigation, {
  type ModusSideNavigationItem,
} from "../../components/ModusSideNavigation";
import ModusButton from "../../components/ModusButton";

// Navigation items with proper Modus icons (using correct icon names from modus-icons-nextjs.mdc)
const navigationItems: ModusSideNavigationItem[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    startIcon: "dashboard",
    selected: true,
  },
  { label: "Projects", value: "projects", startIcon: "folder_open" },
  { label: "Teams", value: "teams", startIcon: "people_group" },
  { label: "Reports", value: "reports", startIcon: "bar_graph" },
  { label: "Analytics", value: "analytics", startIcon: "line_graph" },
  { label: "Settings", value: "settings", startIcon: "settings" },
  { label: "Help", value: "help", startIcon: "help" },
];

export default function SideNavigationDemoPage() {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<ModusSideNavigationItem | null>(null);

  const handleItemSelect = (item: ModusSideNavigationItem) => {
    setSelectedItem(item);
    console.log("Selected item:", item);
  };

  const handleExpandedChange = (isExpanded: boolean) => {
    setExpanded(isExpanded);
    console.log("Navigation expanded:", isExpanded);
  };

  return (
    <DemoPage
      title="Modus Side Navigation"
      description="Side navigation gives people persistent access to major areas of the product. Keep the list short and use icons when it helps recognition."
    >
      <DemoExample
        title="Side Navigation with Icons"
        description="A collapsible vertical navigation component that shows icons in both collapsed (4rem width) and expanded states. Icons remain visible in collapsed state for easy recognition."
      >
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex gap-4 items-center">
            <ModusButton
              color="primary"
              size="sm"
              onButtonClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Collapse" : "Expand"} Navigation
            </ModusButton>
            <div className="text-sm text-muted-foreground">
              Current state: {expanded ? "Expanded" : "Collapsed"}
            </div>
            {selectedItem && (
              <div className="text-sm text-muted-foreground">
                Selected: {selectedItem.label}
              </div>
            )}
          </div>

          {/* Navigation with content */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <ModusSideNavigation
                items={navigationItems}
                expanded={expanded}
                maxWidth="280px"
                size="md"
                collapseOnClickOutside={true}
                autoCollapseOnSelect={false}
                onItemSelect={handleItemSelect}
                onExpandedChange={handleExpandedChange}
              />
            </div>
            <div
              className="flex-1 p-6 bg-card rounded-lg"
              style={{
                border: "1px solid var(--border)",
                marginLeft: expanded ? "280px" : "64px",
                transition: "margin-left 0.2s ease-out",
              }}
            >
              <div className="text-xl font-semibold text-foreground mb-3">
                Main Content Area
              </div>
              <div className="text-muted-foreground mb-4">
                This demonstrates how the side navigation works alongside main
                content. The navigation can be collapsed to show only icons
                (4rem width) or expanded to show full labels with icons.
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Navigation State:</strong>{" "}
                  {expanded
                    ? "Expanded (shows labels + icons)"
                    : "Collapsed (shows icons only)"}
                </div>
                <div>
                  <strong>Collapsed Width:</strong> 4rem (64px)
                </div>
                <div>
                  <strong>Expanded Width:</strong> 280px
                </div>
                <div>
                  <strong>Icons Always Visible:</strong> Yes, in both states
                </div>
              </div>
            </div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
