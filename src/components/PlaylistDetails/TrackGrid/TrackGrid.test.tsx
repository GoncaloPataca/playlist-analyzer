import { describe, it, expect, vi, beforeEach } from "vitest";
import { waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TrackGrid } from "@/components/PlaylistDetails/TrackGrid/TrackGrid";
import { renderWithProvider } from "@/utils/test-utils/test-utils";
import {
  createPlaylistTrackMock,
  createTrackObjectFullMock,
} from "@/utils/test-utils/mocks";

const mocks = vi.hoisted(() => {
  const getPlaylistTracks = vi.fn();
  class SpotifyWebApiMock {
    getPlaylistTracks = getPlaylistTracks;
  }
  return { getPlaylistTracks, SpotifyWebApiMock };
});

vi.mock("spotify-web-api-js", () => {
  return mocks.SpotifyWebApiMock;
});

vi.mock("@/components/PlaylistDetails/ColumnsMenu", () => ({
  ColumnsMenu: ({
    onToggleColumn,
  }: {
    onToggleColumn: (field: string) => void;
  }) => (
    <button onClick={() => onToggleColumn("popularity")}>
      Toggle Popularity
    </button>
  ),
}));

describe("TrackGrid", () => {
  const playlistId = "playlist123";
  const playlistTracksMock = {
    items: [
      createPlaylistTrackMock({
        track: createTrackObjectFullMock({
          name: "Song A",
          duration_ms: 185000,
          popularity: 60,
          explicit: true,
        }),
        added_at: "2023-01-01T00:00:00Z",
      }),
      createPlaylistTrackMock({
        track: createTrackObjectFullMock({
          name: "Song B",
          duration_ms: 654321,
          popularity: 80,
          explicit: false,
        }),
        added_at: "2023-01-02T00:00:00Z",
      }),
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Renders default visible columns", async () => {
    mocks.getPlaylistTracks.mockResolvedValue([]);
    const { getByRole } = renderWithProvider(
      <TrackGrid playlistId={playlistId} isFetching={false} />
    );

    await waitFor(() => {
      expect(getByRole("columnheader", { name: "Track" })).toBeInTheDocument();
      expect(getByRole("columnheader", { name: "Artist" })).toBeInTheDocument();
      expect(getByRole("columnheader", { name: "Album" })).toBeInTheDocument();
      expect(
        getByRole("columnheader", { name: "Duration" })
      ).toBeInTheDocument();
      expect(
        getByRole("columnheader", { name: "Popularity" })
      ).toBeInTheDocument();
      expect(
        getByRole("columnheader", { name: "Explicit" })
      ).toBeInTheDocument();
    });
  });

  it("Toggles column visibility via ColumnsMenu", async () => {
    mocks.getPlaylistTracks.mockResolvedValue([]);
    const { getByRole } = renderWithProvider(
      <TrackGrid playlistId="playlist123" isFetching={false} />
    );

    const toggleBtn = getByRole("button", { name: "Toggle Popularity" });
    await userEvent.click(toggleBtn.element());

    await waitFor(() => {
      expect(
        screen.queryByRole("columnheader", { name: "Popularity" })
      ).not.toBeInTheDocument();
    });

    await userEvent.click(toggleBtn.element());

    await waitFor(() => {
      expect(
        getByRole("columnheader", { name: "Popularity" })
      ).toBeInTheDocument();
    });
  });

  it("Resets filter model for a column when hiding it", async () => {
    mocks.getPlaylistTracks.mockResolvedValue(playlistTracksMock);
    const { getByRole } = renderWithProvider(
      <TrackGrid playlistId="playlist123" isFetching={false} />
    );

    const popularityFilterInput = getByRole("spinbutton", {
      name: "Popularity Filter Input",
    });
    await expect.element(popularityFilterInput).toBeVisible();
    await userEvent.type(popularityFilterInput.element(), "60");

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(3);
    });

    const toggleBtn = getByRole("button", { name: "Toggle Popularity" });
    await userEvent.click(toggleBtn.element());

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(4);
    });
  });

  it("Clears all filters when Clear Filters button is clicked", async () => {
    mocks.getPlaylistTracks.mockResolvedValue(playlistTracksMock);
    const { getByRole, getByText } = renderWithProvider(
      <TrackGrid playlistId={playlistId} isFetching={false} />
    );

    const trackFilterInput = getByRole("textbox", {
      name: "Track Filter Input",
    });
    await expect.element(trackFilterInput).toBeVisible();
    await userEvent.type(trackFilterInput.element(), "Song A");

    const clearBtn = getByText(/Clear Filters/);
    await waitFor(() => {
      expect(clearBtn).not.toBeDisabled();
    });
    await userEvent.click(clearBtn.element());

    await waitFor(() => {
      expect(clearBtn).toBeDisabled();
    });
  });

  it("Disables Clear Filters button when no filters are active", async () => {
    mocks.getPlaylistTracks.mockResolvedValue([]);
    const { getByRole } = renderWithProvider(
      <TrackGrid playlistId={playlistId} isFetching={false} />
    );
    const clearBtn = getByRole("button", { name: /Clear Filters/ });

    expect(clearBtn).toBeDisabled();
  });

  it("Enables Clear Filters button when filters are applied", async () => {
    mocks.getPlaylistTracks.mockResolvedValue(playlistTracksMock);
    const { getByRole } = renderWithProvider(
      <TrackGrid playlistId={playlistId} isFetching={false} />
    );

    const trackFilterInput = getByRole("textbox", {
      name: "Track Filter Input",
    });
    await expect.element(trackFilterInput).toBeVisible();
    await userEvent.type(trackFilterInput.element(), "Song A");

    const clearBtn = screen.getByText(/Clear Filters/);
    await waitFor(() => {
      expect(clearBtn).not.toBeDisabled();
    });
  });

  it("Calls data fetching function with correct playlistId", async () => {
    mocks.getPlaylistTracks.mockResolvedValue([]);
    renderWithProvider(
      <TrackGrid playlistId={playlistId} isFetching={false} />
    );

    await waitFor(() => {
      expect(mocks.getPlaylistTracks).toHaveBeenCalledWith(playlistId);
    });
  });

  it("Displays loading state when data is being fetched", async () => {
    mocks.getPlaylistTracks.mockResolvedValue([]);
    const { getByText } = renderWithProvider(
      <TrackGrid playlistId={playlistId} isFetching={true} />
    );

    await waitFor(() => {
      expect(getByText(/Loading.../)).toBeInTheDocument();
    });
  });

  it("Formats duration in mm:ss format", async () => {
    mocks.getPlaylistTracks.mockResolvedValue(playlistTracksMock);
    renderWithProvider(
      <TrackGrid playlistId={playlistId} isFetching={false} />
    );
    await waitFor(() => {
      expect(screen.getByText("3:05")).toBeInTheDocument();
    });
  });

  it('Formats explicit field as "Yes" or "No"', async () => {
    mocks.getPlaylistTracks.mockResolvedValue(playlistTracksMock);
    const { getByText } = renderWithProvider(
      <TrackGrid playlistId={playlistId} isFetching={false} />
    );

    await waitFor(() => {
      expect(getByText("Yes")).toBeInTheDocument();
      expect(getByText("No")).toBeInTheDocument();
    });
  });
});
