import { SetStateAction, useCallback } from "react";

import { Button, DownOutlined, Menu, UpOutlined } from "../../../ui/src";

import * as Styled from "./MobileTabBar.styled";

type Args = {
  showMobileMenu: boolean;
  visible: boolean;
  tab: string | string[] | undefined;
  setVisible: (value: SetStateAction<boolean>) => void;
  defaultKey: string;
  defaultTab: string;
  selectedTab: string;
};

export const MobileTabBar = ({
  showMobileMenu,
  visible,
  tab,
  setVisible,
  defaultKey,
  defaultTab,
  selectedTab,
}: Args): ((props: any, DefaultTabBar: any) => JSX.Element) => {
  const renderTabBar = useCallback(
    (props: any, DefaultTabBar: any) => (
      <>
        {showMobileMenu ? (
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
                    selectedKeys={tab ? [tab as string] : [defaultKey]}
                  />
                </Styled.MobileTabsWrapper>
              }
            >
              <Button type="text" onClick={() => setVisible(!visible)}>
                {tab ? selectedTab : defaultTab}{" "}
                {!visible ? <DownOutlined /> : <UpOutlined />}
              </Button>
            </Styled.MobileDropdown>
          </Styled.MobileDropdownWrapper>
        ) : (
          <DefaultTabBar {...props}>{(node: any) => <>{node}</>}</DefaultTabBar>
        )}
      </>
    ),
    [
      showMobileMenu,
      visible,
      tab,
      setVisible,
      defaultKey,
      defaultTab,
      selectedTab,
    ]
  );

  return renderTabBar;
};
