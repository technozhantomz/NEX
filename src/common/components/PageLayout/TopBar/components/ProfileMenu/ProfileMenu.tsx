import Link from "next/link";

import {
  Card,
  PoweroffOutlined,
  SettingOutlined,
} from "../../../../../../ui/src";
import { breakpoints } from "../../../../../../ui/src/breakpoints";
import { Contacts, Vote } from "../../../../../../ui/src/icons";
import { useUserContext, useViewportContext } from "../../../../../providers";
import { MenuItem } from "../MenuItem";

import * as Styled from "./ProfileMenu.styled";

const { Meta } = Card;

export const ProfileMenu = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const { width } = useViewportContext();

  return (
    <Styled.ProfileMenu bordered={false}>
      <Meta
        avatar={
          <Styled.ProfileAvitar>
            {localStorageAccount?.charAt(0)}
          </Styled.ProfileAvitar>
        }
        title={`Hello ${localStorageAccount}!`}
        description={`@${localStorageAccount}`}
      />
      <ul>
        {width < breakpoints.xs ? (
          <>
            <li>
              <MenuItem
                href="/voting"
                icon={<Vote className={"menu-icon"} />}
                label="Voting"
              />
            </li>
            <li>
              <MenuItem
                href="/contacts"
                icon={<Contacts className={"menu-icon"} />}
                label="Contacts"
              />
            </li>
          </>
        ) : (
          <li className={"link"}>
            <Link href={`/user/${localStorageAccount}`}>
              <a>See all account activity</a>
            </Link>
          </li>
        )}

        <li>
          <MenuItem
            href="/settings"
            icon={<SettingOutlined className={"menu-icon"} />}
            label="Settings"
          />
        </li>
        {width < breakpoints.xs ? (
          <li className={"link"}>
            <Link href={`/user/${localStorageAccount}`}>
              <a>See all account activity</a>
            </Link>
          </li>
        ) : (
          " "
        )}
        <li className={"logout"}>
          <MenuItem
            href="/logout"
            icon={<PoweroffOutlined className={"menu-icon"} />}
            label="Logout"
          />
        </li>
      </ul>
    </Styled.ProfileMenu>
  );
};
