import { useState, useCallback } from "react";
import { getPlaylistTracks } from "@/api/spotifyApi";

export const usePlaylistTracks = () => {
  const [tracks, setTracks] = useState<SpotifyApi.PlaylistTrackObject[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTracks = useCallback(async (playlistId: string) => {
    setLoading(true);
    try {
      const result = await getPlaylistTracks(playlistId);
      setTracks(result);
    } finally {
      setLoading(false);
    }
  }, []);

  return { tracks, loading, fetchTracks };
};
