import { PairAssets } from "../../../Market/types";

import { useBalances } from "./hooks";

type Props = {
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  activePair: string;
};

export function Balances({
  selectedAssets,
  loadingSelectedPair,
  activePair,
}: Props): JSX.Element {
  console.log(selectedAssets);
  const { balance } = useBalances(selectedAssets, loadingSelectedPair);

  console.log(balance);
  return (
    <>
      <p>
        {activePair.split("_")[0]} {balance.userQuoteAssetAmount}
      </p>
      <p>
        {activePair.split("_")[1]} {balance.userBaseAssetAmount}
      </p>
    </>
  );
}
