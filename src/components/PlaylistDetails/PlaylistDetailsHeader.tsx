export function PlaylistDetailsHeader({
  selectedPlaylistId,
  selectedPlaylist,
  isFetching,
}: Readonly<{
  selectedPlaylistId: string | null;
  selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null | undefined;
  isFetching: boolean;
}>) {
  const formatNumber = (num: number | undefined) =>
    typeof num === "number" ? num.toLocaleString() : "?";

  return (
    <div className="w-full">
      {!selectedPlaylistId && (
        <div className="text-gray-500 italic">
          Select a playlist to see details.
        </div>
      )}
      {isFetching && (
        <div className="flex flex-col gap-8 w-full animate-pulse">
          <div className="flex gap-8 items-start w-full">
            <div className="w-48 h-48 rounded-lg bg-gray-200" />
            <div className="flex flex-col gap-2 w-full">
              <div className="h-8 w-1/2 bg-gray-200 rounded mb-1" />
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm mb-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-28 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-32 bg-gray-200 rounded mt-2" />
            </div>
          </div>
        </div>
      )}
      {!isFetching && selectedPlaylist && (
        <div className="flex flex-col gap-8 w-full">
          <div className="flex gap-8 items-start w-full">
            <img
              src={selectedPlaylist.images?.[0]?.url}
              alt={selectedPlaylist.name}
              className="w-48 h-48 rounded-lg shadow-lg object-cover border border-gray-200"
            />
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-3xl font-bold mb-1">
                {selectedPlaylist.name}
              </h2>
              {selectedPlaylist.description && (
                <p className="text-gray-700 mb-2">
                  {selectedPlaylist.description}
                </p>
              )}
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600 mb-2">
                <div>
                  <span className="font-semibold">Owner:</span>{" "}
                  {selectedPlaylist.owner?.display_name}
                </div>
                <div>
                  <span className="font-semibold">Tracks:</span>{" "}
                  {formatNumber(selectedPlaylist.tracks?.total)}
                </div>
                <div>
                  <span className="font-semibold">Followers:</span>{" "}
                  {formatNumber(selectedPlaylist.followers?.total)}
                </div>
                <div>
                  <span className="font-semibold">Visibility:</span>{" "}
                  {selectedPlaylist.public ? "Public" : "Private"}
                </div>
                <div>
                  <span className="font-semibold">Collaborative:</span>{" "}
                  {selectedPlaylist.collaborative ? "Yes" : "No"}
                </div>
                {selectedPlaylist.snapshot_id && (
                  <div>
                    <span className="font-semibold">Snapshot ID:</span>{" "}
                    <span className="font-mono text-xs">
                      {selectedPlaylist.snapshot_id.slice(0, 8)}...
                    </span>
                  </div>
                )}
              </div>
              <a
                href={selectedPlaylist.external_urls?.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold mt-2"
              >
                Open in Spotify
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
