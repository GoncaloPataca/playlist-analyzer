import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/spotifyApi";

export const useCurrentUser = () => {
  const [user, setUser] =
    useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      setUser(data);
    };

    fetchUser();
  }, []);

  return user;
};
