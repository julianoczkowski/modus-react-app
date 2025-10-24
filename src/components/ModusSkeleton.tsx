

import { ModusWcSkeleton } from "@trimble-oss/moduswebcomponents-react";

type SkeletonShape = "circle" | "rectangle";

export interface ModusSkeletonProps {
  height?: string;
  width?: string;
  shape?: SkeletonShape;
  customClass?: string;
  ariaLabel?: string;
}

export default function ModusSkeleton({
  height,
  width,
  shape = "rectangle",
  customClass,
  ariaLabel = "Loading placeholder",
}: ModusSkeletonProps) {
  return (
    <ModusWcSkeleton
      height={height}
      width={width}
      shape={shape}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}
