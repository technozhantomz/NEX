import counterpart from "counterpart";

import * as Styled from "./ControlsTabs.styled";
import { FormTabs } from "./components";

type Props = {
  controlsTabsClassName: string;
  onChangeControlsTab: (activeKey: string) => void;
};

export function ControlsTabs({
  controlsTabsClassName,
  onChangeControlsTab,
}: Props): JSX.Element {
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
  return (
    <Styled.TabsContainer>
      <Styled.Tabs
        activeKey={controlsTabsClassName}
        centered={true}
        items={tabItems}
        className={controlsTabsClassName}
        onChange={onChangeControlsTab}
      />
    </Styled.TabsContainer>
  );
}
