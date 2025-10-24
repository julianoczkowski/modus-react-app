import DemoExample from "./DemoExample";
import DemoPage from "./DemoPage";
import type { ReactNode } from "react";

interface IndividualComponentDemoProps {
  title: string;
  description: string;
  examples: {
    title: string;
    description: string;
    children: ReactNode;
  }[];
}

export default function IndividualComponentDemo({
  title,
  description,
  examples,
}: IndividualComponentDemoProps) {
  return (
    <DemoPage title={title} description={description}>
      {examples.map((example, index) => (
        <DemoExample
          key={`${example.title}-${index}`}
          title={example.title}
          description={example.description}
        >
          {example.children}
        </DemoExample>
      ))}
    </DemoPage>
  );
}
