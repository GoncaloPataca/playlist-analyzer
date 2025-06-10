import { describe, it, expect, vi, beforeEach } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { LoginButton } from "./LoginButton";
import { renderWithProvider } from "@/utils/test-utils/test-utils";

const loginMock = vi.fn();
vi.mock(import("@/hooks/useSpotifyLogin"), () => ({
  useSpotifyLogin: () => ({
    login: loginMock,
  }),
}));

describe("LoginButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Spotify icon and text", () => {
    const { getByText, getByRole } = renderWithProvider(<LoginButton />);
    expect(getByText(/login with spotify/i)).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("calls login when button is clicked", async () => {
    const { getByRole } = renderWithProvider(<LoginButton />);
    await userEvent.click(getByRole("button"));
    expect(loginMock).toHaveBeenCalledTimes(1);
  });
});
