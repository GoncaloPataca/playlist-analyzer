import { PlaylistDetails } from "../components/PlaylistDetails";
import { SidePanel } from "../components/SidePanel";
import { TrackGrid } from "../components/TrackGrid";

export function MainPage() {
  return (
    <div className="flex h-screen w-screen">
      <SidePanel />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mb-6">Main Page</h1>
        <PlaylistDetails />
        <div className="overflow-x-auto">
          <TrackGrid />
        </div>
      </main>
    </div>
  );
}
