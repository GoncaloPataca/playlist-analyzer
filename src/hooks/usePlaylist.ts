import { useQuery } from "@tanstack/react-query";
import { getPlaylistById } from "@/api/spotifyApi";

export const usePlaylist = (selectedPlaylistId: string | null) =>
  useQuery({
    queryKey: ["playlist", selectedPlaylistId],
    queryFn: () =>
      selectedPlaylistId
        ? getPlaylistById(selectedPlaylistId)
        : Promise.resolve(null),
    enabled: !!selectedPlaylistId,
  });
