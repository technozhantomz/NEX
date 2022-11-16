import Link from "next/link";

import { Logo } from "../../../../ui/src/icons";

import * as Styled from "./TopBar.styled";
import { MainNavBar } from "./components/MainNavBar";

export const TopBar = (): JSX.Element => {
  return (
    <Styled.TopBar className="top-bar">
      <div className={"topbar-left"}>
        <div className="peerplays-logo">
          <Link href="/" className="logo-link">
            <Logo className={"logo"} />
            <h1 className="peer">
              PEER<span className="plays">PLAYS</span>
            </h1>
          </Link>
          <p className="dex-logo">DEX</p>
          <p className="link-logo">LINK</p>
        </div>
      </div>
      <div className={"topbar-right"}>
        <MainNavBar />
      </div>
    </Styled.TopBar>
  );
};
