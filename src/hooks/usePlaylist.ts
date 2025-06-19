import { useQuery } from "@tanstack/react-query";
import { getPlaylistById } from "@/api/spotifyApi";

export const usePlaylist = (
  selectedPlaylistId: string | null,
  token: boolean
) =>
  useQuery({
    queryKey: ["playlist", selectedPlaylistId],
    queryFn: () =>
      selectedPlaylistId
        ? getPlaylistById(selectedPlaylistId)
        : Promise.resolve(null),
    enabled: !!selectedPlaylistId && !!token,
  });
