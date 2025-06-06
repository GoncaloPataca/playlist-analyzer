import React from "react";

interface PlaylistCardProps {
  userPlaylist: SpotifyApi.PlaylistObjectSimplified;
  selectedPlaylistId: string | null;
  setSelectedPlaylistId: (playlistId: string) => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  userPlaylist,
  selectedPlaylistId,
  setSelectedPlaylistId,
}) => {
  const isSelected = selectedPlaylistId === userPlaylist.id;

  return (
    <button
      aria-pressed={isSelected}
      className={`w-full text-left flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer rounded px-2 py-1 transition
      ${
        isSelected
          ? "bg-green-100 dark:bg-green-900 ring-2 ring-green-400 font-bold"
          : ""
      }
    `}
      onClick={() => setSelectedPlaylistId(userPlaylist.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          setSelectedPlaylistId(userPlaylist.id);
      }}
    >
      <img
        src={userPlaylist.images?.[0]?.url}
        alt={userPlaylist.name}
        className="w-10 h-10 rounded object-cover border border-gray-300"
      />
      <div className="flex flex-col">
        <span>{userPlaylist.name}</span>
        <span className="text-xs text-gray-600">
          {userPlaylist.tracks?.total ?? 0} songs • by{" "}
          {userPlaylist.owner?.display_name}
        </span>
      </div>
    </button>
  );
};
