import { describe, it, expect, vi, beforeEach } from "vitest";
import { Navbar } from "./Navbar";
import { createUserMock } from "@/utils/test-utils/mocks";
import { renderWithProvider } from "@/utils/test-utils/test-utils";

vi.mock(import("@/components/Navbar/LoginButton/LoginButton"), () => ({
  LoginButton: () => <button data-testid="login-button">Login</button>,
}));

vi.mock(import("@/components/Navbar/SignOutButton/SignOutButton"), () => ({
  SignOutButton: () => <button data-testid="signout-button">Sign Out</button>,
}));

describe("Navbar", () => {
  const userMock = createUserMock();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title", () => {
    const { getByText } = renderWithProvider(<Navbar user={null} />);

    expect(getByText(/playlist analyzer/i)).toBeInTheDocument();
  });

  it("renders a skip to main content button for screen readers", () => {
    const { getByText } = renderWithProvider(<Navbar user={null} />);
    const skipBtn = getByText(/skip to main content/i);

    expect(skipBtn).toBeInTheDocument();
    expect(skipBtn).toHaveAttribute("href", "#playlist-search-input");
  });

  it("renders a login button if user is logged off", () => {
    const { getByTestId } = renderWithProvider(<Navbar user={null} />);

    expect(getByTestId("login-button")).toBeInTheDocument();
  });

  it("renders a sign out button if user is logged in", () => {
    const { getByTestId } = renderWithProvider(<Navbar user={userMock} />);

    expect(getByTestId("signout-button")).toBeInTheDocument();
  });

  it("renders a user profile picture if logged in", () => {
    const { getByAltText } = renderWithProvider(<Navbar user={userMock} />);

    const img = getByAltText(userMock.display_name!);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", userMock.images?.[0]?.url);
  });

  it("renders the user display name when logged in", () => {
    const { getByText } = renderWithProvider(<Navbar user={userMock} />);

    expect(getByText("Test User")).toBeInTheDocument();
  });
});
