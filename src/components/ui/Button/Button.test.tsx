import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { userEvent } from "@vitest/browser/context";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });

  it("passes additional props to the button element", () => {
    render(
      <Button type="submit" data-testid="custom-button">
        Submit
      </Button>
    );
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
