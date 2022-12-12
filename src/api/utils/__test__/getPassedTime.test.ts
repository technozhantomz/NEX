import { getPassedTime } from "../getPassedTime";

describe("getPassedTime", () => {
  it("should correctly calculate the passed time", () => {
    const start = new Date();
    const passedTime = getPassedTime(start);
    const expectedPassedTime = new Date().valueOf() - start.valueOf();

    expect(passedTime).toEqual(expectedPassedTime);
  });
});
