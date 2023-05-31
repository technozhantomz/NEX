import counterpart from "counterpart";

import { OrderForm } from "../OrderForm";

import * as Styled from "./FormTabs.styled";
import { useFormTabs } from "./hooks";

type Props = {
  isBuyForm: boolean;
};

export function FormTabs({ isBuyForm }: Props): JSX.Element {
  const { targetOrders, precisions, handleTabChange } = useFormTabs({
    isBuyForm,
  });
  const tabItems = [
    {
      label: counterpart.translate(`pages.market.tabs.controls.limit`),
      key: "limit",
      children: (
        <Styled.TabContentContainer>
          <OrderForm
            precisions={precisions}
            formType="limit"
            isBuyForm={isBuyForm}
          ></OrderForm>
        </Styled.TabContentContainer>
      ),
    },
    {
      label: counterpart.translate(`pages.market.tabs.controls.market`),
      key: "market",
      children: (
        <Styled.TabContentContainer>
          <OrderForm
            precisions={precisions}
            formType="market"
            isBuyForm={isBuyForm}
          ></OrderForm>
        </Styled.TabContentContainer>
      ),
      disabled: !targetOrders || !targetOrders.length,
    },
  ];

  return (
    <Styled.Tabs
      onChange={handleTabChange}
      defaultActiveKey="limit"
      items={tabItems}
    />
  );
}
