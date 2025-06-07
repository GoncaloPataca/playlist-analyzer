import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useMemo, useCallback } from "react";
import { getPlaylistTracks } from "../../api/spotifyApi";
import { Button } from "../ui/Button";
import { useQuery } from "@tanstack/react-query";
import {
  PopoverPanel,
  Popover,
  PopoverButton,
  Field,
  Label,
} from "@headlessui/react";
import { Switch } from "../ui/Switch";

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
  { field: "added_at", headerName: "Added At" },
];

export function TrackGrid({
  playlistId,
  isFetching,
}: Readonly<{ playlistId?: string; isFetching: boolean }>) {
  const [visibleCols, setVisibleCols] = useState<string[]>([
    "name",
    "artist",
    "album",
    "duration_ms",
    "popularity",
    "explicit",
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
      console.log(api.isAnyFilterPresent());
      setIsFilterActive(api.isAnyFilterPresent());
    }
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2 relative">
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverButton as={Button}>Select Columns</PopoverButton>
            <PopoverPanel
              className="absolute z-10  bg-white border border-gray-300 rounded-lg shadow-md p-2 flex flex-col gap-2 min-w-[200px] ring-1 ring-black ring-opacity-5 focus:outline-none
  "
              anchor="bottom start"
            >
              {ALL_COLUMNS.map((col) => (
                <Field key={col.field} className={"flex justify-between gap-6"}>
                  <Label>{col.headerName}</Label>
                  <Switch
                    checked={visibleCols.includes(col.field as string)}
                    onChange={() => handleToggleCol(col.field as string)}
                  />
                </Field>
              ))}
            </PopoverPanel>
          </Popover>
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
