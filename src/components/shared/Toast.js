import React, { useState, useEffect, useCallback } from "react";
import { CheckIcon, CloseIcon, WarningIcon, InfoIcon } from "./Icons";
import "./Toast.css";

/**
 * Toast notification component
 * Displays temporary messages with auto-dismiss functionality
 *
 * @param {Object} props - Component props
 * @param {string} props.message - The message to display
 * @param {string} props.type - Toast type: 'success', 'error', 'info', 'warning'
 * @param {number} props.duration - Auto-dismiss duration in milliseconds (default: 5000)
 * @param {Function} props.onClose - Callback when toast is closed
 * @param {boolean} props.autoClose - Whether to auto-dismiss (default: true)
 * @param {string} props.id - Unique identifier for the toast
 * @returns {JSX.Element} Toast component
 */
export default function Toast({
  message,
  type = "info",
  duration = 5000,
  onClose,
  autoClose = true,
  id,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.(id);
    }, 300); // Animation duration
  }, [onClose, id]);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, handleClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckIcon size={18} />;
      case "error":
        return <CloseIcon size={18} />;
      case "warning":
        return <WarningIcon size={18} />;
      case "info":
      default:
        return <InfoIcon size={18} />;
    }
  };

  return (
    <div
      className={`toast toast-${type} ${
        isLeaving ? "toast-leaving" : "toast-entering"
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="toast-content">
        <span className="toast-icon" aria-hidden="true">
          {getIcon()}
        </span>
        <span className="toast-message">{message}</span>
        <button
          className="toast-close"
          onClick={handleClose}
          aria-label="Close notification"
          type="button"
        >
          <CloseIcon size={16} />
        </button>
      </div>
    </div>
  );
}
