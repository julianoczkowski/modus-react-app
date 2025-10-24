

import { ModusWcInputFeedback } from "@trimble-oss/moduswebcomponents-react";

export interface InputFeedbackProp {
  level: "error" | "info" | "success" | "warning";
  message?: string;
}

interface ModusInputFeedbackProps {
  level: "error" | "info" | "success" | "warning";
  message?: string;
  icon?: string;
  size?: "sm" | "md" | "lg";
  customClass?: string;
}

export default function ModusInputFeedback({
  level,
  message = "",
  icon,
  size = "md",
  customClass = "",
}: ModusInputFeedbackProps) {
  return (
    <ModusWcInputFeedback
      level={level}
      message={message}
      icon={icon}
      size={size}
      custom-class={customClass}
    />
  );
}
