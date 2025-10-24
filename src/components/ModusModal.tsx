

import { ModusWcModal } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";
import { useRef, useEffect } from "react";

interface ModusModalProps {
  // Modal identification
  modalId: string;
  ariaLabel?: string;

  // Modal appearance
  backdrop?: "default" | "static";
  position?: "top" | "center" | "bottom";
  fullscreen?: boolean;
  showFullscreenToggle?: boolean;
  showClose?: boolean;
  customClass?: string;

  // Content slots
  header?: ReactNode;
  children: ReactNode; // Content slot
  footer?: ReactNode;

  // State management
  isOpen?: boolean;
  onClose?: () => void;

  // Styling
  className?: string;
}

export default function ModusModal({
  modalId,
  ariaLabel,
  backdrop = "default",
  position = "center",
  fullscreen = false,
  showFullscreenToggle = false,
  showClose = true,
  customClass,
  header,
  children,
  footer,
  isOpen = false,
  onClose,
  className,
}: ModusModalProps) {
  const modalRef = useRef<HTMLModusWcModalElement>(null);

  // Control modal visibility
  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      if (isOpen) {
        // Find the inner dialog element and call showModal
        const dialogElement = modal.querySelector("dialog");
        if (dialogElement) {
          dialogElement.showModal();
        }
      } else {
        // Find the inner dialog element and call close
        const dialogElement = modal.querySelector("dialog");
        if (dialogElement) {
          dialogElement.close();
        }
      }
    }
  }, [isOpen]);

  // Handle modal events
  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      const handleClose = () => {
        onClose?.();
      };

      // Listen for modal close events on the inner dialog
      const dialogElement = modal.querySelector("dialog");
      if (dialogElement) {
        dialogElement.addEventListener("close", handleClose);

        return () => {
          dialogElement.removeEventListener("close", handleClose);
        };
      }
    }
  }, [onClose]);

  return (
    <ModusWcModal
      ref={modalRef}
      modal-id={modalId}
      aria-label={ariaLabel}
      backdrop={backdrop}
      position={position}
      fullscreen={fullscreen}
      show-fullscreen-toggle={showFullscreenToggle}
      show-close={showClose}
      custom-class={customClass || className}
    >
      {header && <div slot="header">{header}</div>}
      <div slot="content">{children}</div>
      {footer && <div slot="footer">{footer}</div>}
    </ModusWcModal>
  );
}
