import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface PlaylistCardProps {
  playlist: any;
  selected: boolean;
  onSelect: (playlist: any) => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  selected,
  onSelect,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = () => {
    onSelect(playlist);
    const params = new URLSearchParams(location.search);
    params.set("playlistId", playlist.href);
    navigate({ search: params.toString() }, { replace: true });
  };
  return (
    <button
      aria-pressed={selected}
      className={`w-full text-left flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer rounded px-2 py-1 transition
      ${
        selected
          ? "bg-green-100 dark:bg-green-900 ring-2 ring-green-400 font-bold"
          : ""
      }
    `}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(playlist);
      }}
    >
      <img
        src={playlist.images?.[0]?.url}
        alt={playlist.name}
        className="w-10 h-10 rounded object-cover border border-gray-300"
      />
      <div className="flex flex-col">
        <span>{playlist.name}</span>
        <span className="text-xs text-gray-600">
          {playlist.tracks?.total ?? 0} songs • by{" "}
          {playlist.owner?.display_name}
        </span>
      </div>
    </button>
  );
};
