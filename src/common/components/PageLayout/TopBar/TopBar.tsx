import Link from "next/link";

import { Logo } from "../../../../ui/src/icons";

import * as Styled from "./TopBar.styled";
import { MainNavBar } from "./components/MainNavBar";

export const TopBar = (): JSX.Element => {
  return (
    <Styled.TopBar className="top-bar">
      <div className={"topbar-left"}>
        <Link href={"/"} passHref>
          <Logo className={"logo"} />
        </Link>
        <p className="dex-logo">DEX</p>
      </div>
      <div className={"topbar-right"}>
        <MainNavBar />
      </div>
    </Styled.TopBar>
  );
};
