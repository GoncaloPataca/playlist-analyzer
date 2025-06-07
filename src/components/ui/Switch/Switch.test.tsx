import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { userEvent } from "@vitest/browser/context";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders as checked when checked prop is true", () => {
    render(<Switch checked={true} onChange={() => {}} />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toHaveAttribute("aria-checked", "true");
  });

  it("renders as unchecked when checked prop is false", () => {
    render(<Switch checked={false} onChange={() => {}} />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange with correct value when clicked", async () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    const switchEl = screen.getByRole("switch");
    await userEvent.click(switchEl);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Switch checked={false} onChange={() => {}} disabled />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeDisabled();
  });
});
