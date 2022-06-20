import counterpart from "counterpart";
import React from "react";

import { useUserContext } from "../../../../common/providers";

import * as Styled from "./SwapTab.styled";
import { AssetSelect } from "./components";
import { useSwapTab } from "./hooks/useSwapTab";

export const SwapTab = (): JSX.Element => {
  const { toAsset, fromAsset, handleFromAssetChange, handleToAssetChange } =
    useSwapTab();
  const { localStorageAccount } = useUserContext();

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
      <Styled.SwapFormButton type="primary" htmlType="submit">
        {localStorageAccount
          ? counterpart.translate("buttons.swap")
          : counterpart.translate("buttons.login")}
      </Styled.SwapFormButton>
    </Styled.SwapContainer>
  );
};
