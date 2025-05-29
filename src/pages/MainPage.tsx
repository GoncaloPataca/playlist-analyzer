import { useEffect, useState } from "react";
import { PlaylistDetails } from "../components/PlaylistDetails";
import { SidePanel } from "../components/SidePanel";
import { Navbar } from "../components/Navbar";
import { PlaylistSearchForm } from "../components/PlaylistSearchForm";
import { useLocation } from "react-router-dom";
import { extractPlaylistId } from "../utils";
import { getPlaylistById } from "../api/spotifyApi";

export function MainPage() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const playlistUrl = params.get("playlistId");
    if (playlistUrl) {
      const playlistId = extractPlaylistId(playlistUrl);

      if (playlistId) {
        getPlaylistById(playlistId)
          .then((playlist) => setSelectedPlaylist(playlist))
          .catch(() => setSelectedPlaylist(null));
      }
    }
  }, [location.search]);
  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex flex-1">
        <SidePanel
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={setSelectedPlaylist}
        />
        <main id="main-content" className="flex-1 p-6 overflow-auto">
          <h1 className="sr-only">Spotify Playlist Analyzer</h1>{" "}
          <PlaylistSearchForm onPlaylistFound={setSelectedPlaylist} />
          <PlaylistDetails playlist={selectedPlaylist} />
        </main>
      </div>
    </div>
  );
}
