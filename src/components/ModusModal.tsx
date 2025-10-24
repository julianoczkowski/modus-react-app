import { ModusWcModal } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

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

  // Event handling
  onClose?: () => void;

  // Styling
  className?: string;
}

export interface ModusModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const ModusModal = forwardRef<ModusModalRef, ModusModalProps>(
  (
    {
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
      onClose,
      className,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLModusWcModalElement>(null);

    const openModal = () => {
      if (modalRef.current) {
        const dialog = modalRef.current.querySelector(
          "dialog"
        ) as HTMLDialogElement;
        if (dialog) {
          dialog.showModal();
        }
      }
    };

    const closeModal = () => {
      if (modalRef.current) {
        const dialog = modalRef.current.querySelector(
          "dialog"
        ) as HTMLDialogElement;
        if (dialog) {
          dialog.close();
        }
      }
    };

    useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    // Handle modal events
    useEffect(() => {
      const modal = modalRef.current;
      if (modal) {
        const handleClose = () => {
          onClose?.();
        };

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
);

ModusModal.displayName = "ModusModal";

export default ModusModal;
