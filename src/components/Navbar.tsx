import { useEffect, useState } from "react";
import { LoginButton } from "./LoginButton";
import { SignOutButton } from "./SignOutButton";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";
import { FaSpotify } from "react-icons/fa";

export function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState<{
    display_name: string;
    images: { url: string }[];
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    setLoggedIn(!!token);

    async function fetchProfile() {
      if (!token) {
        setProfile(null);
        return;
      }
      try {
        const res = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch {
        setProfile(null);
      }
    }
    fetchProfile();
  }, [loggedIn]);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow">
      {" "}
      <div className="flex items-center gap-3">
        <FaSpotify size={28} className="text-green-500" />
        <span className="text-xl font-bold">Playlist Analyzer</span>
      </div>
      <div>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 bg-white text-black px-4 py-2 rounded shadow"
        >
          Skip to main content
        </a>
      </div>
      <div className="flex items-center gap-4">
        {loggedIn && profile ? (
          <>
            <div className="flex items-center gap-2">
              {profile.images?.[0]?.url && (
                <img
                  src={profile.images[0].url}
                  alt={profile.display_name}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700"
                />
              )}
              <span className="font-medium">{profile.display_name}</span>
            </div>
            <SignOutButton />
          </>
        ) : (
          <LoginButton>
            <span className="flex items-center gap-2">
              <FaSpotify size={22} className="text-green-500" />
              <span>Login with Spotify</span>
            </span>
          </LoginButton>
        )}
      </div>
    </nav>
  );
}
