import { useState } from "react";
import { useLocalStorage } from "react-use";
import { PlaylistDetails } from "@/components/PlaylistDetails/PlaylistDetails";
import { SidePanel } from "@/components/SidePanel/SidePanel";
import { Navbar } from "@/components/Navbar/Navbar";
import { PlaylistSearchForm } from "@/components/PlaylistDetails/PlaylistSearchForm/PlaylistSearchForm";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePlaylist } from "@/hooks/usePlaylist";
import { ACCESS_TOKEN_KEY } from "@/constants/storageKeys";
import { setAccessToken } from "@/api/spotifyApi";

export function MainPage() {
  const [token] = useLocalStorage(ACCESS_TOKEN_KEY, undefined);
  if (token) setAccessToken(token);

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );

  const { data: selectedPlaylist, isFetching } = usePlaylist(
    selectedPlaylistId,
    token
  );

  const { data: user } = useCurrentUser(token);

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
          <h1 className="sr-only">Spotify Playlist Analyzer</h1>
          <PlaylistSearchForm
            user={user}
            setSelectedPlaylistId={setSelectedPlaylistId}
          />
          <PlaylistDetails
            selectedPlaylistId={selectedPlaylistId}
            selectedPlaylist={selectedPlaylist}
            isFetching={isFetching}
          />
        </main>
      </div>
    </div>
  );
}
