import { useEffect, useRef } from "react";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";

export function CallbackPage() {
  const mutation = useSpotifyAuth();
  const hasMutated = useRef(false);

  useEffect(() => {
    if (hasMutated.current) return;
    const code = new URLSearchParams(window.location.search).get("code");
    const verifier = localStorage.getItem("code_verifier");
    if (code && verifier) {
      mutation.mutate({ code, verifier });
      hasMutated.current = true;
    }
  }, [mutation]);

  return <p>Logging in...</p>;
}
