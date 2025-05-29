import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";

export const getPlaylistTracks = async (playlistId: string) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const json = await res.json();
  return json.items ?? [];
};

export const getUserPlaylists = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch playlists");
  const json = await res.json();
  return json.items ?? [];
};

export const getPlaylistById = async (playlistId: string) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch playlist");
  return res.json();
};
