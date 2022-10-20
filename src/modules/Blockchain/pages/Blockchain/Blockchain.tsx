import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import {
  Button,
  DownOutlined,
  Menu,
  Tabs,
  UpOutlined,
} from "../../../../ui/src";
// import {
//   AssetsTab,
//   BlockchainTab,
//   BlockDetails,
//   CommitteeTab,
//   FeesTab,
//   SonsTab,
//   TransactionDetails,
//   WitnessesTab,
// } from "../../components";

import * as Styled from "./Blockchain.styled";
import { BlockchainTabItems } from "./BlockchainTabItems";
import { useBlockchainPage } from "./hooks";

// const { TabPane } = Tabs;

const Blockchain: NextPage = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { block, tab } = router.query;
  const { pageMeta, blockNum, transactionId } = useBlockchainPage(tab, block);
  const { sm } = useViewportContext();
  const blockchainTabItems = BlockchainTabItems(block, blockNum, transactionId);
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {sm ? (
        <Styled.MobileDropdownWrapper>
          <Styled.MobileDropdown
            visible={visible}
            overlay={
              <Styled.MobileTabsWrapper>
                <Menu
                  onClick={(item: any) => {
                    props.onTabClick(item.key);
                  }}
                  items={props.panes.map((pane: any) => {
                    return { label: pane.props.tab, key: pane.key };
                  })}
                  selectedKeys={tab ? [tab as string] : ["blockchain"]}
                />
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab
                ? counterpart.translate(`pages.blocks.${tab}.${tab}`)
                : counterpart.translate(
                    `pages.blocks.blockchain.blockchain`
                  )}{" "}
              {!visible ? <DownOutlined /> : <UpOutlined />}
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      ) : (
        <DefaultTabBar {...props}>{(node: any) => <>{node}</>}</DefaultTabBar>
      )}
    </>
  );

  return (
    <Layout
      title={`${pageMeta.title}`}
      type="card-lrg"
      heading={`${pageMeta.heading}`}
      description={`${pageMeta.description}`}
      dexLayout={true}
      onClick={() => {
        if (sm) {
          visible && setVisible(false);
        }
      }}
    >
      <Styled.BlockchainCard>
        <Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "blockchain"}`}
          onTabClick={(key) => {
            router.push(`/blockchain?tab=${key}`);
            if (sm) setVisible(false);
          }}
          items={blockchainTabItems}
        />
      </Styled.BlockchainCard>
    </Layout>
  );
};

export default Blockchain;
