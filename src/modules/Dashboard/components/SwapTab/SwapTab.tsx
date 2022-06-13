import React from "react";

import * as Styled from "./SwapTab.styled";
import { AssetSelect } from "./components";
import { useSwapTab } from "./hooks/useSwapTab";

export const SwapTab = (): JSX.Element => {
  const { toAsset, fromAsset, handleFromAssetChange, handleToAssetChange } = useSwapTab();

  return (
    <Styled.SwapContainer>
      <AssetSelect
        selectedAsset={fromAsset}
        handleAssetChange={handleFromAssetChange}
      />
      <AssetSelect
        selectedAsset={toAsset}
        handleAssetChange={handleToAssetChange}
      />
    </Styled.SwapContainer>
  );
};
