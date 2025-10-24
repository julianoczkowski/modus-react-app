import type { ReactNode } from "react";

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
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-semibold text-foreground">{title}</div>
        <div className="text-base text-foreground opacity-80 max-w-3xl">
          {description}
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
