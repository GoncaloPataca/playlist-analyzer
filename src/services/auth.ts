const clientId = "xxx";
const redirectUri = "https://192.168.1.64:5173/callback";
const scopes = ["playlist-read-private", "playlist-read-collaborative"];

export const getSpotifyAuthUrl = () => {
  const base = "https://accounts.spotify.com/authorize";
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "token",
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
  });

  return `${base}?${params.toString()}`;
};
