import { useState } from "react";
import { PlaylistDetails } from "../components/PlaylistDetails";
import { SidePanel } from "../components/SidePanel";
import { Navbar } from "../components/Navbar";
import { PlaylistSearchForm } from "../components/PlaylistSearchForm";
import { getPlaylistById } from "../api/spotifyApi";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";

export function MainPage() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );

  const { data: selectedPlaylist } = useQuery({
    queryKey: ["playlist", selectedPlaylistId],
    queryFn: () =>
      selectedPlaylistId
        ? getPlaylistById(selectedPlaylistId)
        : Promise.resolve(null),
    enabled: !!selectedPlaylistId,
    staleTime: 1000 * 60 * 5,
  });

  const user = useCurrentUser();

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar user={user} />
      <div className="flex flex-1">
        <SidePanel
          selectedPlaylistId={selectedPlaylistId}
          setSelectedPlaylistId={setSelectedPlaylistId}
          user={user}
        />
        <main id="main-content" className="flex-1 p-6 overflow-auto">
          <h1 className="sr-only">Spotify Playlist Analyzer</h1>{" "}
          <PlaylistSearchForm onPlaylistFound={setSelectedPlaylistId} />
          <PlaylistDetails selectedPlaylist={selectedPlaylist} />
        </main>
      </div>
    </div>
  );
}
