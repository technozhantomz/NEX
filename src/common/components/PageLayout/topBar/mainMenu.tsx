import {
  DollarOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";
import { useEffect, useState } from "react";

import { useUser } from "../../../../context";
import * as Styled from "../../../../ui/src";
import {
  Blockchain,
  Contacts,
  Dashboard,
  Market,
  Vote,
} from "../../../../ui/src/icons";

import MenuItem from "./MenuItem";

const MainNav = (): JSX.Element => {
  const [showAdvanced, setAdvanced] = useState<boolean>(false);
  const { userSettings, updateUserSettings } = useUser();

  const onChange = (checked: boolean): void => {
    setAdvanced(checked);
    updateUserSettings("advancedSettings", checked);
  };

  useEffect(() => {
    setAdvanced(userSettings.advancedSettings);
  }, [userSettings.advancedSettings, showAdvanced]);

  return (
    <Styled.MenuCard bordered={false}>
      <ul>
        <li>
          <MenuItem
            Href="/dashboard"
            Icon={<Dashboard className={"menu-icon"} />}
            Label="Dashboard"
          />
        </li>
        <li>
          <MenuItem
            Href="/market"
            Icon={<Market className={"menu-icon"} />}
            Label="Market"
          />
        </li>
        <li>
          <MenuItem
            Href="/wallet"
            Icon={<DollarOutlined className={"menu-icon"} />}
            Label="Wallet"
          />
        </li>
        <li>
          <MenuItem
            Href="/settings"
            Icon={<SettingOutlined className={"menu-icon"} />}
            Label="Settings"
          />
        </li>
        <li className={"advanced"}>
          <Switch
            size="small"
            onChange={onChange}
            defaultChecked={userSettings.advancedSettings}
          />
          <span> Advanced Settings</span>
        </li>
        {showAdvanced ? (
          <>
            <li>
              <MenuItem
                Href="/blockchain"
                Icon={<Blockchain className={"menu-icon"} />}
                Label="Blocks"
              />
            </li>
            <li>
              <MenuItem
                Href="/voting"
                Icon={<Vote className={"menu-icon"} />}
                Label="Voting"
              />
            </li>
          </>
        ) : (
          ""
        )}
        <li className={"logout"}>
          <MenuItem
            Href="/logout"
            Icon={<PoweroffOutlined className={"menu-icon"} />}
            Label="Logout"
          />
        </li>
      </ul>
    </Styled.MenuCard>
  );
};

export default MainNav;
