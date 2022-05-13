import { Badge } from "antd";

import {
  Avatar,
  BellOutlined,
  MenuOutlined,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
import { breakpoints } from "../../../../../../ui/src/breakpoints";
import {
  useMenuContext,
  useUserContext,
  useViewportContext,
} from "../../../../../providers";
import { MainNav } from "../MainNav";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";

import * as Styled from "./MainNavBar.styled";

export const MainNavBar = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const { width } = useViewportContext();
  const {
    mainMenuOpen,
    profileMenuOpen,
    notificationMenuOpen,
    unreadMessages,
    toggleMenu,
    closeMenu,
  } = useMenuContext();
  const CloseButton = (
    <>
      {width < breakpoints.xs ? (
        <Styled.CloseButton type="text" className="close" onClick={closeMenu}>
          X
        </Styled.CloseButton>
      ) : (
        ""
      )}
    </>
  );
  return (
    <>
      <Styled.MainNavBar>
        {localStorageAccount ? (
          <>
            {unreadMessages ? (
              <Badge dot>
                <BellOutlined
                  className={"bell"}
                  onMouseOver={() => toggleMenu("notify")}
                  onClick={() => toggleMenu("notify")}
                />
              </Badge>
            ) : (
              <BellOutlined
                className={"bell"}
                onMouseOver={() => toggleMenu("notify")}
                onClick={() => toggleMenu("notify")}
              />
            )}
            {width > breakpoints.xs ? (
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
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {width > breakpoints.xs ? (
          <MoreOutlined
            className={"hambuger"}
            onMouseOver={() => toggleMenu("main")}
            onClick={() => toggleMenu("main")}
          />
        ) : (
          <MenuOutlined
            className={"hambuger"}
            onMouseOver={() => toggleMenu("main")}
            onClick={() => toggleMenu("main")}
          />
        )}
      </Styled.MainNavBar>
      {localStorageAccount ? (
        <>
          <Styled.MenuWrapper
            className={`notification-menu-wrapper${
              notificationMenuOpen ? " open" : ""
            }`}
          >
            {CloseButton}
            <NotificationMenu />
          </Styled.MenuWrapper>
          <Styled.MenuWrapper
            className={`profile-wrapper${profileMenuOpen ? " open" : ""}`}
          >
            {CloseButton}
            <ProfileMenu />
          </Styled.MenuWrapper>
        </>
      ) : (
        ""
      )}
      <Styled.MenuWrapper
        className={`main-menu-wrapper${mainMenuOpen ? " open" : ""}`}
      >
        {CloseButton}
        <MainNav />
      </Styled.MenuWrapper>
    </>
  );
};
