import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useRef } from "react";
import { getPlaylistTracks } from "../api/spotifyApi";
import { Button } from "./ui/Button";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  name: string;
  artist: string;
  album: string;
  duration_ms: number;
  popularity?: number;
  explicit?: boolean;
  release_date?: string;
  added_at?: string;
}

const ALL_COLUMNS: ColDef<IRow>[] = [
  { field: "name", headerName: "Track" },
  { field: "artist", headerName: "Artist" },
  { field: "album", headerName: "Album" },
  {
    field: "duration_ms",
    headerName: "Duration",
    valueFormatter: (params) => {
      const ms = params.value;
      if (!ms) return "";
      const min = Math.floor(ms / 60000);
      const sec = Math.floor((ms % 60000) / 1000)
        .toString()
        .padStart(2, "0");
      return `${min}:${sec}`;
    },
  },
  { field: "popularity", headerName: "Popularity" },
  {
    field: "explicit",
    headerName: "Explicit",
    valueFormatter: (params) => (params.value ? "Yes" : "No"),
  },
  { field: "release_date", headerName: "Release Date" },
  { field: "added_at", headerName: "Added At" },
];

export function TrackGrid({ playlistId }: { playlistId?: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowData, setRowData] = useState<IRow[]>([]);
  const [visibleCols, setVisibleCols] = useState<string[]>([
    "name",
    "artist",
    "album",
    "duration_ms",
    "popularity",
    "explicit",
  ]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<any>(null);

  useEffect(() => {
    setIsLoading(true);
    if (!playlistId) {
      setRowData([]);
      setIsLoading(false);
      return;
    }
    getPlaylistTracks(playlistId).then((tracks) => {
      setRowData(
        tracks.map((item: any) => ({
          name: item.track?.name,
          artist: item.track?.artists?.map((a: any) => a.name).join(", "),
          album: item.track?.album?.name,
          duration_ms: item.track?.duration_ms,
          popularity: item.track?.popularity,
          explicit: item.track?.explicit,
          release_date: item.track?.album?.release_date,
          added_at: item.added_at,
        }))
      );
      setIsLoading(false);
    });
  }, [playlistId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const colDefs = ALL_COLUMNS.filter((col) =>
    visibleCols.includes(col.field as string)
  );

  const handleToggleCol = (field: string) => {
    setVisibleCols((cols) => {
      const newCols = cols.includes(field)
        ? cols.filter((c) => c !== field)
        : [...cols, field];

      if (gridRef.current && !newCols.includes(field)) {
        const api = gridRef.current.api;
        const currentFilters = api.getFilterModel();
        if (currentFilters && currentFilters[field]) {
          delete currentFilters[field];
          api.setFilterModel({ ...currentFilters });
        }
      }

      return newCols;
    });
  };

  const handleClearFilters = () => {
    if (gridRef.current) {
      gridRef.current.api.setFilterModel(null);
    }
  };

  return (
    <div>
      <div className="mb-2 relative">
        <div className="flex items-center gap-3">
          <Button onClick={() => setMenuOpen((open) => !open)}>
            Select Columns
          </Button>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </div>
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute z-10 mt-2 left-0 bg-white border rounded shadow-lg p-3 flex flex-col gap-1"
          >
            {ALL_COLUMNS.map((col) => (
              <label
                key={col.field}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={visibleCols.includes(col.field as string)}
                  onChange={() => handleToggleCol(col.field as string)}
                />
                {col.headerName}
              </label>
            ))}
          </div>
        )}
      </div>
      <div style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{
            flex: 1,
            filter: true,
            floatingFilter: true,
          }}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
