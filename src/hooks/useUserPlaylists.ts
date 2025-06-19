import { useQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "@/api/spotifyApi";

export const useUserPlaylists = (
  user: SpotifyApi.CurrentUsersProfileResponse | undefined
) => {
  const loggedIn = user !== undefined;

  return useQuery({
    queryKey: ["userPlaylists", user?.id],
    queryFn: getUserPlaylists,
    enabled: loggedIn,
    staleTime: 1000 * 60 * 5,
  });
};
