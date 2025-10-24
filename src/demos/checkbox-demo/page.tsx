"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusCheckbox from "../../components/ModusCheckbox";

export default function CheckboxDemoPage() {
  return (
    <DemoPage
      title="Modus Checkbox"
      description="Checkboxes capture yes or no choices. Use a short, actionable label and group related options vertically."
    >
      <DemoExample
        title="Notification preferences"
        description="List each subscription individually so people can mix and match."
      >
        <div className="flex flex-col gap-3">
          <ModusCheckbox label="Product updates" value />
          <ModusCheckbox label="Weekly summary" />
          <ModusCheckbox label="Maintenance alerts" />
        </div>
      </DemoExample>
      <DemoExample
        title="Mixed states"
        description="Use the indeterminate state when some nested items are selected."
      >
        <div className="flex flex-col gap-2">
          <ModusCheckbox label="Engineering teams" indeterminate />
          <div className="flex flex-col gap-2 pl-6">
            <ModusCheckbox label="API" value size="sm" />
            <ModusCheckbox label="Mobile" size="sm" />
            <ModusCheckbox label="Data platform" size="sm" />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
