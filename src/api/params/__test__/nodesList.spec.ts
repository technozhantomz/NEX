import { testnetCheck } from "../networkparams";
import {
  automaticSelection,
  defaultNodesList,
  nodeRegions,
  prodNodes,
  testnetNodes,
} from "../nodesList";

describe("nodesList", () => {
  it("should have the correct value for nodeRegions", () => {
    expect(nodeRegions).toEqual([
      "Northern Europe",
      "Western Europe",
      "Southern Europe",
      "Eastern Europe",
      "Northern Asia",
      "Western Asia",
      "Southern Asia",
      "Eastern Asia",
      "Central Asia",
      "Southeastern Asia",
      "Australia and New Zealand",
      "Melanesia",
      "Polynesia",
      "Micronesia",
      "Northern Africa",
      "Western Africa",
      "Middle Africa",
      "Eastern Africa",
      "Southern Africa",
      "Northern America",
      "Central America",
      "Caribbean",
      "South America",
    ]);
  });

  it("should have a length of testnetNodes equal to 2", () => {
    expect(testnetNodes).toHaveLength(2);
  });

  it("should have a length of prodNodes equal to 4", () => {
    expect(prodNodes).toHaveLength(4);
  });

  it("should have the correct value for automaticSelection", () => {
    expect(automaticSelection).toEqual("wss://fake.automatic-selection.com");
  });

  it("should have the correct value for automaticSelection", () => {
    expect(defaultNodesList).toEqual(testnetCheck ? testnetNodes : prodNodes);
  });
});
