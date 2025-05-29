import { useState } from "react";
import { PlaylistDetails } from "../components/PlaylistDetails";
import { SidePanel } from "../components/SidePanel";
import { TrackGrid } from "../components/TrackGrid";
import { Navbar } from "../components/Navbar";

export function MainPage() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null);

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
          <PlaylistDetails
            playlist={selectedPlaylist}
            setSelectedPlaylist={setSelectedPlaylist}
          />
          <div className="overflow-x-auto">
            <TrackGrid playlistId={selectedPlaylist?.id} />
          </div>
        </main>
      </div>
    </div>
  );
}
