import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      const expiresIn = Number(params.get("expires_in"));

      if (token) {
        localStorage.setItem("spotify_token", token);
        localStorage.setItem(
          "spotify_token_expires",
          (Date.now() + expiresIn * 1000).toString()
        );

        window.history.replaceState(null, "", window.location.pathname);

        navigate("/");
      } else {
        alert("Spotify login failed: No token found.");
      }
    } else {
      alert("Spotify login failed: No hash found.");
    }
  }, [navigate]);

  return <p>Loading...</p>;
}
