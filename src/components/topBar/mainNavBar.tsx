import { BellOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useState } from "react";

import { useUser } from "../../context";
import Styles from "../../styles/topbar/mainNav.module.scss";

import MainNav from "./mainMenu";
import MenuWrapper from "./menuWrapper";
import NotificationMenu from "./notificationMenu";
import ProfileNav from "./profileMenu";

const MainNavBar = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotifiOpen] = useState<boolean>(false);
  const { accountData } = useUser();

  const toggleMenu = (menu: string): void => {
    if (menu === "main") {
      setProfileOpen(false);
      setNotifiOpen(false);
      menuOpen ? setMenuOpen(false) : setMenuOpen(true);
    }
    if (menu === "profile") {
      setMenuOpen(false);
      setNotifiOpen(false);
      menuOpen ? setProfileOpen(false) : setProfileOpen(true);
    }
    if (menu === "notifi") {
      setMenuOpen(false);
      setProfileOpen(false);
      menuOpen ? setNotifiOpen(false) : setNotifiOpen(true);
    }
  };

  return (
    <>
      <div className={Styles.MainNavBar}>
        <BellOutlined
          className={Styles.Bell}
          onMouseOver={() => toggleMenu("notifi")}
          onClick={() => toggleMenu("notifi")}
        />
        {accountData !== undefined ? (
          <div
            onMouseOver={() => toggleMenu("profile")}
            onClick={() => toggleMenu("profile")}
          >
            <Avatar icon={accountData !== undefined ? "" : <UserOutlined />}>
              {accountData !== undefined ? accountData.name.charAt(0) : ""}
            </Avatar>
          </div>
        ) : (
          ""
        )}
        <MoreOutlined
          className={Styles.Hambuger}
          onMouseOver={() => toggleMenu("main")}
          onClick={() => toggleMenu("main")}
        />
      </div>
      <MenuWrapper
        open={notificationsOpen}
        menuClass="NotificationMenuWrapper"
        closeMethod={() => setNotifiOpen(false)}
      >
        <NotificationMenu />
      </MenuWrapper>
      <MenuWrapper
        open={profileOpen}
        menuClass="ProfileWrapper"
        closeMethod={() => setProfileOpen(false)}
      >
        <ProfileNav />
      </MenuWrapper>
      <MenuWrapper
        open={menuOpen}
        menuClass="MainMenuWrapper"
        closeMethod={() => setMenuOpen(false)}
      >
        <MainNav />
      </MenuWrapper>
    </>
  );
};

export default MainNavBar;
