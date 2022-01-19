import { BellOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";

import Styles from "../../styles/mainMenu.module.scss";

import MainNav from "./mainNav";
import ProfileNav from "./profileNav";

const MainNavBar = (): JSX.Element => {
  return (
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
      <Dropdown
        className={Styles.DropDownToggle}
        overlay={MainNav}
        placement="bottomRight"
      >
        <a className="ant-dropdown-link">
          <MoreOutlined />
        </a>
      </Dropdown>
      {/* <MainNav /> */}
    </div>
  );
};

export default MainNavBar;
