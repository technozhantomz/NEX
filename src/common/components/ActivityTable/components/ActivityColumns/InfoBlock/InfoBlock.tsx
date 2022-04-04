import Link from "next/link";
import { useEffect } from "react";

type Props = {
  infoString: string;
};

export const InfoBlock = ({ infoString }: Props): JSX.Element => {
  useEffect(() => {
    const userLinks = infoString.match(/\[userlink=(.*?)\]/g);
    console.log(userLinks);
    if (userLinks?.length > 0) {
      const infoCell = userLinks?.forEach((user) => {
        const userName = user.substring(
          user.indexOf("=") + 1,
          user.lastIndexOf("]")
        );
        console.log(userName);
        // return ();
      });
    }
  }, [infoString]);

  return (
    <>
      {/* <Link href={""}></Link> */}
      <span>{infoString}</span>
      {/* <Link href={""}></Link> */}
    </>
  );
};
