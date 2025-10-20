import { useState, useCallback } from "react";

/**
 * Custom hook for managing toast notifications
 * Provides methods to show different types of toast messages
 *
 * @returns {Object} Toast management utilities
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  /**
   * Generate a unique ID for the toast
   * @returns {string} Unique identifier
   */
  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * Add a new toast to the queue
   * @param {Object} toastConfig - Toast configuration
   * @param {string} toastConfig.message - The message to display
   * @param {string} toastConfig.type - Toast type: 'success', 'error', 'info', 'warning'
   * @param {number} toastConfig.duration - Auto-dismiss duration in milliseconds
   * @param {boolean} toastConfig.autoClose - Whether to auto-dismiss
   * @returns {string} The toast ID
   */
  const addToast = useCallback(
    ({ message, type = "info", duration = 5000, autoClose = true }) => {
      const id = generateId();
      const newToast = {
        id,
        message,
        type,
        duration,
        autoClose,
      };

      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    [generateId]
  );

  /**
   * Remove a toast by ID
   * @param {string} id - Toast ID to remove
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Clear all toasts
   */
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  /**
   * Show a success toast
   * @param {string} message - Success message
   * @param {number} duration - Auto-dismiss duration (default: 4000)
   * @returns {string} Toast ID
   */
  const success = useCallback(
    (message, duration = 4000) => {
      return addToast({ message, type: "success", duration });
    },
    [addToast]
  );

  /**
   * Show an error toast
   * @param {string} message - Error message
   * @param {number} duration - Auto-dismiss duration (default: 6000)
   * @returns {string} Toast ID
   */
  const error = useCallback(
    (message, duration = 6000) => {
      return addToast({ message, type: "error", duration });
    },
    [addToast]
  );

  /**
   * Show a warning toast
   * @param {string} message - Warning message
   * @param {number} duration - Auto-dismiss duration (default: 5000)
   * @returns {string} Toast ID
   */
  const warning = useCallback(
    (message, duration = 5000) => {
      return addToast({ message, type: "warning", duration });
    },
    [addToast]
  );

  /**
   * Show an info toast
   * @param {string} message - Info message
   * @param {number} duration - Auto-dismiss duration (default: 5000)
   * @returns {string} Toast ID
   */
  const info = useCallback(
    (message, duration = 5000) => {
      return addToast({ message, type: "info", duration });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  };
}
