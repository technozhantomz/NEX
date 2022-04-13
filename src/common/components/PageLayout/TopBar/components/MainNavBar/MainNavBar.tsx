import {
  BellOutlined,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
import { useUserContext } from "../../../../../providers";
import { MainNav } from "../MainNav";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";

import * as Styled from "./MainNavBar.styled";
import { useToggleMenu } from "./hooks";

export const MainNavBar = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    toggleMenu,
    closeMenu,
    notificationMenuOpen,
    profileMenuOpen,
    mainMenuOpen,
  } = useToggleMenu();
  return (
    <>
      <Styled.MainNavBar>
        {localStorageAccount ? (
          <>
            <BellOutlined
              className={"bell"}
              onMouseOver={() => toggleMenu("notify")}
              onClick={() => toggleMenu("notify")}
            />
            <div
              onMouseOver={() => toggleMenu("profile")}
              onClick={() => toggleMenu("profile")}
            >
              <Styled.MainNavBarAvitar
                icon={localStorageAccount ? "" : <UserOutlined />}
              >
                {localStorageAccount ? localStorageAccount.charAt(0) : ""}
              </Styled.MainNavBarAvitar>
            </div>
          </>
        ) : (
          ""
        )}
        <MoreOutlined
          className={"hambuger"}
          onMouseOver={() => toggleMenu("main")}
          onClick={() => toggleMenu("main")}
        />
      </Styled.MainNavBar>
      <Styled.MenuWrapper
        className={`notification-menu-wrapper${
          notificationMenuOpen ? " open" : ""
        }`}
      >
        <a className="close" onClick={closeMenu}>
          X
        </a>
        <NotificationMenu />
      </Styled.MenuWrapper>
      <Styled.MenuWrapper
        className={`profile-wrapper${profileMenuOpen ? " open" : ""}`}
      >
        <a className="close" onClick={closeMenu}>
          X
        </a>
        <ProfileMenu />
      </Styled.MenuWrapper>
      <Styled.MenuWrapper
        className={`main-menu-wrapper${mainMenuOpen ? " open" : ""}`}
      >
        <a className="close" onClick={closeMenu}>
          X
        </a>
        <MainNav />
      </Styled.MenuWrapper>
    </>
  );
};
