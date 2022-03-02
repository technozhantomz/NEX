import { Logo } from "../../../../ui/src/icons";

import * as Styled from "./TopBar.styled";
import { MainNavBar } from "./components/MainNavBar";

export const TopBar = (): JSX.Element => {
  return (
    <Styled.TopBar>
      <div className={"topbar-left"}>
        <Logo className={"logo"} />
      </div>
      <div className={"topbar-right"}>
        <MainNavBar />
      </div>
    </Styled.TopBar>
  );
};
