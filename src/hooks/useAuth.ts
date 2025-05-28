import { useEffect } from "react";

export const useSpotifyAuth = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      const expiresIn = Number(params.get("expires_in"));

      if (token) {
        localStorage.setItem("spotify_token", token);
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem(
          "spotify_token_expires",
          expirationTime.toString()
        );

        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []);
};
