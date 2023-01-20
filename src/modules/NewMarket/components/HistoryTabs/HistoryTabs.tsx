import counterpart from "counterpart";

import { HistoryTable } from "../HistoryTable";

import * as Styled from "./HistoryTabs.styled";

export function HistoryTabs(): JSX.Element {
  const tabItems = [
    {
      label: counterpart.translate(`pages.market.tabs.history.all`),
      key: "trade-history",
      children: (
        <Styled.TabContentContainer>
          <HistoryTable />
        </Styled.TabContentContainer>
      ),
    },
    {
      label: counterpart.translate(`pages.market.tabs.history.user`),
      key: "user-history",
      children: (
        <Styled.TabContentContainer>
          <HistoryTable forUser={true} />
        </Styled.TabContentContainer>
      ),
    },
  ];
  return (
    <Styled.Tabs
      defaultActiveKey="trade-history"
      centered={true}
      items={tabItems}
    />
  );
}
