import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/spotifyApi";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
