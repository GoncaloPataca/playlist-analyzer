import { PlaylistDetailsHeader } from "@/components/PlaylistDetails/PlaylistDetailsHeader/PlaylistDetailsHeader";
import { TrackGrid } from "@/components/PlaylistDetails/TrackGrid/TrackGrid";

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
