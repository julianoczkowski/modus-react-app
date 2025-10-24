

import { useEffect, useRef, useState } from "react";
import { ModusWcTable } from "@trimble-oss/moduswebcomponents-react";

export interface TableColumn {
  id: string;
  header: string;
  accessor: string;
  width?: string;
  sortable?: boolean;
  editor?: "number" | "text" | "autocomplete" | "date" | "custom";
  cellRenderer?: (value: unknown, row: unknown) => string | HTMLElement;
  customEditorRenderer?: (
    value: unknown,
    onCommit: (value: unknown) => void
  ) => HTMLElement;
}

export interface TableData {
  [key: string]: unknown;
}

export interface ModusTableProps {
  columns: TableColumn[];
  data: TableData[];
  currentPage?: number;
  pageSizeOptions?: number[];
  paginated?: boolean;
  showPageSizeSelector?: boolean;
  selectable?: "none" | "single" | "multi";
  selectedRowIds?: string[];
  sortable?: boolean;
  density?: "compact" | "comfortable" | "relaxed";
  editable?: boolean | ((row: unknown) => boolean);
  hover?: boolean;
  zebra?: boolean;
  customClass?: string;
  ariaLabel?: string;
  onCellEditStart?: (
    event: CustomEvent<{ rowIndex: number; colId: string }>
  ) => void;
  onCellEditCommit?: (
    event: CustomEvent<{
      rowIndex: number;
      colId: string;
      newValue: unknown;
      updatedRow: unknown;
    }>
  ) => void;
  onSortChange?: (
    event: CustomEvent<Array<{ columnId: string; direction: "asc" | "desc" }>>
  ) => void;
  onPaginationChange?: (
    event: CustomEvent<{ currentPage: number; pageSize: number }>
  ) => void;
  onRowClick?: (event: CustomEvent<{ row: unknown; index: number }>) => void;
  onRowSelectionChange?: (
    event: CustomEvent<{ selectedRows: unknown[]; selectedRowIds: string[] }>
  ) => void;
}

export default function ModusTable({
  columns,
  data,
  currentPage = 1,
  pageSizeOptions = [5, 10, 15],
  paginated = false,
  showPageSizeSelector = true,
  selectable = "none",
  selectedRowIds,
  sortable = true,
  density = "comfortable",
  editable = false,
  hover = true,
  zebra = false,
  customClass,
  ariaLabel,
  onCellEditStart,
  onCellEditCommit,
  onSortChange,
  onPaginationChange,
  onRowClick,
  onRowSelectionChange,
}: ModusTableProps) {
  const tableRef = useRef<HTMLModusWcTableElement>(null);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Event handlers setup - moved to after component initialization
  useEffect(() => {
    const table = tableRef.current;
    if (!table || !mounted) return;

    console.log("Setting up event listeners on initialized table");

    const handleCellEditStart = (event: Event) => {
      console.log("Cell edit start event received:", event);
      const customEvent = event as CustomEvent<{
        rowIndex: number;
        colId: string;
      }>;
      onCellEditStart?.(customEvent);
    };

    const handleCellEditCommit = (event: Event) => {
      console.log("Cell edit commit event received:", event);
      const customEvent = event as CustomEvent<{
        rowIndex: number;
        colId: string;
        newValue: unknown;
        updatedRow: unknown;
      }>;
      onCellEditCommit?.(customEvent);
    };

    const handleSortChange = (event: Event) => {
      const customEvent = event as CustomEvent<
        Array<{ columnId: string; direction: "asc" | "desc" }>
      >;
      onSortChange?.(customEvent);
    };

    const handlePaginationChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        currentPage: number;
        pageSize: number;
      }>;
      onPaginationChange?.(customEvent);
    };

    const handleRowClick = (event: Event) => {
      const customEvent = event as CustomEvent<{ row: unknown; index: number }>;
      onRowClick?.(customEvent);
    };

    const handleRowSelectionChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        selectedRows: unknown[];
        selectedRowIds: string[];
      }>;
      onRowSelectionChange?.(customEvent);
    };

    // Add event listeners
    if (onCellEditStart)
      table.addEventListener("cellEditStart", handleCellEditStart);
    if (onCellEditCommit)
      table.addEventListener("cellEditCommit", handleCellEditCommit);
    if (onSortChange) table.addEventListener("sortChange", handleSortChange);
    if (onPaginationChange)
      table.addEventListener("paginationChange", handlePaginationChange);
    if (onRowClick) table.addEventListener("rowClick", handleRowClick);
    if (onRowSelectionChange)
      table.addEventListener("rowSelectionChange", handleRowSelectionChange);

    return () => {
      // Cleanup event listeners
      if (onCellEditStart)
        table.removeEventListener("cellEditStart", handleCellEditStart);
      if (onCellEditCommit)
        table.removeEventListener("cellEditCommit", handleCellEditCommit);
      if (onSortChange)
        table.removeEventListener("sortChange", handleSortChange);
      if (onPaginationChange)
        table.removeEventListener("paginationChange", handlePaginationChange);
      if (onRowClick) table.removeEventListener("rowClick", handleRowClick);
      if (onRowSelectionChange)
        table.removeEventListener(
          "rowSelectionChange",
          handleRowSelectionChange
        );
    };
  }, [
    mounted,
    onCellEditStart,
    onCellEditCommit,
    onSortChange,
    onPaginationChange,
    onRowClick,
    onRowSelectionChange,
  ]);

  // Ensure props are set on the web component after mounting
  useEffect(() => {
    const table = tableRef.current;
    if (!table || !mounted) return;

    console.log("Setting props on web component:", { columns, data, editable });

    // Force update the web component with the props
    if (columns && columns.length > 0) {
      table.columns = columns;
    }
    if (data && data.length > 0) {
      table.data = data;
    }
    if (editable !== undefined) {
      table.editable = editable;
    }
  }, [mounted, columns, data, editable]);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return <div className="animate-pulse h-32 bg-muted rounded"></div>;
  }

  return (
    <ModusWcTable
      ref={tableRef}
      columns={columns}
      data={data}
      currentPage={currentPage}
      pageSizeOptions={pageSizeOptions}
      paginated={paginated}
      showPageSizeSelector={showPageSizeSelector}
      selectable={selectable}
      selectedRowIds={selectedRowIds}
      sortable={sortable}
      density={density}
      editable={editable}
      hover={hover}
      zebra={zebra}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
