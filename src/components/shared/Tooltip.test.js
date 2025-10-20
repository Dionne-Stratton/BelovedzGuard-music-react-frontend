import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tooltip from "./Tooltip";

describe("Tooltip Component", () => {
  it("renders children correctly", () => {
    render(
      <Tooltip text="Test tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    render(
      <Tooltip text="Test tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);

    await waitFor(() => {
      expect(screen.getByText("Test tooltip")).toBeVisible();
    });
  });

  it("hides tooltip on mouse leave", async () => {
    render(
      <Tooltip text="Test tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);

    await waitFor(() => {
      expect(screen.getByText("Test tooltip")).toBeVisible();
    });

    fireEvent.mouseLeave(button);

    await waitFor(() => {
      const tooltip = screen.queryByText("Test tooltip");
      expect(tooltip).toBeNull();
    });
  });

  it("shows tooltip on focus for accessibility", async () => {
    render(
      <Tooltip text="Test tooltip">
        <button>Focus me</button>
      </Tooltip>
    );

    const button = screen.getByText("Focus me");
    fireEvent.focus(button);

    await waitFor(() => {
      expect(screen.getByText("Test tooltip")).toBeVisible();
    });
  });

  it("handles keyboard navigation", async () => {
    render(
      <Tooltip text="Test tooltip">
        <button>Press me</button>
      </Tooltip>
    );

    const button = screen.getByText("Press me");
    fireEvent.keyDown(button, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Test tooltip")).toBeVisible();
    });

    fireEvent.keyDown(button, { key: "Escape" });

    await waitFor(() => {
      const tooltip = screen.queryByText("Test tooltip");
      expect(tooltip).toBeNull();
    });
  });

  it("has proper accessibility attributes", () => {
    render(
      <Tooltip text="Test tooltip">
        <button>Accessible button</button>
      </Tooltip>
    );

    const wrapper = screen.getByRole("button", { expanded: false });
    expect(wrapper).toHaveAttribute("role", "button");
    expect(wrapper).toHaveAttribute("tabIndex", "0");
    expect(wrapper).toHaveAttribute("aria-expanded", "false");
  });
});
