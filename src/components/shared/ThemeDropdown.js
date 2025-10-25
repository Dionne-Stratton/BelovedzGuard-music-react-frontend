import React, { useState, useRef, useEffect } from "react";
import themes from "./themes"; // ✅ default export object (keys: Faith, Joy, ...; fields: icon, gradient)
import ThemeThumbnail from "./ThemeThumbnail";
import { ChevronDownIcon } from "./Icons";
import "./ThemeDropdown.css";

/**
 * ThemeDropdown component for selecting playlist themes
 * @param {object} props - Component props
 * @param {string} props.theme - Currently selected theme name
 * @param {function} props.onSelect - Callback function when theme is selected
 * @param {string} props.onSelect.themeKey - The selected theme key
 * @returns {JSX.Element} Theme dropdown component
 */
export default function ThemeDropdown({ theme, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const selected = themes[theme] || themes.Theme;
  const themeKeys = Object.keys(themes).filter((key) => key !== "Theme"); // Exclude "Theme" from dropdown options

  /**
   * Handle theme selection and close dropdown
   * @param {string} key - The theme key to select
   */
  const handlePick = (key) => {
    onSelect(key);
    setOpen(false);
    setSelectedIndex(0);
  };

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (event) => {
    if (!open) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % themeKeys.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? themeKeys.length - 1 : prev - 1
        );
        break;
      case "Enter":
        event.preventDefault();
        handlePick(themeKeys[selectedIndex]);
        break;
      case " ":
        event.preventDefault();
        handlePick(themeKeys[selectedIndex]);
        break;
      default:
        // Do nothing for other keys
        break;
    }
  };

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setSelectedIndex(0);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      className="pe-theme-dropdown-wrapper"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        className="pe-theme-dropdown"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          background:
            selected?.gradient || "linear-gradient(135deg, #555, #333)",
        }}
      >
        <span className="pe-theme-left">
          <span className="pe-theme-icon">
            {typeof selected?.icon === "string" &&
            selected.icon.startsWith("/") ? (
              <img src={selected.icon} alt="" className="pe-theme-svg-icon" />
            ) : typeof selected?.icon === "function" ? (
              <selected.icon size={20} />
            ) : (
              selected?.icon
            )}
          </span>
          <span className="pe-theme-name">{theme}</span>
        </span>
        <span className="pe-theme-chevron">
          <ChevronDownIcon size={14} />
        </span>
      </button>

      {open && (
        <div className="pe-theme-menu" role="listbox">
          {themeKeys.map((key, index) => {
            const t = themes[key];
            const isSelected = index === selectedIndex;
            return (
              <div
                key={key}
                className={`pe-theme-option ${isSelected ? "selected" : ""} ${
                  key === theme ? "selected-theme" : ""
                }`}
                style={{ background: t.gradient }}
                onClick={() => handlePick(key)}
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
              >
                <ThemeThumbnail image={t.imageMini} themeName={key} />
                <span className="pe-theme-name">{key}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
