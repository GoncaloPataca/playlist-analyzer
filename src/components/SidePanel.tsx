import { useState, useEffect } from "react";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";
import { getUserPlaylists } from "../api/spotifyApi";

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
        {loggedIn ? (
          loading ? (
            <p>Loading playlists...</p>
          ) : (
            <ul className="space-y-2">
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <button
                    type="button"
                    className={`w-full text-left flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer rounded px-2 py-1 transition
                  ${
                    selectedPlaylist?.id === playlist.id
                      ? "bg-green-100 dark:bg-green-900 ring-2 ring-green-400 font-bold"
                      : ""
                  }
                `}
                    onClick={() => setSelectedPlaylist(playlist)}
                  >
                    <img
                      src={playlist.images?.[0]?.url}
                      alt={playlist.name}
                      className="w-10 h-10 rounded object-cover border border-gray-300"
                    />
                    <div className="flex flex-col">
                      <span>{playlist.name}</span>
                      <span className="text-xs text-gray-600">
                        {playlist.tracks?.total ?? 0} songs • by{" "}
                        {playlist.owner?.display_name}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )
        ) : (
          <ul className="space-y-2">
            <li>Please log in to see your playlists.</li>
          </ul>
        )}
      </nav>
    </aside>
  );
}
