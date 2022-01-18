import { BellOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";

import Styles from "../../styles/mainMenu.module.scss";

import MainNav from "./mainNav";

const MainNavBar = (): JSX.Element => {
  return (
    <div className={Styles.MainNavBar}>
      <BellOutlined className={Styles.Bell} />
      <Avatar icon={<UserOutlined />} />
      <Dropdown
        className={Styles.DropDownToggle}
        overlay={MainNav}
        trigger={["click"]}
        placement="bottomRight"
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <MoreOutlined />
        </a>
      </Dropdown>
      {/* <MainNav /> */}
    </div>
  );
};

export default MainNavBar;
