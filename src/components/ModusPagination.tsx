

import { useEffect, useRef } from "react";
import { ModusWcPagination } from "@trimble-oss/moduswebcomponents-react";

export interface AriaLabelValues {
  firstPage?: string;
  previousPage?: string;
  page?: string;
  nextPage?: string;
  lastPage?: string;
}

export interface ModusPaginationProps {
  ariaLabel?: string;
  ariaLabelValues?: AriaLabelValues;
  count?: number;
  customClass?: string;
  nextButtonText?: string;
  page?: number;
  prevButtonText?: string;
  size?: "sm" | "md" | "lg";
  onPageChange?: (
    event: CustomEvent<{ newPage: number; prevPage: number }>
  ) => void;
}

export default function ModusPagination({
  ariaLabel,
  ariaLabelValues,
  count = 1,
  customClass,
  nextButtonText,
  page = 1,
  prevButtonText,
  size = "md",
  onPageChange,
}: ModusPaginationProps) {
  const paginationRef = useRef<HTMLModusWcPaginationElement>(null);

  useEffect(() => {
    const pagination = paginationRef.current;
    if (!pagination || !onPageChange) {
      return;
    }

    const handlePageChange = (event: Event) => {
      onPageChange(event as CustomEvent<{ newPage: number; prevPage: number }>);
    };

    pagination.addEventListener("pageChange", handlePageChange);

    return () => {
      pagination.removeEventListener("pageChange", handlePageChange);
    };
  }, [onPageChange]);

  return (
    <ModusWcPagination
      ref={paginationRef}
      aria-label={ariaLabel}
      ariaLabelValues={ariaLabelValues}
      count={count}
      custom-class={customClass}
      nextButtonText={nextButtonText}
      page={page}
      prevButtonText={prevButtonText}
      size={size}
    />
  );
}
