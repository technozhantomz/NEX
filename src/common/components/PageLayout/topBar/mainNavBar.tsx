import { BellOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useUser } from "../../../../context";

import MainNav from "./mainMenu";
import * as Styled from "./mainNavBar.styled";
import NotificationMenu from "./notificationMenu";
import ProfileNav from "./profileMenu";

const MainNavBar = (): JSX.Element => {
  const [nofiyMenuOpen, setNofiyMenuOpen] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);
  const { accountData } = useUser();

  const toggleMenu = (menuName: string): void => {
    switch (true) {
      case menuName === "notify":
        setNofiyMenuOpen(nofiyMenuOpen ? false : true);
        setProfileMenuOpen(false);
        setMainMenuOpen(false);
        break;
      case menuName === "profile":
        setProfileMenuOpen(profileMenuOpen ? false : true);
        setNofiyMenuOpen(false);
        setMainMenuOpen(false);
        break;
      case menuName === "main":
        setMainMenuOpen(mainMenuOpen ? false : true);
        setNofiyMenuOpen(false);
        setProfileMenuOpen(false);
        break;
    }
  };

  const closeMenu = () => {
    setNofiyMenuOpen(false);
    setProfileMenuOpen(false);
    setMainMenuOpen(false);
  };

  return (
    <>
      <Styled.MainNavBar>
        <BellOutlined
          className={"bell"}
          onMouseOver={() => toggleMenu("notify")}
          onClick={() => toggleMenu("notify")}
        />
        {accountData !== undefined ? (
          <div
            onMouseOver={() => toggleMenu("profile")}
            onClick={() => toggleMenu("profile")}
          >
            <Styled.MainNavBarAvitar
              icon={accountData !== undefined ? "" : <UserOutlined />}
            >
              {accountData !== undefined ? accountData.name.charAt(0) : ""}
            </Styled.MainNavBarAvitar>
          </div>
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
        className={`notification-menu-wrapper${nofiyMenuOpen ? " open" : ""}`}
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
        <ProfileNav />
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

export default MainNavBar;
