export const getPlaylistTracks = async (playlistId: string) => {
  const token = localStorage.getItem("spotify_token");
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const json = await res.json();
  return json.items || [];
};
