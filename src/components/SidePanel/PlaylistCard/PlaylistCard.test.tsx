import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProvider } from "@/utils/test-utils/test-utils";
import { PlaylistCard } from "@/components/SidePanel/PlaylistCard/PlaylistCard";
import { createPlaylistMock } from "@/utils/test-utils/mocks";
import { userEvent } from "@vitest/browser/context";

describe("PlaylistCard", () => {
  const playlist = createPlaylistMock({ id: "1", name: "My Playlist" });
  const setSelectedPlaylistId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the playlist image", async () => {
    const { getByAltText } = renderWithProvider(
      <PlaylistCard
        userPlaylist={playlist}
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
      />
    );
    const img = getByAltText(playlist.name);
    expect(img).toBeVisible();
    expect(img).toHaveAttribute("src", playlist.images?.[0]?.url);
  });

  it("renders the playlist title", async () => {
    const { getByText } = renderWithProvider(
      <PlaylistCard
        userPlaylist={playlist}
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
      />
    );
    expect(getByText(playlist.name)).toBeVisible();
  });

  it("renders the number of tracks", async () => {
    const { getByText } = renderWithProvider(
      <PlaylistCard
        userPlaylist={playlist}
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
      />
    );
    expect(
      getByText(new RegExp(`${playlist.tracks.total} songs`, "i"))
    ).toBeVisible();
  });

  it("renders the playlist owner", async () => {
    const { getByText } = renderWithProvider(
      <PlaylistCard
        userPlaylist={playlist}
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
      />
    );

    expect(getByText(playlist.owner.display_name!)).toBeVisible();
  });

  it("fetches playlist details when clicked", async () => {
    const { getByRole } = renderWithProvider(
      <PlaylistCard
        userPlaylist={playlist}
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
      />
    );

    await userEvent.click(getByRole("button"));

    expect(setSelectedPlaylistId).toHaveBeenCalledWith(playlist.id);
  });

  it.each([["Enter"], ["Space"]])(
    "calls setSelectedPlaylistId when pressing %s",
    async (key) => {
      const { getByRole } = renderWithProvider(
        <PlaylistCard
          userPlaylist={playlist}
          selectedPlaylistId={null}
          setSelectedPlaylistId={setSelectedPlaylistId}
        />
      );
      const button = getByRole("button");
      await userEvent.type(button, `{${key}}`);
      expect(setSelectedPlaylistId).toHaveBeenCalledTimes(1);
    }
  );

  it("sets aria-pressed true when selected", async () => {
    const { getByRole } = renderWithProvider(
      <PlaylistCard
        userPlaylist={playlist}
        selectedPlaylistId={playlist.id}
        setSelectedPlaylistId={setSelectedPlaylistId}
      />
    );
    expect(getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("sets aria-pressed false when not selected", async () => {
    const { getByRole } = renderWithProvider(
      <PlaylistCard
        userPlaylist={playlist}
        selectedPlaylistId={null}
        setSelectedPlaylistId={setSelectedPlaylistId}
      />
    );
    expect(getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });
});
