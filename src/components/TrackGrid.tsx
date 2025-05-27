import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

export function TrackGrid() {
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: "make", sort: "asc" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
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
