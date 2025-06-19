import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/spotifyApi";

export const useCurrentUser = (token: string | undefined) =>
  useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    enabled: !!token,
  });
