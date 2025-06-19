import { FaSpotify } from "react-icons/fa";
import { useSpotifyLogin } from "@/hooks/useSpotifyLogin";

export const LoginButton = () => {
  const { loginUrl } = useSpotifyLogin();

  return loginUrl ? (
    <a
      href={loginUrl}
      className="button-link px-4 py-2 rounded font-semibold transition bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 hover:cursor-pointer"
    >
      <span className="flex items-center gap-2">
        <FaSpotify size={22} className="text-green-500" />
        <span>Login with Spotify</span>
      </span>
    </a>
  ) : (
    <div>loading</div>
  );
};
