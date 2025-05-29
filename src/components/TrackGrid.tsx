import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import { getPlaylistTracks } from "../api/spotifyApi";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  name: string;
  artist: string;
  album: string;
  duration_ms: number;
}

export function TrackGrid({ playlistId }: { playlistId?: string }) {
  const [rowData, setRowData] = useState<IRow[]>([]);

  useEffect(() => {
    if (!playlistId) {
      setRowData([]);
      return;
    }
    getPlaylistTracks(playlistId).then((tracks) => {
      setRowData(
        tracks.map((item: any) => ({
          name: item.track?.name,
          artist: item.track?.artists?.map((a: any) => a.name).join(", "),
          album: item.track?.album?.name,
          duration_ms: item.track?.duration_ms,
        }))
      );
    });
  }, [playlistId]);

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "name", headerName: "Track" },
    { field: "artist", headerName: "Artist" },
    { field: "album", headerName: "Album" },
    { field: "duration_ms", headerName: "Duration (ms)" },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
