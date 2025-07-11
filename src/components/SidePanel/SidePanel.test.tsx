import { describe, it, expect, vi, beforeEach } from "vitest";
import { SidePanel } from "@/components/SidePanel/SidePanel";
import { renderWithProvider } from "@/utils/test-utils/test-utils";
import {
  createSimplifiedPlaylistMock,
  createUserMock,
} from "@/utils/test-utils/mocks";

vi.mock(import("@/components/SidePanel/PlaylistCard/PlaylistCard"), () => ({
  PlaylistCard: ({ userPlaylist }: { userPlaylist: { id: string } }) => (
    <button data-testid={`playlist-card-${userPlaylist.id}`}>
      Playlist {userPlaylist.id}
    </button>
  ),
}));

const mocks = vi.hoisted(() => {
  const getMe = vi.fn();
  const setAccessToken = vi.fn();
  const getPlaylistTracks = vi.fn();
  const getUserPlaylists = vi.fn();
  const getPlaylist = vi.fn();

  class SpotifyWebApiMock {
    setAccessToken = setAccessToken;
    getMe = getMe;
    getPlaylistTracks = getPlaylistTracks;
    getUserPlaylists = getUserPlaylists;
    getPlaylist = getPlaylist;
  }

  return {
    getMe,
    setAccessToken,
    getPlaylistTracks,
    getUserPlaylists,
    getPlaylist,
    SpotifyWebApiMock,
  };
});

vi.mock("spotify-web-api-js", () => {
  return mocks.SpotifyWebApiMock;
});

describe("SidePanel", () => {
  const userMock = createUserMock();
  const setSelectedPlaylistId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display a login message when user is not logged in", () => {
    const { getByText } = renderWithProvider(
      <SidePanel
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={undefined}
      />
    );
    expect(
      getByText(/please log in to see your playlists/i)
    ).toBeInTheDocument();
  });

  it("should not retrieve playlists when user is not logged in", () => {
    renderWithProvider(
      <SidePanel
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={undefined}
      />
    );
    expect(mocks.getUserPlaylists).not.toHaveBeenCalled();
  });

  it("should show loading items when user is logged in and playlists are loading", async () => {
    mocks.getUserPlaylists.mockReturnValue(new Promise(() => {}));

    const { getByRole, getByText } = renderWithProvider(
      <SidePanel
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={userMock}
      />
    );

    expect(getByRole("listitem").all()).toHaveLength(6);
    expect(getByText(/your playlists/i)).toBeInTheDocument();
  });

  it("should call to retrieve playlists when user is logged in and playlists are loading", () => {
    mocks.getUserPlaylists.mockReturnValue(new Promise(() => {}));
    renderWithProvider(
      <SidePanel
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={userMock}
      />
    );
    expect(mocks.getUserPlaylists).toHaveBeenCalled();
  });

  it("should show loaded playlists when user is logged in and playlists are not loading anymore", async () => {
    const playlists = {
      items: [
        createSimplifiedPlaylistMock({ id: "1", name: "Playlist 1" }),
        createSimplifiedPlaylistMock({ id: "2", name: "Playlist 2" }),
      ],
    };
    mocks.getUserPlaylists.mockResolvedValue(playlists);

    const { getByTestId } = renderWithProvider(
      <SidePanel
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
        user={userMock}
      />
    );

    await expect.element(getByTestId(/playlist-card-1/)).toBeVisible();
    await expect.element(getByTestId(/playlist-card-2/)).toBeVisible();
  });
});
