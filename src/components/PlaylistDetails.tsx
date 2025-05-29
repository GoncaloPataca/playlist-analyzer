import { useState } from "react";
import { getPlaylistById } from "../api/spotifyApi";

export function PlaylistDetails({
  playlist,
  setSelectedPlaylist,
}: {
  playlist: any;
  setSelectedPlaylist: (playlist: any) => void;
}) {
  const [searchUrl, setSearchUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function extractPlaylistId(url: string): string | null {
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }

  const handleSearch = async () => {
    setError(null);
    const id = extractPlaylistId(searchUrl.trim());
    if (!id) {
      setError("Invalid Spotify playlist URL.");
      return;
    }
    setLoading(true);
    try {
      const data = await getPlaylistById(id);
      setSelectedPlaylist(data);
    } catch (e) {
      setError("Playlist not found or not accessible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 items-start">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded px-2 py-1 w-80"
          placeholder="Paste Spotify playlist URL"
          value={searchUrl}
          onChange={(e) => setSearchUrl(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      {!playlist ? (
        <div>Select a playlist to see details.</div>
      ) : (
        <div className="flex gap-6 items-start">
          <img
            src={playlist.images?.[0]?.url}
            alt={playlist.name}
            className="w-48 h-48 rounded shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{playlist.name}</h2>
            <p className="text-gray-600 mt-2">{playlist.description}</p>
            <p className="text-sm text-gray-500 mt-4">
              <span className="font-semibold">By:</span>{" "}
              {playlist.owner?.display_name}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Tracks:</span>{" "}
              {playlist.tracks?.total}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Followers:</span>{" "}
              {playlist.followers?.total ?? "?"}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Public:</span>{" "}
              {playlist.public ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Collaborative:</span>{" "}
              {playlist.collaborative ? "Yes" : "No"}
            </p>
            <a
              href={playlist.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline mt-2 inline-block"
            >
              Open in Spotify
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
