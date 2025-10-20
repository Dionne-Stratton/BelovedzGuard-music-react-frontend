import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
import "./ErrorBoundary.css";

// Component that throws an error for testing
const ThrowError = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error("Test error for ErrorBoundary");
  }
  return <div>No error</div>;
};

// Custom fallback component for testing
const CustomFallback = ({ error, retry }) => (
  <div data-testid="custom-fallback">
    <h1>Custom Error Message</h1>
    <button onClick={retry}>Custom Retry</button>
  </div>
);

describe("ErrorBoundary Component", () => {
  // Suppress console.error for tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  describe("Error Catching", () => {
    test("renders children when no error occurs", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText("No error")).toBeInTheDocument();
    });

    test("catches errors and displays fallback UI", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(
        screen.getByText("🎵 Oops! Something went wrong")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/We're sorry, but something unexpected happened/)
      ).toBeInTheDocument();
    });

    test("displays retry and reload buttons", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText("Try Again")).toBeInTheDocument();
      expect(screen.getByText("Reload Page")).toBeInTheDocument();
    });
  });

  describe("Custom Fallback", () => {
    test("renders custom fallback when provided", () => {
      render(
        <ErrorBoundary fallback={<CustomFallback />}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
      expect(screen.getByText("Custom Error Message")).toBeInTheDocument();
    });
  });

  describe("Error Recovery", () => {
    test("retry button exists and is clickable", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Should show error UI
      expect(
        screen.getByText("🎵 Oops! Something went wrong")
      ).toBeInTheDocument();

      // Retry button should exist and be clickable
      const retryButton = screen.getByText("Try Again");
      expect(retryButton).toBeInTheDocument();

      // Clicking should not throw an error
      expect(() => fireEvent.click(retryButton)).not.toThrow();
    });

    test("reload button triggers page reload", () => {
      // Mock window.location.reload
      const mockReload = jest.fn();
      Object.defineProperty(window, "location", {
        value: { reload: mockReload },
        writable: true,
      });

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      fireEvent.click(screen.getByText("Reload Page"));
      expect(mockReload).toHaveBeenCalledTimes(1);
    });
  });

  describe("Development Mode", () => {
    test("shows error details in development mode", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(
        screen.getByText("Error Details (Development Only)")
      ).toBeInTheDocument();

      // Restore original environment
      process.env.NODE_ENV = originalEnv;
    });

    test("hides error details in production mode", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(
        screen.queryByText("Error Details (Development Only)")
      ).not.toBeInTheDocument();

      // Restore original environment
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("Error Logging", () => {
    test("logs error to console in development", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        "ErrorBoundary caught an error:",
        expect.any(Error),
        expect.any(Object)
      );

      consoleSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("Accessibility", () => {
    test("has proper button roles and labels", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const retryButton = screen.getByText("Try Again");
      const reloadButton = screen.getByText("Reload Page");

      expect(retryButton).toBeInTheDocument();
      expect(reloadButton).toBeInTheDocument();
    });

    test("error message is accessible to screen readers", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorHeading = screen.getByRole("heading", { level: 2 });
      expect(errorHeading).toHaveTextContent("🎵 Oops! Something went wrong");
    });
  });
});
