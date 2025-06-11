import { describe, it, expect } from "vitest";
import { PlaylistDetailsHeader } from "@/components/PlaylistDetails/PlaylistDetailsHeader/PlaylistDetailsHeader";
import { createSinglePlaylistMock } from "@/utils/test-utils/mocks";
import { renderWithProvider } from "@/utils/test-utils/test-utils";

describe("PlaylistDetailsHeader", () => {
  const simplePlaylistMock = createSinglePlaylistMock();

  it("should display a prompt to select a playlist when no playlist is selected", () => {
    const { getByText } = renderWithProvider(
      <PlaylistDetailsHeader
        selectedPlaylistId={null}
        selectedPlaylist={null}
        isFetching={false}
      />
    );

    expect(getByText(/select a playlist to see details/i)).toBeInTheDocument();
  });

  it("should display a loading skeleton when a playlist is selected and is fetching data", () => {
    const { container } = renderWithProvider(
      <PlaylistDetailsHeader
        selectedPlaylistId="123"
        selectedPlaylist={null}
        isFetching={true}
      />
    );

    expect(container.querySelector(".animate-pulse")).toBeTruthy();
  });

  it("should display the playlist thumbnail when a playlist is selected and is not loading", () => {
    const { getByRole } = renderWithProvider(
      <PlaylistDetailsHeader
        selectedPlaylistId="123"
        selectedPlaylist={simplePlaylistMock}
        isFetching={false}
      />
    );
    const img = getByRole("img");
    expect(img).toHaveAttribute("src", simplePlaylistMock.images[0].url);
    expect(img).toHaveAttribute("alt", simplePlaylistMock.name);
  });

  it("should display the playlist name when a playlist is selected and is not loading", () => {
    const { getByText } = renderWithProvider(
      <PlaylistDetailsHeader
        selectedPlaylistId="123"
        selectedPlaylist={simplePlaylistMock}
        isFetching={false}
      />
    );
    expect(getByText(simplePlaylistMock.name)).toBeInTheDocument();
  });

  it("should display the playlist description when a playlist is selected and is not loading", () => {
    const { getByText } = renderWithProvider(
      <PlaylistDetailsHeader
        selectedPlaylistId="123"
        selectedPlaylist={simplePlaylistMock}
        isFetching={false}
      />
    );
    expect(getByText(simplePlaylistMock.description!)).toBeInTheDocument();
  });

  it.each([
    { value: /Test Owner/ },
    { value: /10/ },
    { value: /1,625/ },
    { value: /Public/ },
    { value: /No/ },
    { value: /12345678.../ },
  ])(
    "should display the correct detail value when a playlist is selected and is not loading",
    async ({ value }) => {
      const { getByText } = renderWithProvider(
        <PlaylistDetailsHeader
          selectedPlaylistId="123"
          selectedPlaylist={simplePlaylistMock}
          isFetching={false}
        />
      );

      expect(getByText(value)).toBeInTheDocument();
    }
  );

  it("should render a link to open the playlist in spotify when a playlist is selected and is not loading", () => {
    const { getByText } = renderWithProvider(
      <PlaylistDetailsHeader
        selectedPlaylistId="123"
        selectedPlaylist={simplePlaylistMock}
        isFetching={false}
      />
    );

    const link = getByText(/open in spotify/i);
    expect(link).toHaveAttribute(
      "href",
      simplePlaylistMock.external_urls.spotify
    );
  });
});
