import { ModusWcAvatar } from "@trimble-oss/moduswebcomponents-react";

export interface ModusAvatarProps {
  alt: string;
  imgSrc?: string;
  shape?: "circle" | "square";
  size?: "xs" | "sm" | "md" | "lg";
  customClass?: string;
}

export default function ModusAvatar({
  alt,
  imgSrc = "",
  shape = "circle",
  size = "md",
  customClass,
}: ModusAvatarProps) {
  return (
    <ModusWcAvatar
      alt={alt}
      imgSrc={imgSrc}
      shape={shape}
      size={size}
      customClass={customClass}
    />
  );
}
