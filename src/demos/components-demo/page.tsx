import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusAccordion from "../../components/ModusAccordion";
import ModusAlert from "../../components/ModusAlert";
import ModusButton from "../../components/ModusButton";
import ModusCard from "../../components/ModusCard";
import ModusTextInput from "../../components/ModusTextInput";
import ModusSelect from "../../components/ModusSelect";
import ModusCheckbox from "../../components/ModusCheckbox";
import ModusSwitch from "../../components/ModusSwitch";
import ModusBadge from "../../components/ModusBadge";
import ModusChip from "../../components/ModusChip";
import ModusProgress from "../../components/ModusProgress";
import ModusSlider from "../../components/ModusSlider";
import ModusRating from "../../components/ModusRating";
import ModusTable from "../../components/ModusTable";
import ModusNavbar from "../../components/ModusNavbar";
import ModusBreadcrumbs from "../../components/ModusBreadcrumbs";
import ModusStepper from "../../components/ModusStepper";
import ModusTabs from "../../components/ModusTabs";
import ModusIcon from "../../components/ModusIcon";
import ModusAvatar from "../../components/ModusAvatar";
import ModusDivider from "../../components/ModusDivider";
import ModusSkeleton from "../../components/ModusSkeleton";
import ModusLoader from "../../components/ModusLoader";

const onboardingItems = [
  {
    id: "welcome",
    options: {
      title: "Welcome to Modus Components",
      description: "Get started with our comprehensive component library",
      icon: "rocket_launch",
      size: "md" as const,
    },
    content: (
      <div className="flex flex-col gap-2 text-foreground">
        <div className="text-sm opacity-80">
          Modus Web Components provide a consistent, accessible, and beautiful
          user interface for your React applications.
        </div>
        <div className="text-sm opacity-80">
          Each component is built with accessibility in mind and follows modern
          design principles.
        </div>
      </div>
    ),
    bordered: true,
  },
  {
    id: "features",
    options: {
      title: "Key Features",
      description: "Discover what makes Modus special",
      icon: "star",
      size: "md" as const,
    },
    content: (
      <div className="flex flex-col gap-2 text-foreground">
        <div className="text-sm opacity-80">
          • Fully accessible components with ARIA support
        </div>
        <div className="text-sm opacity-80">
          • Theme support with light and dark modes
        </div>
        <div className="text-sm opacity-80">
          • TypeScript support for better development experience
        </div>
        <div className="text-sm opacity-80">
          • Consistent design system across all components
        </div>
      </div>
    ),
    bordered: true,
  },
];

const tableData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
  },
];

const navbarItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "products", label: "Products", icon: "inventory" },
  { id: "about", label: "About", icon: "info" },
  { id: "contact", label: "Contact", icon: "mail" },
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Showcase" },
];

const stepperSteps = [
  { label: "Setup", description: "Install dependencies" },
  { label: "Configure", description: "Configure your app" },
  { label: "Import", description: "Import components" },
  { label: "Use", description: "Start building" },
];

const tabItems = [
  { id: "overview", label: "Overview" },
  { id: "examples", label: "Examples" },
  { id: "api", label: "API" },
  { id: "accessibility", label: "Accessibility" },
];

