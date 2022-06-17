// import { useUser } from "../../context";
import { MenuCard, Switch, List } from "../../../../../../ui/src";

import * as Styled from "./NotificationMenu.styled";

export const NotificationMenu = (): JSX.Element => {
  //const { accountData } = useUser();

  return (
    <MenuCard
      onClick={(e) => {
        e.stopPropagation();
      }}
      bordered={false}
    >
      <div>
        <Switch
          size="small"
          // onChange={() => setShowUnreadOnly(!showUnreadOnly)}
          // defaultChecked={showUnreadOnly}
        />
        <span> Show only unread</span>
      </div>
    </MenuCard>
  );
};
