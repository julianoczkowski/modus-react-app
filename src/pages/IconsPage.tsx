import DemoPage from "../components/DemoPage";
import DemoExample from "../components/DemoExample";
import { modusIcons, totalIconCount, categoryCount } from "../data/modusIcons";

/**
 * Renders a page that displays all available Modus icons.
 * @returns {JSX.Element} The rendered icons page.
 */
export default function IconsPage() {
  return (
    <DemoPage
      title="Modus Icons Gallery"
      description="Complete showcase of all available Modus icons organized by category. Click on any icon to copy its name."
    >
      <DemoExample
        title="Icon Usage"
        description="All icons use the modus-icons class with kebab-case names. Size with Tailwind classes and color with design system colors."
      >
        <div className="flex flex-col gap-4">
          <div className="text-sm text-muted-foreground">
            Total Icons:{" "}
            <div className="font-semibold text-foreground inline">
              {totalIconCount}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Categories:{" "}
            <div className="font-semibold text-foreground inline">
              {categoryCount}
            </div>
          </div>
        </div>
      </DemoExample>

      {Object.entries(modusIcons).map(([categoryName, icons]) => (
        <DemoExample
          key={categoryName}
          title={categoryName}
          description={`${icons.length} icons in this category`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {icons.map((iconName) => (
              <div
                key={iconName}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted-foreground/20 transition-colors cursor-pointer group"
                onClick={() => {
                  navigator.clipboard.writeText(iconName);
                  // You could add a toast notification here
                }}
                title={`Click to copy: ${iconName}`}
              >
                <i
                  className={`modus-icons text-2xl text-foreground group-hover:text-primary transition-colors`}
                >
                  {iconName}
                </i>
                <div className="text-xs text-muted-foreground text-center break-all leading-tight">
                  {iconName}
                </div>
              </div>
            ))}
          </div>
        </DemoExample>
      ))}
    </DemoPage>
  );
}
