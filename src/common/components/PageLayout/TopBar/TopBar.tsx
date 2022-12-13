import Link from "next/link";

import { Logo } from "../../../../ui/src/icons";

import * as Styled from "./TopBar.styled";
import { MainNavBar } from "./components/MainNavBar";

type Props = {
  layout?: string;
};

export const TopBar = ({ layout }: Props): JSX.Element => {
  return (
    <Styled.TopBar className="top-bar">
      <div className={"topbar-left"}>
        <div className="peerplays-logo">
          <Link
            className="logo-link"
            href={layout === "peerlink" ? "/peerlink" : "/"}
          >
            <Logo className={"logo"} />
            <h1 className="peer">
              PEER
              {layout === "peerlink" ? (
                <span className="link">LINK</span>
              ) : (
                <span className="plays">PLAYS</span>
              )}
            </h1>
          </Link>
          {layout === "dex" ? <p className="dex-logo">DEX</p> : ""}
        </div>
      </div>
      <div className={"topbar-right"}>
        <MainNavBar />
      </div>
    </Styled.TopBar>
  );
};
