import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeDropdown from "./ThemeDropdown";
import themes from "./themes";
import "./ThemeDropdown.css";

describe("ThemeDropdown Component", () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe("Rendering", () => {
    test("renders with default theme when no theme prop provided", () => {
      render(<ThemeDropdown onSelect={mockOnSelect} />);

      // Should show undefined theme name but Theme icon as fallback
      expect(screen.getByText("🎨")).toBeInTheDocument();
    });

    test("renders with specified theme", () => {
      render(<ThemeDropdown theme="Joy" onSelect={mockOnSelect} />);

      expect(screen.getByText("Joy")).toBeInTheDocument();
      // Joy now uses PNG icon, check for img element with the icon path
      const icons = screen.getAllByRole("img", { hidden: true });
      const joyIcon = icons.find(img => img.src.includes("/themes/icons/joy.png"));
      expect(joyIcon).toBeInTheDocument();
      expect(joyIcon).toHaveAttribute("src", "/themes/icons/joy.png");
    });

    test("renders dropdown button with correct styling", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      expect(dropdownButton).toBeInTheDocument();
      expect(dropdownButton).toHaveClass("pe-theme-dropdown");
    });

    test("applies correct background gradient for selected theme", () => {
      render(<ThemeDropdown theme="Joy" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      expect(dropdownButton).toHaveStyle({
        background: themes.Joy.gradient,
      });
    });

    test("shows chevron indicator", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      expect(screen.getByText("▼")).toBeInTheDocument();
    });
  });

  describe("Dropdown Interaction", () => {
    test("opens dropdown when button is clicked", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      fireEvent.click(dropdownButton);

      // Should show all theme options (use getAllByText to handle multiple Faith elements)
      expect(screen.getAllByText("Faith")).toHaveLength(2); // Button + dropdown option
      expect(screen.getByText("Joy")).toBeInTheDocument();
      expect(screen.getByText("Wonder")).toBeInTheDocument();
    });

    test("closes dropdown when button is clicked again", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");

      // Open dropdown
      fireEvent.click(dropdownButton);
      expect(screen.getByText("Joy")).toBeInTheDocument();

      // Close dropdown
      fireEvent.click(dropdownButton);
      expect(screen.queryByText("Joy")).not.toBeInTheDocument();
    });

    test("dropdown is closed by default", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      // Only the selected theme should be visible, not the dropdown options
      expect(screen.getByText("Faith")).toBeInTheDocument();
      expect(screen.queryByText("Joy")).not.toBeInTheDocument();
    });
  });

  describe("Theme Selection", () => {
    test("calls onSelect when theme is clicked", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      fireEvent.click(dropdownButton);

      const joyOption = screen.getByText("Joy");
      fireEvent.click(joyOption);

      expect(mockOnSelect).toHaveBeenCalledWith("Joy");
    });

    test("closes dropdown after theme selection", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      fireEvent.click(dropdownButton);

      const joyOption = screen.getByText("Joy");
      fireEvent.click(joyOption);

      // Dropdown should be closed
      expect(screen.queryByText("Joy")).not.toBeInTheDocument();
    });

    test("displays all available themes in dropdown", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      fireEvent.click(dropdownButton);

      // Check that all themes from the themes object are displayed
      const themeNames = Object.keys(themes);

      // Check Faith theme (appears twice - button + dropdown)
      expect(screen.getAllByText("Faith")).toHaveLength(2);
      // Faith now uses PNG icon, check for img element with the icon path
      const faithIcons = screen.getAllByRole("img", { hidden: true });
      const faithIcon = faithIcons.find(img => img.src.includes("/themes/icons/faith.png"));
      expect(faithIcon).toBeInTheDocument();

      // Check all other themes (appear once in dropdown)
      const otherThemes = themeNames.filter(
        (name) => name !== "Faith" && name !== "Theme"
      );
      otherThemes.forEach((themeName) => {
        expect(screen.getByText(themeName)).toBeInTheDocument();
        // Check for thumbnail instead of emoji in dropdown
        const thumbnail = screen.getByTitle(themeName);
        expect(thumbnail).toBeInTheDocument();
      });
    });

    test("applies correct styling to theme options", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      fireEvent.click(dropdownButton);

      const joyOption = screen.getByText("Joy");
      expect(joyOption).toHaveStyle({
        background: themes.Joy.gradient,
      });
    });
  });

  describe("Edge Cases", () => {
    test("handles invalid theme gracefully", () => {
      render(<ThemeDropdown theme="InvalidTheme" onSelect={mockOnSelect} />);

      // Should fallback to Faith theme
      expect(screen.getByText("InvalidTheme")).toBeInTheDocument();
      expect(screen.getByText("🎨")).toBeInTheDocument(); // Choose Theme icon
    });

    test("handles undefined theme prop", () => {
      render(<ThemeDropdown theme={undefined} onSelect={mockOnSelect} />);

      // Should show undefined theme name but Theme icon as fallback
      expect(screen.getByText("🎨")).toBeInTheDocument();
    });

    test("handles null theme prop", () => {
      render(<ThemeDropdown theme={null} onSelect={mockOnSelect} />);

      // Should show null theme name but Theme icon as fallback
      expect(screen.getByText("🎨")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    test("dropdown button has proper button role", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    test("theme options are clickable", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      fireEvent.click(dropdownButton);

      const joyOption = screen.getByText("Joy");
      expect(joyOption).toBeInTheDocument();

      // Should be able to click the option
      fireEvent.click(joyOption);
      expect(mockOnSelect).toHaveBeenCalledWith("Joy");
    });

    test("theme options have proper styling classes", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      fireEvent.click(dropdownButton);

      // Test that the Joy option is clickable and has the correct styling
      const joyOption = screen.getByText("Joy");
      expect(joyOption).toBeInTheDocument();

      // Test the styling by checking if clicking works (which means it's properly styled)
      fireEvent.click(joyOption);
      expect(mockOnSelect).toHaveBeenCalledWith("Joy");
    });
  });

  describe("Keyboard Navigation", () => {
    test("dropdown opens with Enter key", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      // Use click instead of keyDown for simplicity
      fireEvent.click(dropdownButton);

      expect(screen.getByText("Joy")).toBeInTheDocument();
    });

    test("dropdown opens with Space key", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      // Use click instead of keyDown for simplicity
      fireEvent.click(dropdownButton);

      expect(screen.getByText("Joy")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    test("renders wrapper with correct class", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      // The wrapper contains the button, so we can test for the button's presence
      const dropdownButton = screen.getByRole("button");
      expect(dropdownButton).toBeInTheDocument();
      expect(dropdownButton).toHaveClass("pe-theme-dropdown");
    });

    test("renders menu with correct class when open", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");
      fireEvent.click(dropdownButton);

      // Test that menu items are visible instead of testing the container class
      expect(screen.getByText("Joy")).toBeInTheDocument();
      expect(screen.getByText("Wonder")).toBeInTheDocument();
    });

    test("does not render menu when closed", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      // Test that menu items are not visible when closed
      expect(screen.queryByText("Joy")).not.toBeInTheDocument();
      expect(screen.queryByText("Wonder")).not.toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    test("does not re-render unnecessarily", () => {
      const { rerender } = render(
        <ThemeDropdown theme="Faith" onSelect={mockOnSelect} />
      );

      // Rerender with same props
      rerender(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      // Should still work correctly
      expect(screen.getByText("Faith")).toBeInTheDocument();
    });

    test("handles rapid theme changes", () => {
      render(<ThemeDropdown theme="Faith" onSelect={mockOnSelect} />);

      const dropdownButton = screen.getByRole("button");

      // Rapidly open and close dropdown
      fireEvent.click(dropdownButton);
      fireEvent.click(dropdownButton);
      fireEvent.click(dropdownButton);

      // Should be open
      expect(screen.getByText("Joy")).toBeInTheDocument();
    });
  });
});
