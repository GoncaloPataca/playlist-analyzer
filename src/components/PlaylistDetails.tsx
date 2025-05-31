import { TrackGrid } from "./TrackGrid";

export function PlaylistDetails({
  selectedPlaylist,
}: Readonly<{ selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null }>) {
  const formatNumber = (num: number | undefined) =>
    typeof num === "number" ? num.toLocaleString() : "?";

  return (
    <section className="flex flex-col gap-8 items-start">
      {!selectedPlaylist ? (
        <div className="text-gray-500 italic">
          Select a selectedPlaylist to see details.
        </div>
      ) : (
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
                {selectedPlaylist.primary_color && (
                  <div>
                    <span className="font-semibold">Primary Color:</span>{" "}
                    <span
                      className="inline-block w-4 h-4 rounded-full align-middle mr-1"
                      style={{ background: selectedPlaylist.primary_color }}
                    ></span>
                    <span>{selectedPlaylist.primary_color}</span>
                  </div>
                )}
                {selectedPlaylist.type && (
                  <div>
                    <span className="font-semibold">Type:</span>{" "}
                    {selectedPlaylist.type}
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
          <TrackGrid playlistId={selectedPlaylist?.id} />
        </div>
      )}
    </section>
  );
}
