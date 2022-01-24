import {
  DollarOutlined,
  PoweroffOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Switch } from "antd";
import Link from "next/link";
import { useState } from "react";

import Styles from "../../styles/mainMenu.module.scss";
import { Blockchain, Contacts, Dashboard, Market, Vote } from "../icons";

const MainNav = (): JSX.Element => {
  const [advancedSettings, setAdvancedSettings] = useState<boolean>();

  const onChange = (checked: boolean): void => {
    setAdvancedSettings(checked);
  };

  return (
    <Card className={Styles.MainMenu} bordered={false}>
      <ul>
        <li>
          <Link href="/dashboard">
            <a className={Styles.MenuItem}>
              <div>
                <Dashboard className={Styles.MenuIcon} /> Dashboard
              </div>
              <div>
                <RightOutlined className={Styles.MenuItemArrow} />
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/market">
            <a className={Styles.MenuItem}>
              <div>
                <Market className={Styles.MenuIcon} /> Market
              </div>
              <div>
                <RightOutlined className={Styles.MenuItemArrow} />
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/wallet">
            <a className={Styles.MenuItem}>
              <div>
                <DollarOutlined className={Styles.MenuIcon} /> Wallet
              </div>
              <div>
                <RightOutlined className={Styles.MenuItemArrow} />
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <a className={Styles.MenuItem}>
              <div>
                <SettingOutlined className={Styles.MenuIcon} /> Settings
              </div>
              <div>
                <RightOutlined className={Styles.MenuItemArrow} />
              </div>
            </a>
          </Link>
        </li>
        <li className={Styles.Advanced}>
          <Switch size="small" onChange={onChange} /> Advanced Settings
        </li>

        {advancedSettings ? (
          <>
            <li>
              <Link href="/blockchain">
                <a className={Styles.MenuItem}>
                  <div>
                    <Blockchain className={Styles.MenuIcon} /> Blocks
                  </div>
                  <div>
                    <RightOutlined className={Styles.MenuItemArrow} />
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/voting">
                <a className={Styles.MenuItem}>
                  <div>
                    <Vote className={Styles.MenuIcon} /> Voting
                  </div>
                  <div>
                    <RightOutlined className={Styles.MenuItemArrow} />
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contacts">
                <a className={Styles.MenuItem}>
                  <div>
                    <Contacts className={Styles.MenuIcon} /> Contacts
                  </div>
                  <div>
                    <RightOutlined className={Styles.MenuItemArrow} />
                  </div>
                </a>
              </Link>
            </li>
          </>
        ) : (
          ""
        )}
        <li className={Styles.Logout}>
          <Link href="/logout">
            <a className={Styles.MenuItem}>
              <div>
                <PoweroffOutlined className={Styles.MenuIcon} /> Logout
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </Card>
  );
};

export default MainNav;
