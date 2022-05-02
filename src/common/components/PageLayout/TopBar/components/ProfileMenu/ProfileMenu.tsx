import Link from "next/link";

import {
  Card,
  PoweroffOutlined,
  SettingOutlined,
} from "../../../../../../ui/src";
import { Contacts, Vote } from "../../../../../../ui/src/icons";
import { useUserContext, useViewportContext } from "../../../../../providers";
import { MenuItem } from "../MenuItem";

import * as Styled from "./ProfileMenu.styled";

const { Meta } = Card;

export const ProfileMenu = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const { xs } = useViewportContext();

  return (
    <Styled.ProfileMenu bordered={false}>
      <Meta
        avatar={
          <Styled.ProfileAvitar>
            {localStorageAccount?.charAt(0).toUpperCase()}
          </Styled.ProfileAvitar>
        }
        title={`Hello ${localStorageAccount}!`}
        description={`@${localStorageAccount}`}
      />
      <ul>
        {xs ? (
          <>
            <li>
              <MenuItem
                Href="/voting"
                Icon={<Vote className={"menu-icon"} />}
                Label="Voting"
              />
            </li>
            <li>
              <MenuItem
                Href="/contacts"
                Icon={<Contacts className={"menu-icon"} />}
                Label="Contacts"
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
            Href="/settings"
            Icon={<SettingOutlined className={"menu-icon"} />}
            Label="Settings"
          />
        </li>
        {xs ? (
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
            Href="/logout"
            Icon={<PoweroffOutlined className={"menu-icon"} />}
            Label="Logout"
          />
        </li>
      </ul>
    </Styled.ProfileMenu>
  );
};
