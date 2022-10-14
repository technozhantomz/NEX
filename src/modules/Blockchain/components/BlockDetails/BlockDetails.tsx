import counterpart from "counterpart";
import Link from "next/link";

import * as Styled from "./BlockDetails.styled";
import { useBlockDetails } from "./hooks";

type Props = {
  block: number;
};
export const BlockDetails = ({ block }: Props): JSX.Element => {
  const { blockDetails, hasNextBlock, hasPreviousBlock, loadingSideBlocks } =
    useBlockDetails(block);

  return (
    <Styled.BlockWrapper>
      <Styled.BlockNumber>
        <span>
          {counterpart.translate(`pages.blocks.blockchain.block`)} #{block}
        </span>
        <span>
          {!loadingSideBlocks && hasPreviousBlock ? (
            <Link href={`/blockchain/${Number(block) - 1}`}>
              <a>{counterpart.translate(`buttons.previous`)}</a>
            </Link>
          ) : (
            <span> {counterpart.translate(`buttons.previous`)}</span>
          )}{" "}
          |{" "}
          {!loadingSideBlocks && hasNextBlock ? (
            <Link href={`/blockchain/${Number(block) + 1}`}>
              <a>{counterpart.translate(`buttons.next`)}</a>
            </Link>
          ) : (
            <span>{counterpart.translate(`buttons.next`)}</span>
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
            <a>{blockDetails.witness}</a>
          </Link>
        </span>
      </Styled.BlockInfo>
    </Styled.BlockWrapper>
  );
};
