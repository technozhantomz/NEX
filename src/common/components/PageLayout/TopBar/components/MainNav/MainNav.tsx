import {
  DollarOutlined,
  MenuCard,
  PoweroffOutlined,
  SettingOutlined,
  Switch,
} from "../../../../../../ui/src";
import {
  Blockchain,
  Dashboard,
  Market,
  Vote,
} from "../../../../../../ui/src/icons";
import { useUserContext } from "../../../../../providers";
import { MenuItem } from "../MenuItem";

import { useAdvancedMode } from "./hooks";

export const MainNav = (): JSX.Element => {
  const { advancedMode, handleAdvancedModeChange } = useAdvancedMode();
  const { localStorageAccount } = useUserContext();
  return (
    <MenuCard bordered={false}>
      <ul>
        {localStorageAccount ? (
          ""
        ) : (
          <li>
            <MenuItem
              Href="/login"
              Icon={<PoweroffOutlined className={"menu-icon"} />}
              Label="Login"
            />
          </li>
        )}

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
            Href="/blockchain"
            Icon={<Blockchain className={"menu-icon"} />}
            Label="Blocks"
          />
        </li>
        {!localStorageAccount ? (
          ""
        ) : (
          <>
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
                onChange={handleAdvancedModeChange}
                defaultChecked={advancedMode}
              />
              <span> Advanced Settings</span>
            </li>
          </>
        )}

        {localStorageAccount && advancedMode ? (
          <>
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

        {!localStorageAccount ? (
          ""
        ) : (
          <li className={"logout"}>
            <MenuItem
              Href="/logout"
              Icon={<PoweroffOutlined className={"menu-icon"} />}
              Label="Logout"
            />
          </li>
        )}
      </ul>
    </MenuCard>
  );
};
