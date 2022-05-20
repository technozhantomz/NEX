import {
  BellOutlined,
  MenuOutlined,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
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
  const { sm } = useViewportContext();
  const {
    openMenu,
    closeMenu,
    notificationMenuOpen,
    profileMenuOpen,
    mainMenuOpen,
  } = useMenuContext();
  const CloseButton = (
    <>
      {sm ? (
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
            <BellOutlined
              className={"bell"}
              onMouseOver={() => openMenu("notify")}
              onClick={() => openMenu("notify")}
            />
            {sm ? (
              ""
            ) : (
              <div
                onMouseOver={() => openMenu("profile")}
                onClick={() => openMenu("profile")}
              >
                <Styled.MainNavBarAvitar
                  icon={localStorageAccount ? "" : <UserOutlined />}
                >
                  {localStorageAccount ? localStorageAccount.charAt(0) : ""}
                </Styled.MainNavBarAvitar>
              </div>
            )}
          </>
        ) : (
          ""
        )}
        {sm ? (
          <MenuOutlined
            className={"hambuger"}
            onMouseOver={() => openMenu("main")}
            onClick={() => openMenu("main")}
          />
        ) : (
          <MoreOutlined
            className={"hambuger"}
            onMouseOver={() => openMenu("main")}
            onClick={() => openMenu("main")}
          />
        )}
      </Styled.MainNavBar>
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
      <Styled.MenuWrapper
        className={`main-menu-wrapper${mainMenuOpen ? " open" : ""}`}
      >
        {CloseButton}
        <MainNav />
      </Styled.MenuWrapper>
    </>
  );
};
