import { AssetTableRow } from "../../AssetsTable/index";
import { AssetColumnType, createAssetsColumns } from "../AssetsColumns";

describe("ActivityAndNotificationColumns", () => {
  let assetOne: AssetTableRow;
  let assetTwo: AssetTableRow;
  let assetsColumns: AssetColumnType[];

  beforeEach(() => {
    assetOne = {
      available: 0,
      inOrders: 62,
      key: "1.3.0",
      name: "PeerPlays",
      symbol: "TEST",
    };

    assetTwo = {
      available: 0,
      inOrders: 0,
      key: "1.3.1",
      name: "Bitcoin",
      symbol: "BTC",
    };
    assetsColumns = createAssetsColumns();
  });

  it("should return an array with the correct number of columns", () => {
    expect(assetsColumns).toHaveLength(5);
  });

  it("should return the correct onFilter function for the symbol column", () => {
    const symbolColumn = assetsColumns[0];
    expect(symbolColumn).toHaveProperty("onFilter", expect.any(Function));

    const filterFn = symbolColumn.onFilter as (
      value: string,
      record: AssetTableRow
    ) => boolean;
    expect(filterFn("TEST", assetOne)).toBe(true);
  });

  it("should return the correct onFilter function for the name column", () => {
    const nameColumn = assetsColumns[1];
    expect(nameColumn).toHaveProperty("onFilter", expect.any(Function));

    const filterFn = nameColumn.onFilter as (
      value: string,
      record: AssetTableRow
    ) => boolean;
    expect(filterFn("Bitcoin", assetTwo)).toBe(true);
  });

  it("should return the correct sorter function for the available column", () => {
    const availableColumn = assetsColumns[2];
    expect(availableColumn).toHaveProperty("sorter", expect.any(Function));

    const sorterFn = availableColumn.sorter as (
      a: { available: number },
      b: { available: number }
    ) => number;
    expect(sorterFn(assetOne, assetTwo)).toBe(0);
  });

  it("should return the correct sorter function for the inOrders column", () => {
    const inOrdersColumn = assetsColumns[3];
    expect(inOrdersColumn).toHaveProperty("sorter", expect.any(Function));

    const sorterFn = inOrdersColumn.sorter as (
      a: { inOrders: number },
      b: { inOrders: number }
    ) => number;
    expect(sorterFn(assetOne, assetTwo)).toBe(62);
  });
});
