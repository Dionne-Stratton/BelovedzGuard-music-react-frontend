import React from "react";
import Toast from "./Toast";
import "./Toast.css";

/**
 * Container component that manages multiple toast notifications
 * Handles positioning, stacking, and cleanup of toast messages
 *
 * @param {Object} props - Component props
 * @param {Array} props.toasts - Array of toast objects
 * @param {Function} props.removeToast - Function to remove a toast by ID
 * @returns {JSX.Element} ToastContainer component
 */
export default function ToastContainer({ toasts = [], removeToast }) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="toast-container"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          autoClose={toast.autoClose}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
