import counterpart from "counterpart";

import * as Styled from "./ControlsTabs.styled";

export function ControlsTabs(): JSX.Element {
  const tabItems = [
    {
      label: counterpart.translate(`buttons.buy`),
      key: "buy",
      children: <Styled.TabContentContainer>Hi</Styled.TabContentContainer>,
    },
    {
      label: counterpart.translate(`buttons.sell`),
      key: "sell",
      children: <Styled.TabContentContainer>Hey</Styled.TabContentContainer>,
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
