import { InfoCircleOutlined } from "../../../../ui/src";

import * as Styled from "./ProxyTab.styled";
import { ProxyForm, ProxyTable } from "./components";

export const ProxyTab = (): JSX.Element => {
  return (
    <Styled.ProxyTabWrapper>
      <Styled.ProxyIntroWrapper>
        <p>Proxy your vote to other accounts</p>
        <Styled.ProxyInfoLink>
          <InfoCircleOutlined /> <a>See details here</a>
        </Styled.ProxyInfoLink>
      </Styled.ProxyIntroWrapper>
      <ProxyForm />
      <ProxyTable />
    </Styled.ProxyTabWrapper>
  );
};
