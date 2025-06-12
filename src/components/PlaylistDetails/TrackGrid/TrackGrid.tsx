import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { TRACK_COLS } from "@/constants/constants";
import { Button } from "@/components/ui/Button/Button";
import { ColumnsMenu } from "@/components/PlaylistDetails/TrackGrid/ColumnsMenu";
import { getPlaylistTracks } from "@/api/spotifyApi";

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
  { field: TRACK_COLS.NAME, headerName: "Track" },
  { field: TRACK_COLS.ARTIST, headerName: "Artist" },
  { field: TRACK_COLS.ALBUM, headerName: "Album" },
  {
    field: TRACK_COLS.DURATION_MS,
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
  { field: TRACK_COLS.POPULARITY, headerName: "Popularity" },
  {
    field: TRACK_COLS.EXPLICIT,
    headerName: "Explicit",
    valueGetter: (params) => (params.data?.explicit ? "Yes" : "No"),
  },
  { field: TRACK_COLS.ADDED_AT, headerName: "Added At" },
];

export function TrackGrid({
  playlistId,
  isFetching,
}: Readonly<{ playlistId?: string; isFetching: boolean }>) {
  const [visibleCols, setVisibleCols] = useState<string[]>([
    TRACK_COLS.NAME,
    TRACK_COLS.ARTIST,
    TRACK_COLS.ALBUM,
    TRACK_COLS.DURATION_MS,
    TRACK_COLS.POPULARITY,
    TRACK_COLS.EXPLICIT,
  ]);
  const gridRef = useRef<AgGridReact>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const { data: rowData = [], isLoading } = useQuery({
    queryKey: ["playlistTracks", playlistId],
    queryFn: async () => {
      if (!playlistId) return [];
      const playlistTracks = await getPlaylistTracks(playlistId);
      return playlistTracks
        .filter((playlistTrackItem) => playlistTrackItem.track)
        .map((playlistTrackItem) => {
          const track = playlistTrackItem.track as SpotifyApi.TrackObjectFull;
          return {
            name: track.name,
            artist: track.artists?.map((a) => a.name).join(", "),
            album: track.album?.name,
            duration_ms: track.duration_ms,
            popularity: track.popularity,
            explicit: track.explicit,
            added_at: playlistTrackItem.added_at,
          };
        });
    },
    enabled: !!playlistId,
  });

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
        if (currentFilters?.[field]) {
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

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      filter: true,
      floatingFilter: true,
    };
  }, []);

  const onFilterChanged = useCallback(() => {
    const api = gridRef.current?.api;
    if (api) {
      setIsFilterActive(api.isAnyFilterPresent());
    }
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2 relative">
        <div className="flex items-center gap-3">
          <ColumnsMenu
            allColumns={ALL_COLUMNS}
            visibleCols={visibleCols}
            onToggleColumn={handleToggleCol}
          />
          <Button onClick={handleClearFilters} disabled={!isFilterActive}>
            Clear Filters
          </Button>
        </div>
      </div>
      <div style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          loading={isLoading || isFetching}
          onFilterChanged={onFilterChanged}
        />
      </div>
    </div>
  );
}
