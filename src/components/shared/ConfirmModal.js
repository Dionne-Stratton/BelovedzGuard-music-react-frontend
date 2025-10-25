import React from "react";
import { WarningIcon, InfoIcon } from "./Icons";
import "./ConfirmModal.css";

/**
 * Confirmation modal component for critical actions
 * Replaces browser confirm() with themed modal
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {string} props.title - Modal title
 * @param {string} props.message - Confirmation message
 * @param {Function} props.onConfirm - Callback when user confirms
 * @param {Function} props.onCancel - Callback when user cancels
 * @param {string} props.confirmText - Text for confirm button (default: "Confirm")
 * @param {string} props.cancelText - Text for cancel button (default: "Cancel")
 * @param {string} props.type - Modal type: 'danger', 'warning', 'info' (default: 'info')
 * @returns {JSX.Element} Confirmation modal component
 */
export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info",
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <WarningIcon size={24} />;
      case "warning":
        return <WarningIcon size={24} />;
      case "info":
      default:
        return <InfoIcon size={24} />;
    }
  };

  return (
    <div className="confirm-modal-backdrop" onClick={handleBackdropClick}>
      <div className={`confirm-modal confirm-modal-${type}`}>
        <div className="confirm-modal-header">
          <span className="confirm-modal-icon" aria-hidden="true">
            {getIcon()}
          </span>
          <h3 className="confirm-modal-title">{title}</h3>
        </div>

        <div className="confirm-modal-body">
          <p className="confirm-modal-message">{message}</p>
        </div>

        <div className="confirm-modal-footer">
          <button
            type="button"
            className="confirm-modal-btn confirm-modal-btn-cancel"
            onClick={handleCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`confirm-modal-btn confirm-modal-btn-confirm confirm-modal-btn-${type}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
