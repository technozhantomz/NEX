import counterpart from "counterpart";
import Link from "next/link";

import {
  Card,
  PoweroffOutlined,
  SettingOutlined,
} from "../../../../../../ui/src";
import { Vote } from "../../../../../../ui/src/icons";
import {
  useMenuContext,
  useUserContext,
  useViewportContext,
} from "../../../../../providers";
import { MenuItem } from "../MenuItem";

import * as Styled from "./ProfileMenu.styled";

const { Meta } = Card;

export const ProfileMenu = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const { sm } = useViewportContext();
  const { closeMenu } = useMenuContext();

  return (
    <Styled.ProfileMenu bordered={false}>
      <Meta
        avatar={
          <Styled.ProfileAvatar>
            {localStorageAccount?.charAt(0)}
          </Styled.ProfileAvatar>
        }
        title={`${counterpart.translate(
          `field.labels.hello`
        )} ${localStorageAccount}!`}
        description={`@${localStorageAccount}`}
      />
      <ul>
        {sm ? (
          <>
            <li>
              <MenuItem
                href="/voting"
                icon={<Vote className={"menu-icon"} />}
                label={counterpart.translate(`pages.voting.heading`)}
                onClick={closeMenu}
              />
            </li>
            {/* <li>
              <MenuItem
                href="/contacts"
                icon={<Contacts className={"menu-icon"} />}
                label="Contacts"
                onClick={closeMenu}
              />
            </li> */}
          </>
        ) : (
          <li className={"link"}>
            <Link href={`/user/${localStorageAccount}`} onClick={closeMenu}>
              {counterpart.translate(`links.see_all_account_activity`)}
            </Link>
          </li>
        )}

        <li>
          <MenuItem
            href="/settings"
            icon={<SettingOutlined className={"menu-icon"} />}
            label={counterpart.translate(`pages.settings.heading`)}
            onClick={closeMenu}
          />
        </li>
        {sm ? (
          <li className={"link"}>
            <Link href={`/user/${localStorageAccount}`} onClick={closeMenu}>
              <a>{counterpart.translate(`links.see_all_account_activity`)}</a>
            </Link>
          </li>
        ) : (
          " "
        )}
        <li className={"logout"}>
          <MenuItem
            href="/logout"
            icon={<PoweroffOutlined className={"menu-icon"} />}
            label={counterpart.translate(`pages.logout.heading`)}
            onClick={closeMenu}
          />
        </li>
      </ul>
    </Styled.ProfileMenu>
  );
};
