import { ReactNode } from "react";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
  className?: string;
}

export function Modal({
  isOpen,
  // onClose,
  header,
  footer,
  children,
  className,
  maxWidth = "max-w-lg",
}: CommonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div
        className={`bg-white h-[95vh] flex flex-col justify-between rounded-3xl w-full  ${maxWidth} ${className}`}
      >
        {/* Header */}
        {header && <div className="p-6">{header}</div>}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>

        {/* Footer */}
        {footer && <div className="p-4 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}
