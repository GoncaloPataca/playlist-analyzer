import { FaSpotify } from "react-icons/fa";
import { LoginButton } from "@/components/Navbar/LoginButton/LoginButton";
import { SignOutButton } from "@/components/Navbar/SignOutButton/SignOutButton";

export function Navbar({
  user,
}: Readonly<{
  user: SpotifyApi.CurrentUsersProfileResponse | null;
}>) {
  const isLoggedIn = user !== null;

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow">
      {" "}
      <div className="flex items-center gap-3">
        <FaSpotify size={28} className="text-green-500" />
        <span className="text-xl font-bold">Playlist Analyzer</span>
      </div>
      <div>
        <a
          href="#playlist-search-input"
          className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 bg-white text-black px-4 py-2 rounded shadow"
        >
          Skip to main content
        </a>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn && user ? (
          <>
            <div className="flex items-center gap-2">
              {user.images?.[0]?.url && (
                <img
                  src={user.images[0].url}
                  alt={user.display_name}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700"
                />
              )}
              <span className="font-medium">{user.display_name}</span>
            </div>
            <SignOutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}
