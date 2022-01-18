import {
  BellOutlined,
  DollarOutlined,
  MoreOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import Link from "next/link";

import Styles from "../../styles/mainMenu.module.scss";

const { SubMenu } = Menu;

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
    </div>
  );
};

const MainNav = (
  <Menu mode="inline">
    <Menu.Item key="dashboad">
      <Link href="/dashboad">{/* Icon */} Dashboad</Link>
    </Menu.Item>
    <Menu.Item key="market">
      <Link href="/market">
        <a>{/* Icon */} Market</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="wallet">
      <Link href="/wallet">
        <a>
          <DollarOutlined /> Wallet
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item key="settings">
      <Link href="/settings">
        <a>
          <SettingOutlined /> Settings
        </a>
      </Link>
    </Menu.Item>
    <SubMenu key="advancedSettings" title="Advanced Settings">
      <Menu.Item key="blocks">
        <Link href="/blocks">
          {/* Icon */}
          Blocks
        </Link>
      </Menu.Item>
      <Menu.Item key="voting">
        <Link href="/voting">
          {/* Icon */}
          Voting
        </Link>
      </Menu.Item>
      <Menu.Item key="contacts">
        <Link href="/contacts">
          {/* Icon */}
          Contacts
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link href="/logout">
          <a>
            <PoweroffOutlined />
            Logout
          </a>
        </Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key="logout">
      <Link href="/logout">
        <a>Logout</a>
      </Link>
    </Menu.Item>
  </Menu>
);

export default MainNavBar;
