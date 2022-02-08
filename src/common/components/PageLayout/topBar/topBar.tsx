import { Logo } from "../../../../ui/src/icons";

import MainNavBar from "./mainNavBar";
import * as Styled from "./topBar.styled";

const TopBar = (): JSX.Element => {
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

export default TopBar;
