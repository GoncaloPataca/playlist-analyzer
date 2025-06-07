import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";
import { renderWithProvider } from "../../../utils/test-utils";

describe("Button", () => {
  it("renders children", () => {
    renderWithProvider(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    renderWithProvider(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    renderWithProvider(<Button disabled>Disabled</Button>);
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });

  it("passes additional props to the button element", () => {
    renderWithProvider(
      <Button type="submit" data-testid="custom-button">
        Submit
      </Button>
    );
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
