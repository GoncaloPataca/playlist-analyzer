import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/dom";
import { PlaylistDetails } from "@/components/PlaylistDetails/PlaylistDetails";
import { renderWithProvider } from "@/utils/test-utils/test-utils";
import { createSinglePlaylistMock } from "@/utils/test-utils/mocks";

vi.mock(
  import(
    "@/components/PlaylistDetails/PlaylistDetailsHeader/PlaylistDetailsHeader"
  ),
  () => ({
    PlaylistDetailsHeader: () => (
      <div data-testid="playlist-details-header">PlaylistDetailsHeader</div>
    ),
  })
);

vi.mock(import("@/components/PlaylistDetails/TrackGrid/TrackGrid"), () => ({
  TrackGrid: ({ playlistId }) => (
    <div data-testid="track-grid" data-playlist-id={playlistId}>
      TrackGrid
    </div>
  ),
}));

describe("PlaylistDetails", () => {
  const singlePlaylistMock = createSinglePlaylistMock();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the playlistDetailsHeader", () => {
    const { getByTestId } = renderWithProvider(
      <PlaylistDetails
        selectedPlaylistId={null}
        selectedPlaylist={null}
        isFetching={false}
      />
    );

    expect(getByTestId("playlist-details-header")).toBeInTheDocument();
  });

  it("should not render a trackGrid when no playlist is selected", async () => {
    renderWithProvider(
      <PlaylistDetails
        selectedPlaylistId={null}
        selectedPlaylist={singlePlaylistMock}
        isFetching={false}
      />
    );

    expect(screen.queryByTestId("track-grid")).not.toBeInTheDocument();
  });

  it("should render a trackGrid when a playlist is selected", () => {
    const { getByTestId } = renderWithProvider(
      <PlaylistDetails
        selectedPlaylistId="123"
        selectedPlaylist={singlePlaylistMock}
        isFetching={false}
      />
    );
    expect(getByTestId("track-grid")).toBeInTheDocument();
  });

  it("should keep trackgrid rendered when switching selected playlists", () => {
    const { getByTestId, rerender } = renderWithProvider(
      <PlaylistDetails
        selectedPlaylistId="123"
        selectedPlaylist={singlePlaylistMock}
        isFetching={false}
      />
    );
    expect(getByTestId("track-grid")).toBeInTheDocument();

    const newPlaylist = createSinglePlaylistMock({ id: "456" });
    rerender(
      <PlaylistDetails
        selectedPlaylistId="456"
        selectedPlaylist={newPlaylist}
        isFetching={false}
      />
    );

    expect(getByTestId("track-grid")).toBeInTheDocument();
    expect(getByTestId("track-grid")).toHaveAttribute(
      "data-playlist-id",
      "456"
    );
  });
});