export default function ComponentsDemoPage() {
  return (
    <DemoPage
      title="Modus Components Showcase"
      description="A comprehensive demonstration of Modus Web Components in a React Vite application. Each component is showcased with practical examples and real-world use cases."
    >
      <DemoExample
        title="Alert Messages"
        description="Use alerts to communicate important information to users with appropriate visual hierarchy."
      >
        <div className="flex flex-col gap-4">
          <ModusAlert
            alertTitle="Success!"
            alertDescription="Your changes have been saved successfully."
            variant="success"
            icon="check_circle"
          />
          <ModusAlert
            alertTitle="Warning"
            alertDescription="Please review your input before proceeding."
            variant="warning"
            icon="warning"
            dismissible
          />
          <ModusAlert
            alertTitle="Information"
            alertDescription="Here's some helpful information for you."
            variant="info"
            icon="info"
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Action Buttons"
        description="Buttons provide clear call-to-action elements with various styles and states."
      >
        <div className="flex flex-wrap gap-4">
          <ModusButton color="primary">Primary Action</ModusButton>
          <ModusButton color="secondary">Secondary</ModusButton>
          <ModusButton color="tertiary">Tertiary</ModusButton>
          <ModusButton color="warning">Warning</ModusButton>
          <ModusButton color="danger">Danger</ModusButton>
          <ModusButton variant="outlined">Outlined</ModusButton>
          <ModusButton variant="borderless">Borderless</ModusButton>
          <ModusButton icon="save_disk" iconPosition="left">
            Save
          </ModusButton>
          <ModusButton
            icon="settings"
            iconPosition="only"
            ariaLabel="Settings"
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Content Cards"
        description="Cards organize related information and actions in a contained, scannable format."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ModusCard
            title="Basic Card"
            subtitle="A simple card with content"
            bordered
          >
            <div className="text-card-foreground">
              This is the main content of the card. It can contain any type of
              content including text, images, or other components.
            </div>
          </ModusCard>
          <ModusCard
            title="Interactive Card"
            subtitle="Card with action buttons"
            bordered
            actions={
              <div className="flex gap-2">
                <ModusButton size="sm" variant="outlined">
                  Cancel
                </ModusButton>
                <ModusButton size="sm">Save</ModusButton>
              </div>
            }
          >
            <div className="text-card-foreground">
              This card includes action buttons in the footer area for user
              interactions.
            </div>
          </ModusCard>
        </div>
      </DemoExample>

      <DemoExample
        title="Form Inputs"
        description="Input components for collecting user data with proper validation and accessibility."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ModusTextInput
              label="Text Input"
              placeholder="Enter your text here"
              value=""
            />
            <ModusSelect
              label="Country"
              options={[
                { label: "United States", value: "us" },
                { label: "Canada", value: "ca" },
                { label: "United Kingdom", value: "uk" },
              ]}
              value=""
            />
          </div>
          <div className="space-y-4">
            <ModusCheckbox label="I agree to the terms and conditions" />
            <ModusSwitch label="Enable notifications" />
            <div className="flex items-center gap-4">
              <ModusIcon name="home" />
              <ModusIcon name="settings" />
              <ModusIcon name="mail" />
              <ModusAvatar name="John Doe" />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Accordion Navigation"
        description="Use accordions to progressively disclose information without overwhelming the interface."
      >
        <ModusAccordion items={onboardingItems} />
      </DemoExample>

      <DemoExample
        title="Status Indicators"
        description="Components for showing status, progress, and user feedback."
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <ModusBadge text="New" />
            <ModusBadge text="Updated" />
            <ModusChip text="React" />
            <ModusChip text="TypeScript" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-foreground mb-2">
                Project Progress
              </div>
              <ModusProgress value={75} />
            </div>
            <div>
              <div className="text-sm text-foreground mb-2">Volume Control</div>
              <ModusSlider value={50} />
            </div>
            <div>
              <div className="text-sm text-foreground mb-2">Product Rating</div>
              <ModusRating value={4} />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Navigation Components"
        description="Components for site navigation and user orientation."
      >
        <div className="space-y-6">
          <div>
            <div className="text-sm text-foreground mb-2">
              Breadcrumb Navigation
            </div>
            <ModusBreadcrumbs items={breadcrumbItems} />
          </div>
          <div>
            <div className="text-sm text-foreground mb-2">Step Progress</div>
            <ModusStepper steps={stepperSteps} currentStep={2} />
          </div>
          <div>
            <div className="text-sm text-foreground mb-2">Tab Navigation</div>
            <ModusTabs items={tabItems} />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Data Display"
        description="Components for presenting structured data and information."
      >
        <div className="space-y-4">
          <div className="text-sm text-foreground mb-2">Data Table</div>
          <ModusTable
            data={tableData}
            columns={[
              { key: "name", header: "Name" },
              { key: "email", header: "Email" },
              { key: "role", header: "Role" },
              { key: "status", header: "Status" },
            ]}
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Main Navigation"
        description="Primary navigation components for application structure."
      >
        <div className="space-y-4">
          <div className="text-sm text-foreground mb-2">Navigation Bar</div>
          <ModusNavbar items={navbarItems} />
        </div>
      </DemoExample>

      <DemoExample
        title="Utility Components"
        description="Helper components for loading states, visual separation, and layout assistance."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ModusSkeleton />
            <ModusLoader />
          </div>
          <ModusDivider />
          <div className="text-sm text-foreground opacity-80">
            Utility components help create better user experiences with loading
            states, visual separation, and layout assistance.
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
