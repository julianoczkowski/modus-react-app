

import { useEffect, useRef } from "react";
import { ModusWcRating } from "@trimble-oss/moduswebcomponents-react";

type RatingVariant = "star" | "heart" | "smiley" | "thumb";
type RatingSize = "sm" | "md" | "lg";

export interface RatingChangeDetail {
  newRating: number;
}

export interface ModusRatingProps {
  variant?: RatingVariant;
  count?: number;
  value?: number;
  allowHalf?: boolean;
  size?: RatingSize;
  disabled?: boolean;
  customClass?: string;
  "aria-label"?: string;
  getAriaLabelText?: (ratingValue: number) => string;
  onRatingChange?: (event: CustomEvent<RatingChangeDetail>) => void;
}

export default function ModusRating({
  variant = "smiley",
  count = 5,
  value = 0,
  allowHalf = false,
  size = "md",
  disabled = false,
  customClass,
  "aria-label": ariaLabel,
  getAriaLabelText,
  onRatingChange,
}: ModusRatingProps) {
  const ratingRef = useRef<HTMLModusWcRatingElement>(null);

  useEffect(() => {
    const rating = ratingRef.current;
    if (!rating) {
      return;
    }

    if (getAriaLabelText) {
      rating.getAriaLabelText = getAriaLabelText;
      return () => {
        rating.getAriaLabelText = undefined;
      };
    }

    return;
  }, [getAriaLabelText]);

  useEffect(() => {
    const rating = ratingRef.current;
    if (!rating || !onRatingChange) {
      return;
    }

    const handleRatingChange = (event: Event) => {
      onRatingChange(event as CustomEvent<RatingChangeDetail>);
    };

    rating.addEventListener("ratingChange", handleRatingChange);

    return () => {
      rating.removeEventListener("ratingChange", handleRatingChange);
    };
  }, [onRatingChange]);

  return (
    <ModusWcRating
      ref={ratingRef}
      variant={variant}
      count={count}
      value={value}
      allowHalf={allowHalf}
      size={size}
      disabled={disabled}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
