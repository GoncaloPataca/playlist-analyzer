import { getSpotifyAuthUrl } from "../services/auth";

export const LoginButton = () => (
  <button
    onClick={() => {
      window.location.href = getSpotifyAuthUrl();
    }}
  >
    Login with Spotify
  </button>
);
