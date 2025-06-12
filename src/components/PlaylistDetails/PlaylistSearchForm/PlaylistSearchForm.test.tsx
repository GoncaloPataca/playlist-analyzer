import { describe, it, expect, vi, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { PlaylistSearchForm } from "./PlaylistSearchForm";
import { renderWithProvider } from "@/utils/test-utils/test-utils";
import { createUserMock } from "@/utils/test-utils/mocks";

const mocks = vi.hoisted(() => {
  const getPlaylist = vi.fn();
  class SpotifyWebApiMock {
    getPlaylist = getPlaylist;
  }
  return { getPlaylist, SpotifyWebApiMock };
});

vi.mock("spotify-web-api-js", () => {
  return mocks.SpotifyWebApiMock;
});

describe("PlaylistSearchForm", () => {
  const setSelectedPlaylistId = vi.fn();
  const userMock = createUserMock();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows 'URL is required.' when submitting with empty input", async () => {
    const { getByRole, getByText } = renderWithProvider(
      <PlaylistSearchForm
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={userMock}
      />
    );

    await userEvent.click(getByRole("button", { name: /search/i }));

    await expect.element(getByText(/url is required/i)).toBeVisible();
  });

  it("shows 'You must be logged in to search for playlists.' when user is not logged in", async () => {
    const { getByRole, getByText, getByLabelText } = renderWithProvider(
      <PlaylistSearchForm
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={null}
      />
    );
    await userEvent.type(
      getByLabelText(/spotify playlist url/i),
      "https://open.spotify.com/playlist/123"
    );
    await userEvent.click(getByRole("button", { name: /search/i }));

    expect(getByText(/you must be logged in/i)).toBeInTheDocument();
  });

  it("shows 'Invalid Spotify playlist URL.' when input is not a valid playlist url", async () => {
    const { getByRole, getByText, getByLabelText } = renderWithProvider(
      <PlaylistSearchForm
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={userMock}
      />
    );

    await userEvent.type(getByLabelText(/spotify playlist url/i), "not a url");
    await userEvent.click(getByRole("button", { name: /search/i }));

    expect(getByText(/invalid spotify playlist url/i)).toBeInTheDocument();
  });

  it("shows 'Playlist not found or not accessible.' when API throws", async () => {
    mocks.getPlaylist.mockRejectedValueOnce(new Error("not found"));
    const { getByRole, getByText, getByLabelText } = renderWithProvider(
      <PlaylistSearchForm
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={userMock}
      />
    );

    await userEvent.type(
      getByLabelText(/spotify playlist url/i),
      "https://open.spotify.com/playlist/123"
    );
    await userEvent.click(getByRole("button", { name: /search/i }));

    expect(
      getByText(/playlist not found or not accessible/i)
    ).toBeInTheDocument();
  });

  it("calls setSelectedPlaylistId with playlist id on valid input and successful fetch", async () => {
    mocks.getPlaylist.mockResolvedValueOnce({ id: "123" });
    const { getByRole, getByLabelText } = renderWithProvider(
      <PlaylistSearchForm
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={userMock}
      />
    );

    await userEvent.type(
      getByLabelText(/spotify playlist url/i),
      "https://open.spotify.com/playlist/123"
    );
    await userEvent.click(getByRole("button", { name: /search/i }));

    await waitFor(() =>
      expect(setSelectedPlaylistId).toHaveBeenCalledWith("123")
    );
  });

  it("disables input and button while loading", async () => {
    mocks.getPlaylist.mockReturnValue(
      new Promise(() => setTimeout(() => {}, 5000))
    );

    const { getByRole, getByPlaceholder } = renderWithProvider(
      <PlaylistSearchForm
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={userMock}
      />
    );

    const input = getByPlaceholder(/spotify playlist url/i);
    const button = getByRole("button", { name: /search/i });

    await userEvent.type(input, "https://open.spotify.com/playlist/123");
    await userEvent.click(button);

    expect(input).toBeDisabled();
    expect(getByRole("button", { name: /searching/i })).toBeDisabled();
  });

  it("trims whitespace from input before sending the request", async () => {
    mocks.getPlaylist.mockResolvedValueOnce({ id: "123" });
    const { getByRole, getByLabelText } = renderWithProvider(
      <PlaylistSearchForm
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={userMock}
      />
    );

    await userEvent.type(
      getByLabelText(/Spotify Playlist URL/i),
      "  https://open.spotify.com/playlist/123             "
    );
    await userEvent.click(getByRole("button", { name: /search/i }));

    await waitFor(() =>
      expect(setSelectedPlaylistId).toHaveBeenCalledWith("123")
    );
  });
});
