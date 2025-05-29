import { TrackGrid } from "./TrackGrid";

export function PlaylistDetails({ playlist }: { playlist: any }) {
  const formatNumber = (num: number | undefined) =>
    typeof num === "number" ? num.toLocaleString() : "?";

  return (
    <section className="flex flex-col gap-8 items-start">
      {!playlist ? (
        <div className="text-gray-500 italic">
          Select a playlist to see details.
        </div>
      ) : (
        <div className="flex flex-col gap-8 w-full">
          <div className="flex gap-8 items-start w-full">
            <img
              src={playlist.images?.[0]?.url}
              alt={playlist.name}
              className="w-48 h-48 rounded-lg shadow-lg object-cover border border-gray-200"
            />
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-3xl font-bold mb-1">{playlist.name}</h2>
              {playlist.description && (
                <p className="text-gray-700 mb-2">{playlist.description}</p>
              )}
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600 mb-2">
                <div>
                  <span className="font-semibold">Owner:</span>{" "}
                  {playlist.owner?.display_name}
                </div>
                <div>
                  <span className="font-semibold">Tracks:</span>{" "}
                  {formatNumber(playlist.tracks?.total)}
                </div>
                <div>
                  <span className="font-semibold">Followers:</span>{" "}
                  {formatNumber(playlist.followers?.total)}
                </div>
                <div>
                  <span className="font-semibold">Visibility:</span>{" "}
                  {playlist.public ? "Public" : "Private"}
                </div>
                <div>
                  <span className="font-semibold">Collaborative:</span>{" "}
                  {playlist.collaborative ? "Yes" : "No"}
                </div>
                {playlist.snapshot_id && (
                  <div>
                    <span className="font-semibold">Snapshot ID:</span>{" "}
                    <span className="font-mono text-xs">
                      {playlist.snapshot_id.slice(0, 8)}...
                    </span>
                  </div>
                )}
                {playlist.primary_color && (
                  <div>
                    <span className="font-semibold">Primary Color:</span>{" "}
                    <span
                      className="inline-block w-4 h-4 rounded-full align-middle mr-1"
                      style={{ background: playlist.primary_color }}
                    ></span>
                    <span>{playlist.primary_color}</span>
                  </div>
                )}
                {playlist.type && (
                  <div>
                    <span className="font-semibold">Type:</span> {playlist.type}
                  </div>
                )}
              </div>
              <a
                href={playlist.external_urls?.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold mt-2"
              >
                Open in Spotify
              </a>
            </div>
          </div>
          <TrackGrid playlistId={playlist?.id} />
        </div>
      )}
    </section>
  );
}
