import { useState, useEffect } from "react";
import { getUserPlaylists } from "../api/spotifyApi";
import { PlaylistCard } from "./PlaylistCard";

export function SidePanel({
  selectedPlaylistId,
  setSelectedPlaylistId,
  user,
}: Readonly<{
  selectedPlaylistId: string | null;
  setSelectedPlaylistId: (playlistId: string) => void;
  user: SpotifyApi.CurrentUsersProfileResponse | null;
}>) {
  const loggedIn = user !== null;
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [loading, setLoading] = useState(false);

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
            {playlists.map((userPlaylist) => (
              <li key={userPlaylist.id}>
                <PlaylistCard
                  userPlaylist={userPlaylist}
                  selectedPlaylistId={selectedPlaylistId}
                  setSelectedPlaylistId={setSelectedPlaylistId}
                />
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}
