import {
  DollarOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Switch } from "antd";
import { useState } from "react";

import Styles from "../../styles/mainMenu.module.scss";
import { Blockchain, Contacts, Dashboard, Market, Vote } from "../icons";

import MenuItem from "./MenuItem";

const MainNav = (): JSX.Element => {
  const [advancedSettings, setAdvancedSettings] = useState<boolean>();

  const onChange = (checked: boolean): void => {
    setAdvancedSettings(checked);
  };

  return (
    <Card className={Styles.MainMenu} bordered={false}>
      <ul>
        <li>
          <MenuItem
            Href="/dashboard"
            Icon={<Dashboard className={Styles.MenuIcon} />}
            Label="Dashboard"
          />
        </li>
        <li>
          <MenuItem
            Href="/market"
            Icon={<Market className={Styles.MenuIcon} />}
            Label="Market"
          />
        </li>
        <li>
          <MenuItem
            Href="/wallet"
            Icon={<DollarOutlined className={Styles.MenuIcon} />}
            Label="Wallet"
          />
        </li>
        <li>
          <MenuItem
            Href="/settings"
            Icon={<SettingOutlined className={Styles.MenuIcon} />}
            Label="Settings"
          />
        </li>
        <li className={Styles.Advanced}>
          <Switch size="small" onChange={onChange} /> Advanced Settings
        </li>

        {advancedSettings ? (
          <>
            <li>
              <MenuItem
                Href="/blockchain"
                Icon={<Blockchain className={Styles.MenuIcon} />}
                Label="Blocks"
              />
            </li>
            <li>
              <MenuItem
                Href="/voting"
                Icon={<Vote className={Styles.MenuIcon} />}
                Label="Voting"
              />
            </li>
            <li>
              <MenuItem
                Href="/contacts"
                Icon={<Contacts className={Styles.MenuIcon} />}
                Label="Contacts"
              />
            </li>
          </>
        ) : (
          ""
        )}
        <li className={Styles.Logout}>
          <MenuItem
            Href="/logout"
            Icon={<PoweroffOutlined className={Styles.MenuIcon} />}
            Label="Logout"
          />
        </li>
      </ul>
    </Card>
  );
};

export default MainNav;
