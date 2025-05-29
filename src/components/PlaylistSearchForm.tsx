import { useForm } from "react-hook-form";
import { getPlaylistById } from "../api/spotifyApi";
import { Button } from "./ui/Button";
import { useState } from "react";

type FormValues = {
  url: string;
};

export function PlaylistSearchForm({
  onPlaylistFound,
}: {
  onPlaylistFound: (playlist: any) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    reset,
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);

  function extractPlaylistId(url: string): string | null {
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }

  const onSubmit = async (data: FormValues) => {
    const id = extractPlaylistId(data.url.trim());

    if (!id) {
      setFormError("url", {
        type: "manual",
        message: "Invalid Spotify playlist URL.",
      });
      return;
    }

    setLoading(true);
    try {
      const playlistData = await getPlaylistById(id);
      onPlaylistFound(playlistData);
      reset();
    } catch (e) {
      setFormError("url", {
        type: "manual",
        message: "Playlist not found or not accessible.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-2">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          className={`border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-3 py-2 flex-1 text-base transition ${
            errors.url ? "border-red-500" : ""
          }`}
          placeholder="Paste Spotify playlist URL"
          disabled={loading}
          {...register("url", {
            required: "URL is required.",
          })}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>
      {errors.url && (
        <div className="text-red-600 mt-1 text-sm">{errors.url.message}</div>
      )}
    </form>
  );
}
