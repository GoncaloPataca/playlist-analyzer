import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function exchangeSpotifyToken(code: string, verifier: string) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      code_verifier: verifier,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to exchange token");
  }

  return response.json();
}

export function CallbackPage() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: ({ code, verifier }: { code: string; verifier: string }) =>
      exchangeSpotifyToken(code, verifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.removeItem("code_verifier");
      navigate("/");
    },
    onError: (error) => {
      console.error("Token exchange failed:", error);
    },
  });

  // Ref to ensure mutation runs only once
  const hasMutated = useRef(false);

  useEffect(() => {
    if (hasMutated.current) return; // skip if already mutated

    const code = new URLSearchParams(window.location.search).get("code");
    const verifier = localStorage.getItem("code_verifier");

    if (code && verifier) {
      mutation.mutate({ code, verifier });
      hasMutated.current = true;
    }
  }, [mutation]);

  return <p>Logging in...</p>;
}
