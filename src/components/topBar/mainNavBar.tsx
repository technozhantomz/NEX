import { BellOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useState } from "react";

import Styles from "../../styles/mainMenu.module.scss";

import MainNav from "./mainNav";
import ProfileNav from "./profileNav";

const MainNavBar = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const openMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  return (
    <>
      <div className={Styles.MainNavBar}>
        <BellOutlined className={Styles.Bell} />
        <Dropdown
          className={Styles.DropDownToggle}
          overlay={ProfileNav}
          placement="bottomRight"
        >
          <a className="ant-dropdown-link">
            <Avatar icon={<UserOutlined />} />
          </a>
        </Dropdown>
        <MoreOutlined
          className={Styles.Hambuger}
          onMouseOver={openMenu}
          onClick={openMenu}
        />
      </div>
      <div className={Styles.MainMenu}>{menuOpen ? <MainNav /> : ""}</div>
    </>
  );
};

export default MainNavBar;
