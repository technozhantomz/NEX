import {
  DollarOutlined,
  MenuCard,
  PoweroffOutlined,
  SettingOutlined,
  Switch,
  UserOutlined,
} from "../../../../../../ui/src";
import {
  Blockchain,
  Dashboard,
  Market,
  Vote,
} from "../../../../../../ui/src/icons";
import {
  useMenuContext,
  useSettingsContext,
  useUserContext,
  useViewportContext,
} from "../../../../../providers";
import { MenuItem } from "../MenuItem";

import { useAdvancedMode } from "./hooks";

export const MainNav = (): JSX.Element => {
  const { advancedMode, handleAdvancedModeChange } = useAdvancedMode();
  const { localStorageAccount } = useUserContext();
  const { exchanges } = useSettingsContext();
  const { sm } = useViewportContext();
  const { openMenu, closeMenu } = useMenuContext();
  return (
    <MenuCard bordered={false}>
      <ul>
        {localStorageAccount ? (
          ""
        ) : (
          <li>
            <MenuItem
              href="/login"
              icon={<PoweroffOutlined className={"menu-icon"} />}
              label="Login"
              onClick={closeMenu}
            />
          </li>
        )}

        <li>
          <MenuItem
            href="/dashboard"
            icon={<Dashboard className={"menu-icon"} />}
            label="Dashboard"
            onClick={closeMenu}
          />
        </li>
        <li>
          <MenuItem
            href={`/market/${exchanges.active}`}
            icon={<Market className={"menu-icon"} />}
            label="Market"
            onClick={closeMenu}
          />
        </li>
        <li>
          <MenuItem
            href="/blockchain"
            icon={<Blockchain className={"menu-icon"} />}
            label="Blocks"
            onClick={closeMenu}
          />
        </li>
        {!localStorageAccount ? (
          ""
        ) : (
          <>
            <li>
              <MenuItem
                href="/wallet"
                icon={<DollarOutlined className={"menu-icon"} />}
                label="Wallet"
                onClick={closeMenu}
              />
            </li>
            {sm ? (
              <li>
                <MenuItem
                  onClick={() => openMenu("profile")}
                  icon={<UserOutlined className={"menu-icon avitar"} />}
                  label="Profile"
                />
              </li>
            ) : (
              ""
            )}
            <li>
              <MenuItem
                href="/settings"
                icon={<SettingOutlined className={"menu-icon"} />}
                label="Settings"
                onClick={closeMenu}
              />
            </li>
            <li className={"advanced"}>
              <Switch
                size="small"
                onChange={(checked, e) => {
                  e.stopPropagation();
                  handleAdvancedModeChange(checked);
                }}
                defaultChecked={advancedMode}
              />
              <span>Advanced Settings</span>
            </li>
          </>
        )}

        {localStorageAccount && advancedMode ? (
          <>
            <li>
              <MenuItem
                href="/voting"
                icon={<Vote className={"menu-icon"} />}
                label="Voting"
                onClick={closeMenu}
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
              href="/logout"
              icon={<PoweroffOutlined className={"menu-icon"} />}
              label="Logout"
              onClick={closeMenu}
            />
          </li>
        )}
      </ul>
    </MenuCard>
  );
};
