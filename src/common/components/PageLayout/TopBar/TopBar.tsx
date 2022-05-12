import Link from "next/link";

import { Logo } from "../../../../ui/src/icons";
import { MenuProvider } from "../../../providers";

import * as Styled from "./TopBar.styled";
import { MainNavBar } from "./components/MainNavBar";

export const TopBar = (): JSX.Element => {
  return (
    <Styled.TopBar className="top-bar">
      <div className={"topbar-left"}>
        <Link href="/" passHref>
          <a>
            <Logo className={"logo"} />
          </a>
        </Link>
        <p className="dex-logo">DEX</p>
      </div>
      <div className={"topbar-right"}>
        <MenuProvider>
          <MainNavBar />
        </MenuProvider>
      </div>
    </Styled.TopBar>
  );
};
