import { useCallback, useState } from "react";

import {
  Theme,
  UseTradingPairStylesResult,
} from "./useTradingPairStyles.types";

export function useTradingPairStyles(
  percentChange: string
): UseTradingPairStylesResult {
  const [showChangeAndVolume, setShowChangeAndVolume] =
    useState<boolean>(false);
  const [changeBackgroundColor, setChangeBackgroundColor] =
    useState<boolean>(false);
  const positiveTheme: Theme = {
    backgroundColorCode: "#CBFFED 0%",
    display: "none",
    percentChangeColor: "#1CB881",
  };

  const negativeTheme: Theme = {
    backgroundColorCode: "#FFE7E7 0%",
    display: "block",
    percentChangeColor: "#E2444D;",
  };
  const handleMouseHover = useCallback(() => {
    const PercentChangeNumber = parseInt(percentChange);

    if (PercentChangeNumber >= 0) {
      setChangeBackgroundColor(true);
    } else {
      setChangeBackgroundColor(false);
    }
    setShowChangeAndVolume(true);
  }, [setChangeBackgroundColor, setShowChangeAndVolume, percentChange]);

  const handleMouseOut = useCallback(() => {
    setShowChangeAndVolume(false);
  }, [setShowChangeAndVolume]);

  return {
    positiveTheme,
    negativeTheme,
    showChangeAndVolume,
    changeBackgroundColor,
    handleMouseHover,
    handleMouseOut,
  };
}
