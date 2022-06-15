import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";

import { useBlockchainTab } from "../BlockchainTab/hooks";

import * as Styled from "./BlockDetails.styled";
import { useBlockDetails } from "./hooks";

type Props = {
  block: string;
};
export const BlockDetails = ({ block }: Props): JSX.Element => {
  const router = useRouter();
  const { blockDetails } = useBlockDetails(block as string);
  const { blockchainData } = useBlockchainTab(router.query);

  return (
    <Styled.BlockWrapper>
      <Styled.BlockNumber>
        <span>
          {counterpart.translate(`pages.blocks.blockchain.block`)} #{block}
        </span>
        <span>
          <Link href={`/blockchain/${Number(block) - 1}`}>
            {counterpart.translate(`buttons.previous`)}
          </Link>{" "}
          |{" "}
          {Number(block) <= blockchainData.currentBlock ? (
            <Link href={`/blockchain/${Number(block) + 1}`} scroll={false}>
              {counterpart.translate(`buttons.next`)}
            </Link>
          ) : (
            counterpart.translate(`buttons.next`)
          )}
        </span>
      </Styled.BlockNumber>
      <Styled.BlockTime>{blockDetails.time}</Styled.BlockTime>
      <Styled.BlockInfoTitle>
        {counterpart.translate(`pages.blocks.blockchain.block_information`)}
      </Styled.BlockInfoTitle>
      <Styled.BlockInfo>
        <span>
          {counterpart.translate(`pages.blocks.blockchain.transactions`)}
        </span>
        <span>{blockDetails.transaction}</span>
      </Styled.BlockInfo>
      <Styled.BlockInfo>
        <span>{counterpart.translate(`pages.blocks.blockchain.witness`)}</span>
        <span>
          <Link href={`/user/${blockDetails.witness}`}>
            {blockDetails.witness}
          </Link>
        </span>
      </Styled.BlockInfo>
    </Styled.BlockWrapper>
  );
};
