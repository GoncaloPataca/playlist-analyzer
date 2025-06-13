import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Field,
  Label,
} from "@headlessui/react";
import type { ColDef } from "ag-grid-community";
import { Switch } from "@/components/ui/Switch/Switch";
import { Button } from "@/components/ui/Button/Button";

interface ColumnsMenuProps {
  allColumns: ColDef[];
  visibleCols: string[];
  onToggleColumn: (field: string) => void;
}

export function ColumnsMenu({
  allColumns,
  visibleCols,
  onToggleColumn,
}: Readonly<ColumnsMenuProps>) {
  return (
    <Popover>
      <PopoverButton as={Button}>Select Columns</PopoverButton>
      <PopoverPanel
        className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md p-2 flex flex-col gap-2 min-w-[200px] ring-1 ring-black ring-opacity-5 focus:outline-none"
        anchor="bottom start"
      >
        {allColumns.map((col) => (
          <Field key={col.field} className="flex justify-between gap-6">
            <Label>{col.headerName}</Label>
            <Switch
              checked={visibleCols.includes(col.field as string)}
              onChange={() => onToggleColumn(col.field as string)}
            />
          </Field>
        ))}
      </PopoverPanel>
    </Popover>
  );
}
