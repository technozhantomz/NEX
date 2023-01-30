import counterpart from "counterpart";

import * as Styled from "./FormTabs.styled";

type Args = {
  isBuyForm: boolean;
};

export function FormTabs({ isBuyForm }: Args): JSX.Element {
  const tabItems = [
    {
      label: counterpart.translate(`pages.market.tabs.controls.limit`),
      key: "limit",
      children: <Styled.TabContentContainer>Hi</Styled.TabContentContainer>,
    },
    {
      label: counterpart.translate(`pages.market.tabs.controls.market`),
      key: "market",
      children: <Styled.TabContentContainer>Hey</Styled.TabContentContainer>,
    },
  ];

  return <Styled.Tabs defaultActiveKey="limit" items={tabItems} />;
}
