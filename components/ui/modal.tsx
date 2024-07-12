import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeButtonActive?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose = () => {},
  children,
  closeButtonActive = false,
}: ModalProps) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center text-center z-50 overflow-y-auto px-2">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeButtonActive ? handleClose : undefined}
      ></div>
      <div className="relative bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        {children}
        {closeButtonActive && (
          <button
            className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
