import { useQuery } from "@tanstack/react-query";
import { getPlaylistTracks } from "@/api/spotifyApi";

export const usePlaylistTracks = (playlistId: string | undefined) => {
  return useQuery({
    queryKey: ["playlistTracks", playlistId],
    queryFn: async () => {
      if (!playlistId) return [];
      const playlistTracks = await getPlaylistTracks(playlistId);
      return playlistTracks
        .filter((playlistTrackItem) => playlistTrackItem.track)
        .map((playlistTrackItem) => {
          const track = playlistTrackItem.track as SpotifyApi.TrackObjectFull;
          return {
            name: track.name,
            artist: track.artists?.map((a) => a.name).join(", "),
            album: track.album?.name,
            duration_ms: track.duration_ms,
            popularity: track.popularity,
            explicit: track.explicit,
            added_at: playlistTrackItem.added_at,
          };
        });
    },
    enabled: !!playlistId,
  });
};
