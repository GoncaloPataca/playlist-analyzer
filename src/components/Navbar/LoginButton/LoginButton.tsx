import { FaSpotify } from "react-icons/fa";
import { Button } from "@/components/ui/Button/Button";
import { useSpotifyLogin } from "@/hooks/useSpotifyLogin";

export const LoginButton = () => {
  const { login } = useSpotifyLogin();

  return (
    <Button onClick={login}>
      <span className="flex items-center gap-2">
        <FaSpotify size={22} className="text-green-500" />
        <span>Login with Spotify</span>
      </span>
    </Button>
  );
};
