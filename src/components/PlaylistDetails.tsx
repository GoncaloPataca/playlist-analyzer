import { PlaylistDetailsHeader } from "./PlaylistDetailsHeader";
import { TrackGrid } from "./TrackGrid";

export function PlaylistDetails({
  selectedPlaylistId,
  selectedPlaylist,
  isFetching,
}: Readonly<{
  selectedPlaylistId: string | null;
  selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null | undefined;
  isFetching: boolean;
}>) {
  return (
    <section className="flex flex-col gap-8 items-start w-full">
      <PlaylistDetailsHeader
        selectedPlaylistId={selectedPlaylistId}
        selectedPlaylist={selectedPlaylist}
        isFetching={isFetching}
      />
      {selectedPlaylistId && (
        <TrackGrid playlistId={selectedPlaylist?.id} isFetching={isFetching} />
      )}
    </section>
  );
}
