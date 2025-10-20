import React, { useState, useRef, useEffect } from "react";
import "./Tooltip.css";

/**
 * Accessible tooltip component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Element that triggers the tooltip
 * @param {string} props.text - Tooltip text content
 * @param {string} props.position - Tooltip position: 'top', 'bottom', 'left', 'right'
 * @param {number} props.delay - Delay in milliseconds before showing tooltip
 * @returns {JSX.Element} Tooltip component
 */
export default function Tooltip({
  children,
  text,
  position = "top",
  delay = 200,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    } else if (event.key === "Escape") {
      hideTooltip();
    }
  };

  // Handle focus events for accessibility
  const handleFocus = () => {
    showTooltip();
  };

  const handleBlur = () => {
    hideTooltip();
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="tooltip-container">
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-describedby={isVisible ? "tooltip-text" : undefined}
        aria-expanded={isVisible}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip-text"
          className={`tooltip tooltip-${position}`}
          role="tooltip"
          aria-live="polite"
        >
          {text}
        </div>
      )}
    </div>
  );
}
