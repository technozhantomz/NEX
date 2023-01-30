import counterpart from "counterpart";

import { OrderForm } from "../OrderForm";

import * as Styled from "./FormTabs.styled";

type Props = {
  isBuyForm: boolean;
};

export function FormTabs({ isBuyForm }: Props): JSX.Element {
  const tabItems = [
    {
      label: counterpart.translate(`pages.market.tabs.controls.limit`),
      key: "limit",
      children: (
        <Styled.TabContentContainer>
          <OrderForm isBuyForm={isBuyForm}></OrderForm>
        </Styled.TabContentContainer>
      ),
    },
    {
      label: counterpart.translate(`pages.market.tabs.controls.market`),
      key: "market",
      children: (
        <Styled.TabContentContainer>
          <OrderForm isBuyForm={isBuyForm}></OrderForm>
        </Styled.TabContentContainer>
      ),
    },
  ];

  return <Styled.Tabs defaultActiveKey="limit" items={tabItems} />;
}
