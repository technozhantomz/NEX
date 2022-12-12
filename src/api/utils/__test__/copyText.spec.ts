import { copyText } from "../copyText";

Object.assign(navigator, {
  clipboard: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    writeText: jest.fn(),
  },
});

describe("copyText", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call navigator.clipboard.writeText with the correct argument", () => {
    const value = "mw9asoJCfzKBNrktcg6DyqCdj3SDz9Yx7N";
    const spy = jest.spyOn(navigator.clipboard, "writeText");
    copyText(value);
    expect(spy).toHaveBeenCalledWith(value);
  });

  it("should not throw an error if navigator.clipboard is undefined", () => {
    (navigator as any).clipboard = undefined;
    expect(() => copyText("mw9asoJCfzKBNrktcg6DyqCdj3SDz9Yx7N")).not.toThrow();
  });
});
