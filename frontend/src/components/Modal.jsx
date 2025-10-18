import React from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionText,
  onActionClick,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose} // closes when clicking outside
      ></div>

      {/* Modal Content */}
      <div className="relative flex flex-col bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-6 z-10">
        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>
          </div>
        )}

        {/* Body (children passed from parent) */}
        <div className="flex-1">{children}</div>

        {/* Footer with optional action button */}
        {showActionBtn && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={onActionClick}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              {actionText || "Confirm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
