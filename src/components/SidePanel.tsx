import { useState, useEffect } from "react";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";
import { getUserPlaylists } from "../api/spotifyApi";
import { PlaylistCard } from "./PlaylistCard";

export function SidePanel({
  selectedPlaylist,
  setSelectedPlaylist,
}: {
  selectedPlaylist: any;
  setSelectedPlaylist: (playlist: any) => void;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem(ACCESS_TOKEN_KEY));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      getUserPlaylists()
        .then(setPlaylists)
        .catch(() => setPlaylists([]))
        .finally(() => setLoading(false));
    }
  }, [loggedIn]);

  return (
    <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4 border-r border-gray-300 dark:border-gray-700">
      <h2 className="text-lg font-bold mb-4">Your Playlists</h2>
      <nav aria-label="Your Playlists">
        {!loggedIn && (
          <ul className="space-y-2">
            <li>Please log in to see your playlists.</li>
          </ul>
        )}
        {loggedIn && loading && <p>Loading playlists...</p>}
        {loggedIn && !loading && (
          <ul className="space-y-2">
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <PlaylistCard
                  playlist={playlist}
                  selected={selectedPlaylist?.id === playlist.id}
                  onSelect={setSelectedPlaylist}
                />
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}
