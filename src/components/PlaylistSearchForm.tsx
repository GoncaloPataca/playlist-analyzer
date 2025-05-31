import { useForm } from "react-hook-form";
import { getPlaylistById } from "../api/spotifyApi";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type FormValues = {
  url: string;
};

export function PlaylistSearchForm({
  onPlaylistFound,
}: Readonly<{
  onPlaylistFound: (playlistId: string) => void;
}>) {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    setValue,
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);

  function extractPlaylistId(url: string): string | null {
    const match = RegExp(/playlist\/([a-zA-Z0-9]+)/).exec(url);
    return match ? match[1] : null;
  }

  useEffect(() => {
    const queryFromUrl = searchParams.get("playlistId");
    if (queryFromUrl !== null) {
      setValue("url", queryFromUrl);
    }
  }, [searchParams, setValue]);

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
      onPlaylistFound(playlistData.id);
    } catch (e) {
      setFormError("url", {
        type: "manual",
        message: "Playlist not found or not accessible." + e,
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
