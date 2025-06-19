import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProvider } from "@/utils/test-utils/test-utils";
import { LoginButton } from "@/components/Navbar/LoginLinkButton/LoginLinkButton";

const mocks = vi.hoisted(() => ({
  useSpotifyLogin: vi.fn(),
}));
vi.mock("@/hooks/useSpotifyLogin", async () => {
  return {
    useSpotifyLogin: mocks.useSpotifyLogin,
  };
});

describe("LoginButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a loading text while the code challenge is being generated", async () => {
    mocks.useSpotifyLogin.mockReturnValue({ loginUrl: undefined });
    const { getByText, getByRole } = renderWithProvider(<LoginButton />);
    expect(getByText(/loading/i)).toBeInTheDocument();
    await expect.element(getByRole("link")).not.toBeInTheDocument();
  });

  it("renders the Spotify icon and link when the code challenge is ready", () => {
    mocks.useSpotifyLogin.mockReturnValue({
      loginUrl: "https://spotify.com/login",
    });
    const { getByText, getByRole } = renderWithProvider(<LoginButton />);

    expect(getByText(/login with spotify/i)).toBeInTheDocument();
    const link = getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://spotify.com/login");
  });
});
