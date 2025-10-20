import React, { useState } from "react";
import themes from "./themes"; // ✅ default export object (keys: Faith, Joy, ...; fields: icon, gradient)
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

  const selected = themes[theme] || themes.Faith;

  /**
   * Handle theme selection and close dropdown
   * @param {string} key - The theme key to select
   */
  const handlePick = (key) => {
    onSelect(key);
    setOpen(false);
  };

  return (
    <div className="pe-theme-dropdown-wrapper">
      <button
        type="button"
        className="pe-theme-dropdown"
        onClick={() => setOpen((o) => !o)}
        style={{
          background:
            selected?.gradient || "linear-gradient(135deg, #555, #333)",
        }}
      >
        <span className="pe-theme-left">
          <span className="pe-theme-icon">{selected?.icon}</span>
          <span className="pe-theme-name">{theme}</span>
        </span>
        <span className="pe-theme-chevron">▼</span>
      </button>

      {open && (
        <div className="pe-theme-menu">
          {Object.keys(themes).map((key) => {
            const t = themes[key];
            return (
              <div
                key={key}
                className="pe-theme-option"
                style={{ background: t.gradient }}
                onClick={() => handlePick(key)}
              >
                <span className="pe-theme-icon">{t.icon}</span>
                <span className="pe-theme-name">{key}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
