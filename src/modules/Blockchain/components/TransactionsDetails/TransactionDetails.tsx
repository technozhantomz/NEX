import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import counterpart from "counterpart";
import Link from "next/link";

import { StatsCard } from "../../common";
import * as Styled from "../BlockDetails/BlockDetails.styled";
import { useBlockDetails } from "../BlockDetails/hooks";

// import { OperationsTable } from "./components";

type Props = {
  block: number;
  transaction: string;
};
export const TransactionDetails = ({
  block,
  transaction,
}: Props): JSX.Element => {
  const {
    blockDetails,
    hasNextTransition,
    hasPreviousTransition,
    loadingSideTransactions,
    selectedTransaction,
  } = useBlockDetails(block, parseInt(transaction));

  return (
    <>
      <Styled.BlockWrapper>
        <Styled.BlockNav>
          {!loadingSideTransactions && hasPreviousTransition ? (
            <Link
              href={`/blockchain/${Number(block)}/${Number(transaction) - 1}`}
            >
              <LeftOutlined />
            </Link>
          ) : (
            ""
          )}
          <Styled.BlockNavItem>
            <Styled.BlockNumber>
              <span>
                Transaction
                {transaction} of {blockDetails.transactions.length}
              </span>
            </Styled.BlockNumber>
            <Styled.BlockNumber>
              <span>
                {counterpart.translate(`pages.blocks.blockchain.block`)} #
                {block}
              </span>
            </Styled.BlockNumber>
          </Styled.BlockNavItem>
          <span>
            {!loadingSideTransactions && hasNextTransition ? (
              <Link
                href={`/blockchain/${Number(block)}/${Number(transaction) + 1}`}
              >
                <RightOutlined />
              </Link>
            ) : (
              ""
            )}
          </span>
        </Styled.BlockNav>
        <Styled.StatsCardsDeck>
          <StatsCard
            noData={block === 0}
            title={counterpart.translate(
              `pages.blocks.block_details.block_num`
            )}
            data={`${block}`}
            statsData={[block]}
          />
          <StatsCard
            noData={selectedTransaction.expiration === ""}
            title={counterpart.translate(`tableHead.expiration`)}
            isTimeCard={true}
            data={`${selectedTransaction.expiration}`}
            statsData={[0]}
          />
          <StatsCard
            noData={selectedTransaction.operations.length < 0}
            title={counterpart.translate(`tableHead.operations`)}
            data={`${selectedTransaction.operations.length}`}
            statsData={[selectedTransaction.operations.length]}
          />
        </Styled.StatsCardsDeck>
        <Styled.BlockInfo>
          <Styled.BlockInfoTitle>Transaction ID</Styled.BlockInfoTitle>
          <p>{selectedTransaction.id}</p>
        </Styled.BlockInfo>
        <Styled.TwoColumns>
          <Styled.BlockInfo>
            <Styled.BlockInfoTitle>Ref block prefix</Styled.BlockInfoTitle>
            <p>{selectedTransaction.refBlockPrefix}</p>
          </Styled.BlockInfo>
          <Styled.BlockInfo>
            <Styled.BlockInfoTitle>Ref block number</Styled.BlockInfoTitle>
            <p>{selectedTransaction.refBlockNum}</p>
          </Styled.BlockInfo>
        </Styled.TwoColumns>
        <Styled.BlockInfo>
          <Styled.BlockInfoTitle>
            {counterpart.translate(`tableHead.extensions`)}
          </Styled.BlockInfoTitle>
          <p>
            {selectedTransaction.extensions.length > 0
              ? selectedTransaction.extensions.length
              : "="}
          </p>
        </Styled.BlockInfo>
        <Styled.BlockInfo>
          <Styled.BlockInfoTitle>Signatures</Styled.BlockInfoTitle>
          <ol>
            {selectedTransaction.signatures.map(
              (signature: string): JSX.Element => {
                return <li key={signature}>{signature}</li>;
              }
            )}
          </ol>
        </Styled.BlockInfo>
      </Styled.BlockWrapper>
      {/* <OperationsTable transactionRow={selectedTransaction} /> */}
    </>
  );
};
