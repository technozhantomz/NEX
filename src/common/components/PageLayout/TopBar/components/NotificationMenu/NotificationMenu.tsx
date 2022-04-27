// import { useUser } from "../../context";
import { MenuCard } from "../../../../../../ui/src";

export const NotificationMenu = (): JSX.Element => {
  //const { accountData } = useUser();

  return (
    <MenuCard bordered={false}>
      <a className="close" >
        X
      </a>
      <div>FPO</div>
    </MenuCard>
  );
};
