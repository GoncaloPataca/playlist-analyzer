import { CODE_VERIFIER_KEY } from "@/constants/storageKeys";
import { Button } from "@/components/ui/Button/Button";

export const LoginButton = ({ children }: { children?: React.ReactNode }) => (
  <Button
    onClick={async () => {
      await redirectToSpotifyLogin();
    }}
  >
    {children ?? "Login with Spotify"}
  </Button>
);

function base64urlEncode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateCodeVerifier(length = 128): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return base64urlEncode(array.buffer).slice(0, length);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return base64urlEncode(digest);
}

async function redirectToSpotifyLogin() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  localStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    scope: "user-read-private user-read-email playlist-read-private",
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}
