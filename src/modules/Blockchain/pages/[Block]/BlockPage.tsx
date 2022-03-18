import { Tabs } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout } from "../../../../common/components/PageLayout";

import * as Styled from "./BlockPage.styled";
import { useBlockPage } from "./hooks";

const { TabPane } = Tabs;

const BlockPage: NextPage = () => {
  const router = useRouter();
  const { block } = router.query;
  const { blockData } = useBlockPage(block);

  return (
    <Layout
      title="Block Details"
      type="card-lrg"
      heading="Block Details"
      description={`Blockchain | Block #${block}`}
      dexLayout={true}
    >
      <Styled.BlockCard>
        <Tabs>
          <TabPane tab="Blockchain" key="blockchain">
            <Styled.BlockWrapper>
              <Styled.BlockNumber>
                <span>Block #{block}</span>
                <span>
                  <Link href={`/blockchain/${Number(block) - 1}`}>
                    Previous
                  </Link>{" "}
                  | <Link href={`/blockchain/${Number(block) + 1}`}>Next</Link>
                </span>
              </Styled.BlockNumber>
              <Styled.BlockTime>{blockData.time}</Styled.BlockTime>
              <Styled.BlockInfoTitle>Block Information</Styled.BlockInfoTitle>
              <Styled.BlockInfo>
                <span>Transactions</span>
                <span>{blockData.transactions}</span>
              </Styled.BlockInfo>
              <Styled.BlockInfo>
                <span>Witness</span>
                <span>
                  <Link href={`/user/${blockData.witness}`}>
                    {blockData.witness}
                  </Link>
                </span>
              </Styled.BlockInfo>
            </Styled.BlockWrapper>
          </TabPane>
          <TabPane tab="Assets" key="assets"></TabPane>
          <TabPane tab="Witnesses" key="witnesses"></TabPane>
          <TabPane tab="Committe" key="committe"></TabPane>
          <TabPane tab="Fees" key="fees"></TabPane>
        </Tabs>
      </Styled.BlockCard>
    </Layout>
  );
};

export default BlockPage;
