import counterpart from "counterpart";

import {
  DollarOutlined,
  LinkOutlined,
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
  SignupIcon,
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
  const { openMenu } = useMenuContext();
  return (
    <MenuCard
      bordered={false}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ul>
        {localStorageAccount ? (
          ""
        ) : (
          <>
            <li>
              <MenuItem
                href="/login"
                icon={<PoweroffOutlined className={"menu-icon"} />}
                label={counterpart.translate(`buttons.login`)}
              />
            </li>
            <li>
              <MenuItem
                href="/signup"
                icon={<SignupIcon className={"menu-icon"} />}
                label={counterpart.translate(`buttons.create_account`)}
              />
            </li>
          </>
        )}
        <li>
          <MenuItem
            href="/"
            icon={<Dashboard className={"menu-icon"} />}
            label={counterpart.translate(`pages.dashboard.heading`)}
          />
        </li>
        <li>
          <MenuItem
            href={`/market/${exchanges.active}`}
            icon={<Market className={"menu-icon"} />}
            label={counterpart.translate(`pages.market.heading`)}
          />
        </li>
        <li>
          <MenuItem
            href={`/peerlink`}
            icon={<LinkOutlined className={"menu-icon"} />}
            label={counterpart.translate(`pages.peerlink.heading`)}
          />
        </li>
        <li>
          <MenuItem
            href="/blockchain"
            icon={<Blockchain className={"menu-icon"} />}
            label={counterpart.translate(`pages.blocks.heading`)}
          />
        </li>
        <li>
          <MenuItem
            href="/settings"
            icon={<SettingOutlined className={"menu-icon"} />}
            label={counterpart.translate(`pages.settings.heading`)}
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
                label={counterpart.translate(`pages.wallet.heading`)}
              />
            </li>
            {sm ? (
              <li>
                <MenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    openMenu("profile");
                  }}
                  icon={<UserOutlined className={"menu-icon avitar"} />}
                  label={counterpart.translate(`links.profile`)}
                />
              </li>
            ) : (
              ""
            )}
            <li className={"advanced"}>
              <Switch
                size="small"
                onChange={(checked) => {
                  handleAdvancedModeChange(checked);
                }}
                defaultChecked={advancedMode}
              />
              <span>
                {counterpart.translate(`field.labels.advanced_settings`)}
              </span>
            </li>
          </>
        )}

        {localStorageAccount && advancedMode ? (
          <>
            <li>
              <MenuItem
                href="/voting"
                icon={<Vote className={"menu-icon"} />}
                label={counterpart.translate(`pages.voting.heading`)}
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
              label={counterpart.translate(`pages.logout.heading`)}
            />
          </li>
        )}
      </ul>
    </MenuCard>
  );
};
