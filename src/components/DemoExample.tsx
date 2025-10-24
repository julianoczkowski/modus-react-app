import type { ReactNode } from "react";

interface DemoExampleProps {
  title: string;
  description: string | ReactNode;
  children: ReactNode;
}

export default function DemoExample({
  title,
  description,
  children,
}: DemoExampleProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-card p-6 border-default">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-medium text-foreground">{title}</div>
        <div className="text-sm text-foreground opacity-80">{description}</div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function DemoExampleClean({
  title,
  description,
  children,
}: DemoExampleProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-6 border-dashed">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-medium text-foreground">{title}</div>
        <div className="text-sm text-foreground opacity-80">{description}</div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
