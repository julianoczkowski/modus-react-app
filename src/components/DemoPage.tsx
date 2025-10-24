import type { ReactNode } from "react";
import ModusButton from "./ModusButton";

interface DemoPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function DemoPage({
  title,
  description,
  children,
}: DemoPageProps) {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <ModusButton
          variant="filled"
          color="tertiary"
          size="md"
          onButtonClick={handleBackClick}
        >
          <i className="modus-icons">arrow_back</i> Back
        </ModusButton>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-semibold text-foreground">{title}</div>
        <div className="text-base text-foreground opacity-80  ">
          {description}
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
