import { act, renderHook } from "@testing-library/react";

import { useTradingPairStyles } from "../hooks";

describe("useTradingPairStyles", () => {
  it("should return the correct theme and callbacks when percentChange is a positive number", () => {
    const { result } = renderHook(() => useTradingPairStyles("5%"));
    const {
      positiveTheme,
      showChangeAndVolume,
      changeBackgroundColor,
      handleMouseHover,
      handleMouseOut,
    } = result.current;

    expect(positiveTheme).toEqual({
      backgroundColorCode: "#CBFFED 0%",
      display: "none",
      percentChangeColor: "#1CB881",
    });
    expect(showChangeAndVolume).toBe(false);
    expect(changeBackgroundColor).toBe(false);

    act(() => {
      handleMouseHover();
    });

    expect(showChangeAndVolume).toBe(false);
    expect(changeBackgroundColor).toBe(false);

    act(() => {
      handleMouseOut();
    });

    expect(showChangeAndVolume).toBe(false);
  });

  it("should return the correct theme and callbacks when percentChange is a negative number", () => {
    const { result } = renderHook(() => useTradingPairStyles("-5%"));
    const {
      negativeTheme,
      showChangeAndVolume,
      changeBackgroundColor,
      handleMouseHover,
      handleMouseOut,
    } = result.current;

    expect(negativeTheme).toEqual({
      backgroundColorCode: "#FFE7E7 0%",
      display: "block",
      percentChangeColor: "#E2444D;",
    });
    expect(showChangeAndVolume).toBe(false);
    expect(changeBackgroundColor).toBe(false);

    act(() => {
      handleMouseHover();
    });

    expect(showChangeAndVolume).toBe(false);
    expect(changeBackgroundColor).toBe(false);

    act(() => {
      handleMouseOut();
    });

    expect(showChangeAndVolume).toBe(false);
  });
});
