import counterpart from "counterpart";
import { useCallback, useState } from "react";

import * as Styled from "./ControlsTabs.styled";
import { FormTabs } from "./components";

export function ControlsTabs(): JSX.Element {
  const tabItems = [
    {
      label: counterpart.translate(`buttons.buy`),
      key: "buy",
      children: (
        <Styled.TabContentContainer>
          <FormTabs isBuyForm={true} />
        </Styled.TabContentContainer>
      ),
    },
    {
      label: counterpart.translate(`buttons.sell`),
      key: "sell",
      children: (
        <Styled.TabContentContainer>
          <FormTabs isBuyForm={false} />
        </Styled.TabContentContainer>
      ),
    },
  ];
  const [className, setClassName] = useState<string>("buy");
  const onChange = useCallback(
    (activeKey: string) => {
      setClassName(activeKey);
    },
    [setClassName]
  );
  return (
    <Styled.TabsContainer>
      <Styled.Tabs
        defaultActiveKey="buy"
        centered={true}
        items={tabItems}
        className={className}
        onChange={onChange}
      />
    </Styled.TabsContainer>
  );
}
