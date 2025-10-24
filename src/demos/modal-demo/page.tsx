"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButton from "../../components/ModusButton";
import ModusModal from "../../components/ModusModal";

export default function ModalDemoPage() {
  const [isCenteredOpen, setIsCenteredOpen] = useState(false);
  const [isTopOpen, setIsTopOpen] = useState(false);
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isStaticOpen, setIsStaticOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  return (
    <DemoPage
      title="Modus Modal"
      description="Modals focus attention on a short, interruptive task. Keep content concise and provide a clear primary action."
    >
      <DemoExample
        title="Centered Dialog"
        description="Default centered modal for quick confirmations or lightweight forms."
      >
        <div className="space-y-4">
          <ModusButton onButtonClick={() => setIsCenteredOpen(true)}>
            Open Centered Modal
          </ModusButton>
          <ModusModal
            modalId="modal-centered"
            ariaLabel="Archive project"
            isOpen={isCenteredOpen}
            onClose={() => setIsCenteredOpen(false)}
            header={
              <div className="text-xl font-semibold text-foreground">
                Archive project
              </div>
            }
            footer={
              <div className="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => setIsCenteredOpen(false)}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  color="danger"
                  onButtonClick={() => setIsCenteredOpen(false)}
                >
                  Archive
                </ModusButton>
              </div>
            }
          >
            <div className="text-sm text-foreground opacity-80">
              Archived projects are hidden from your active workspace. You can
              restore them later from the settings panel.
            </div>
          </ModusModal>
        </div>
      </DemoExample>

      <DemoExample
        title="Position Variants"
        description="Different vertical positions for various use cases."
      >
        <div className="flex gap-4 flex-wrap">
          <ModusButton onButtonClick={() => setIsTopOpen(true)}>
            Top Position
          </ModusButton>
          <ModusButton onButtonClick={() => setIsBottomOpen(true)}>
            Bottom Position
          </ModusButton>
        </div>

        <ModusModal
          modalId="modal-top"
          ariaLabel="Top positioned modal"
          isOpen={isTopOpen}
          onClose={() => setIsTopOpen(false)}
          position="top"
          header={
            <div className="text-xl font-semibold text-foreground">
              Top Modal
            </div>
          }
          footer={
            <div className="flex gap-2">
              <ModusButton
                variant="borderless"
                onButtonClick={() => setIsTopOpen(false)}
              >
                Cancel
              </ModusButton>
              <ModusButton onButtonClick={() => setIsTopOpen(false)}>
                Confirm
              </ModusButton>
            </div>
          }
        >
          <div className="text-sm text-foreground opacity-80">
            This modal appears at the top of the screen. Useful for
            notifications or quick actions.
          </div>
        </ModusModal>

        <ModusModal
          modalId="modal-bottom"
          ariaLabel="Bottom positioned modal"
          isOpen={isBottomOpen}
          onClose={() => setIsBottomOpen(false)}
          position="bottom"
          header={
            <div className="text-xl font-semibold text-foreground">
              Bottom Modal
            </div>
          }
          footer={
            <div className="flex gap-2">
              <ModusButton
                variant="borderless"
                onButtonClick={() => setIsBottomOpen(false)}
              >
                Cancel
              </ModusButton>
              <ModusButton onButtonClick={() => setIsBottomOpen(false)}>
                Confirm
              </ModusButton>
            </div>
          }
        >
          <div className="text-sm text-foreground opacity-80">
            This modal appears at the bottom of the screen. Great for mobile
            interfaces.
          </div>
        </ModusModal>
      </DemoExample>

      <DemoExample
        title="Fullscreen Modal"
        description="Full-screen modals for complex workflows or detailed content."
      >
        <div className="space-y-4">
          <ModusButton onButtonClick={() => setIsFullscreenOpen(true)}>
            Open Fullscreen Modal
          </ModusButton>
          <ModusModal
            modalId="modal-fullscreen"
            ariaLabel="Fullscreen modal"
            isOpen={isFullscreenOpen}
            onClose={() => setIsFullscreenOpen(false)}
            fullscreen={true}
            showFullscreenToggle={true}
            header={
              <div className="text-xl font-semibold text-foreground">
                Fullscreen Modal
              </div>
            }
            footer={
              <div className="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => setIsFullscreenOpen(false)}
                >
                  Cancel
                </ModusButton>
                <ModusButton onButtonClick={() => setIsFullscreenOpen(false)}>
                  Save Changes
                </ModusButton>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="text-sm text-foreground opacity-80">
                This is a fullscreen modal that covers the entire viewport.
                Perfect for complex forms or detailed content.
              </div>
              <div className="text-sm text-foreground opacity-80">
                You can toggle between fullscreen and normal size using the
                button in the header.
              </div>
            </div>
          </ModusModal>
        </div>
      </DemoExample>

      <DemoExample
        title="Static Backdrop"
        description="Modal that doesn't close when clicking outside - user must use explicit actions."
      >
        <div className="space-y-4">
          <ModusButton onButtonClick={() => setIsStaticOpen(true)}>
            Open Static Modal
          </ModusButton>
          <ModusModal
            modalId="modal-static"
            ariaLabel="Static backdrop modal"
            isOpen={isStaticOpen}
            onClose={() => setIsStaticOpen(false)}
            backdrop="static"
            header={
              <div className="text-xl font-semibold text-foreground">
                Important Action
              </div>
            }
            footer={
              <div className="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => setIsStaticOpen(false)}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  color="danger"
                  onButtonClick={() => setIsStaticOpen(false)}
                >
                  Delete Forever
                </ModusButton>
              </div>
            }
          >
            <div className="text-sm text-foreground opacity-80">
              This modal has a static backdrop. Clicking outside won&apos;t
              close it - you must use the buttons or press Escape.
            </div>
          </ModusModal>
        </div>
      </DemoExample>

      <DemoExample
        title="Custom Styling"
        description="Modal with custom dimensions and styling."
      >
        <div className="space-y-4">
          <ModusButton onButtonClick={() => setIsCustomOpen(true)}>
            Open Custom Modal
          </ModusButton>
          <ModusModal
            modalId="modal-custom"
            ariaLabel="Custom styled modal"
            isOpen={isCustomOpen}
            onClose={() => setIsCustomOpen(false)}
            customClass="expanded-modal"
            header={
              <div className="text-xl font-semibold text-foreground">
                Custom Size Modal
              </div>
            }
            footer={
              <div className="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => setIsCustomOpen(false)}
                >
                  Cancel
                </ModusButton>
                <ModusButton onButtonClick={() => setIsCustomOpen(false)}>
                  Save
                </ModusButton>
              </div>
            }
          >
            <div className="text-sm text-foreground opacity-80">
              This modal has custom dimensions applied via CSS classes. The
              modal is wider and taller than the default.
            </div>
          </ModusModal>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
