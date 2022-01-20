import {
  DollarOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import Link from "next/link";
// import { useState } from "react";

import { Blockchain, Contacts, Dashboard, Market, Vote } from "../icons";

const MainNav = (): JSX.Element => {
  // const [advancedSettings, setAdvancedSettings] = useState<boolean>(false);

  const onChange = (checked: boolean): void => {
    // setAdvancedSettings(checked);
    console.log(`switch to ${checked}`);
  };

  return (
    <Menu>
      <Menu.Item key="dashboard">
        <Link href="/dashboard">
          <a>
            <Dashboard /> Dashboard
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="market">
        <Link href="/market">
          <a>
            <Market /> Market
          </a>
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
      <Menu.Item key="advancedSettings">
        <Switch size="small" onChange={onChange} /> Advanced Settings
      </Menu.Item>
      <Menu.Item key="blockchain">
        <Link href="/blockchain">
          <a>
            <Blockchain /> Blocks
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="voting">
        <Link href="/voting">
          <a>
            <Vote /> Voting
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="contacts">
        <Link href="/contacts">
          <a>
            <Contacts /> Contacts
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link href="/logout">
          <a>
            <PoweroffOutlined /> Logout
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default MainNav;
