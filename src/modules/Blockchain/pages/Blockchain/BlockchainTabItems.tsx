import counterpart from "counterpart";
import { ReactNode } from "react";

import {
  AssetsTab,
  BlockchainTab,
  BlockDetails,
  CommitteeTab,
  FeesTab,
  SonsTab,
  TransactionDetails,
  WitnessesTab,
} from "../../components";

export const BlockchainTabItems = (
  block: string | string[] | undefined,
  blockNum: number | undefined,
  transactionId: string | undefined
): { key: string; label: ReactNode; children: ReactNode }[] => {
  const BlockTab = (): JSX.Element => {
    return (
      <>
        {block ? (
          <>
            {transactionId ? (
              <TransactionDetails
                block={blockNum as number}
                transaction={transactionId}
              />
            ) : (
              <BlockDetails block={blockNum as unknown as number} />
            )}
          </>
        ) : (
          <BlockchainTab />
        )}
      </>
    );
  };

  const label = [
    "blockchain",
    "assets",
    "witnesses",
    "committees",
    "sons",
    "fees",
  ];
  const key = [
    "blockchain",
    "assets",
    "witnesses",
    "committees",
    "sons",
    "fees",
  ];
  const children = [
    <BlockTab />,
    <AssetsTab />,
    <WitnessesTab />,
    <CommitteeTab />,
    <SonsTab />,
    <FeesTab />,
  ];

  return label.map((item, index) => {
    return {
      label: counterpart.translate(`pages.blocks.${item}.${item}`),
      key: key[index],
      children: children[index],
    };
  });
};
