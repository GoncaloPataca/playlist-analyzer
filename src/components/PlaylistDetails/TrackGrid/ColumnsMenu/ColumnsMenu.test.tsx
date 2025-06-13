import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import type { ColDef } from "ag-grid-community";
import { userEvent } from "@vitest/browser/context";
import { ColumnsMenu } from "@/components/PlaylistDetails/TrackGrid/ColumnsMenu/ColumnsMenu";
import { renderWithProvider } from "@/utils/test-utils/test-utils";

const columns: ColDef[] = [
  { field: "track", headerName: "Track" },
  { field: "artist", headerName: "Artist" },
  { field: "popularity", headerName: "Popularity" },
];

describe("ColumnsMenu", () => {
  it("renders all columns with correct labels", async () => {
    const { getByRole } = renderWithProvider(
      <ColumnsMenu
        allColumns={columns}
        visibleCols={["track", "popularity"]}
        onToggleColumn={() => {}}
      />
    );

    await userEvent.click(getByRole("button", { name: /select columns/i }));

    await waitFor(() => {
      expect(screen.getByText("Track")).toBeInTheDocument();
      expect(screen.getByText("Artist")).toBeInTheDocument();
      expect(screen.getByText("Popularity")).toBeInTheDocument();
    });
  });

  it("checks Switch if column is visible, unchecked otherwise", async () => {
    const { getByRole } = renderWithProvider(
      <ColumnsMenu
        allColumns={columns}
        visibleCols={["track"]}
        onToggleColumn={() => {}}
      />
    );

    await userEvent.click(getByRole("button", { name: /select columns/i }));

    const trackSwitch = getByRole("switch", { name: /track/i });
    const artistSwitch = getByRole("switch", { name: /artist/i });
    const popularitySwitch = getByRole("switch", { name: /popularity/i });
    expect(trackSwitch).toBeChecked();
    expect(artistSwitch).not.toBeChecked();
    expect(popularitySwitch).not.toBeChecked();
  });

  it("toggles column visibility when Switch is toggled", async () => {
    const onToggleColumn = vi.fn();
    const { getByRole } = renderWithProvider(
      <ColumnsMenu
        allColumns={columns}
        visibleCols={["track"]}
        onToggleColumn={onToggleColumn}
      />
    );

    await userEvent.click(getByRole("button", { name: /select columns/i }));

    const trackSwitch = getByRole("switch", { name: /track/i });
    await userEvent.click(trackSwitch);
    expect(onToggleColumn).toHaveBeenCalledWith("track");

    const artistSwitch = getByRole("switch", { name: /artist/i });
    await userEvent.click(artistSwitch);
    expect(onToggleColumn).toHaveBeenCalledWith("artist");
  });

  it("renders PopoverButton with correct label", () => {
    const { getByRole } = renderWithProvider(
      <ColumnsMenu
        allColumns={columns}
        visibleCols={["track"]}
        onToggleColumn={() => {}}
      />
    );

    expect(
      getByRole("button", { name: /select columns/i })
    ).toBeInTheDocument();
  });
});
