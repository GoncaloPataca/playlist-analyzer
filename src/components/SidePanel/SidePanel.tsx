import { PlaylistCard } from "@/components/SidePanel/PlaylistCard/PlaylistCard";
import { useUserPlaylists } from "@/hooks/useUserPlaylists";

export function SidePanel({
  selectedPlaylistId,
  setSelectedPlaylistId,
  user,
}: Readonly<{
  selectedPlaylistId: string | null;
  setSelectedPlaylistId: (playlistId: string) => void;
  user: SpotifyApi.CurrentUsersProfileResponse | undefined;
}>) {
  const loggedIn = user !== null;

  const { data: playlists = [], isLoading } = useUserPlaylists(user);

  return (
    <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4 border-r border-gray-300 dark:border-gray-700">
      <h2 className="text-lg font-bold mb-4">Your Playlists</h2>
      <nav aria-label="Your Playlists">
        {!loggedIn && (
          <ul className="space-y-2">
            <li>Please log in to see your playlists.</li>
          </ul>
        )}
        {loggedIn && isLoading && (
          <ul className="space-y-2 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={`${selectedPlaylistId}-${i}`}>
                <div className="flex items-center gap-3 px-2 py-1">
                  <div className="w-10 h-10 rounded bg-gray-300 dark:bg-gray-700" />
                  <div className="flex flex-col flex-1">
                    <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-600 rounded" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {loggedIn && !isLoading && (
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
