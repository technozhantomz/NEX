import { Dropdown } from "antd";

import {
  BellOutlined,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
import { useUserContext } from "../../../../UserProvider/UserProvider";
import { MainNav } from "../MainNav";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";

import * as Styled from "./MainNavBar.styled";
import { useToggleMenu } from "./hooks/useToggleMenu";

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
            {/* <BellOutlined
              className={"bell"}
              onMouseOver={() => toggleMenu("notify")}
              onClick={() => toggleMenu("notify")}
            /> */}
            <Dropdown overlay={<NotificationMenu />}>
              <BellOutlined className={"bell"} />
            </Dropdown>
            {/* <div
              onMouseOver={() => toggleMenu("profile")}
              onClick={() => toggleMenu("profile")}
            >
              <Styled.MainNavBarAvitar
                icon={localStorageAccount ? "" : <UserOutlined />}
              >
                {localStorageAccount ? localStorageAccount.charAt(0) : ""}
              </Styled.MainNavBarAvitar>
            </div> */}

            <Dropdown overlay={<ProfileMenu />}>
              <Styled.MainNavBarAvitar
                icon={localStorageAccount ? "" : <UserOutlined />}
              >
                {localStorageAccount ? localStorageAccount.charAt(0) : ""}
              </Styled.MainNavBarAvitar>
            </Dropdown>
          </>
        ) : (
          ""
        )}

        <Dropdown overlay={<MainNav />}>
          <MoreOutlined className={"hambuger"} />
        </Dropdown>
      </Styled.MainNavBar>

      {/* <Styled.MenuWrapper
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
      </Styled.MenuWrapper> */}
    </>
  );
};
