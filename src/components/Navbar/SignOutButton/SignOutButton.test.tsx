import { describe, it, expect, vi, beforeEach } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { SignOutButton } from "@/components/Navbar/SignOutButton/SignOutButton";
import { renderWithProvider } from "@/utils/test-utils/test-utils";
import { ACCESS_TOKEN_KEY, CODE_VERIFIER_KEY } from "@/constants/storageKeys";

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

describe("SignOutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    window.localStorage.setItem(ACCESS_TOKEN_KEY, "fake-token");
    window.localStorage.setItem(CODE_VERIFIER_KEY, "fake-code");
  });

  it("renders the sign out button", () => {
    const { getByRole } = renderWithProvider(<SignOutButton />);
    const button = getByRole("button", { name: /sign out/i });
    expect(button).toBeInTheDocument();
  });

  it("removes tokens from localStorage and navigates on click", async () => {
    const { getByRole } = renderWithProvider(<SignOutButton />);
    const button = getByRole("button", { name: /sign out/i });

    await userEvent.click(button);

    expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBeNull();
    expect(localStorage.getItem(CODE_VERIFIER_KEY)).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith(0);
  });
});
