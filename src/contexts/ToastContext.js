import React, { createContext, useContext } from "react";
import { useToast } from "../hooks/useToast";

const ToastContext = createContext();

/**
 * Toast context provider component
 * Makes toast functionality available to all child components
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} ToastContext provider
 */
export function ToastProvider({ children }) {
  const toastMethods = useToast();

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook to access toast methods from context
 * @returns {Object} Toast management utilities
 */
export function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }

  return context;
}

export default ToastContext;
