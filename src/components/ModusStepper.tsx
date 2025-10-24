

import { useEffect, useRef } from "react";
import { ModusWcStepper } from "@trimble-oss/moduswebcomponents-react";

export type StepperColor =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";

export interface ModusStepperItem {
  label?: string;
  color?: StepperColor;
  content?: string;
  customClass?: string;
}

export interface ModusStepperProps {
  steps: ModusStepperItem[];
  orientation?: "horizontal" | "vertical";
  customClass?: string;
  ariaLabel?: string;
}

export default function ModusStepper({
  steps,
  orientation = "horizontal",
  customClass,
  ariaLabel = "Workflow progress",
}: ModusStepperProps) {
  const stepperRef = useRef<HTMLModusWcStepperElement>(null);

  // Keep steps array in sync (assign new array for stencil change detection)
  useEffect(() => {
    const stepper = stepperRef.current;
    if (!stepper) {
      return;
    }

    stepper.steps = steps.map((step) => ({ ...step }));
  }, [steps]);

  // Keep custom class up to date
  useEffect(() => {
    const stepper = stepperRef.current;
    if (!stepper) {
      return;
    }

    stepper.customClass = customClass;
  }, [customClass]);

  return (
    <ModusWcStepper
      ref={stepperRef}
      orientation={orientation}
      aria-label={ariaLabel}
      custom-class={customClass}
    />
  );
}
