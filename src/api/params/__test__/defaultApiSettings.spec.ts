import { ApiServer } from "../../../common/types";
import {
  defaultApiLatencies,
  defaultApiSettings,
  defaultLatencyPreferences,
} from "../index";
import { defaultNodesList } from "../nodesList";

describe("defaultApiSettings", () => {
  it("should have the correct default value for defaultApiSettings", () => {
    expect(defaultApiSettings).toEqual({
      selectedNode: defaultNodesList[0].url,
      filteredApiServers: [],
      apiServers: defaultNodesList.map((node) => {
        return {
          node,
          hidden: false,
        } as ApiServer;
      }),
    });
  });

  it("should have the correct default value for defaultApiLatencies", () => {
    expect(defaultApiLatencies).toEqual({});
  });

  it("should have the correct default value for defaultLatencyPreferences", () => {
    expect(defaultLatencyPreferences).toEqual({});
  });
});
