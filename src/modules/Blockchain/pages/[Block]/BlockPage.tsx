import { Tabs } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Layout } from "../../../../common/components/PageLayout";

import * as Styled from "./BlockPage.styled";

const { TabPane } = Tabs;

const BlockPage: NextPage = () => {
  const router = useRouter();
  const { block } = router.query;
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
            <div>
              <span>Block #{block}</span>
              <span>
                <Link href={`/blockchain/${Number(block) - 1}`}>Previous</Link>{" "}
                | <Link href={`/blockchain/${Number(block) + 1}`}>Next</Link>
              </span>
            </div>
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
