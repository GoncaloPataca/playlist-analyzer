import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { setAccessToken } from "@/api/spotifyApi";
import { ACCESS_TOKEN_KEY } from "@/constants/storageKeys";

async function exchangeSpotifyToken(code: string, verifier: string) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      code_verifier: verifier,
    }),
  });
  if (!response.ok) throw new Error("Failed to exchange token");
  return response.json();
}

export function useSpotifyAuth() {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage(ACCESS_TOKEN_KEY, undefined);
  return useMutation({
    mutationFn: ({ code, verifier }: { code: string; verifier: string }) =>
      exchangeSpotifyToken(code, verifier),
    onSuccess: (data) => {
      setToken(data.access_token);
      setAccessToken(data.access_token);
      localStorage.removeItem("code_verifier");
      navigate("/");
    },
    onError: (error) => {
      console.error("Token exchange failed:", error);
    },
  });
}
