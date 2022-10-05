import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  infoString: string;
};

export const HIVEAndHBDDepositInfo = ({ infoString }: Props): JSX.Element => {
  const [stringParts, setStringParts] = useState<string[]>([]);

  useEffect(() => {
    setStringParts(infoString.split(","));
  }, [infoString]);

  const getUserLink = (userLink: string, key: number) => {
    const trimedUserLink = userLink.replace(/\s/g, "");
    const userName = trimedUserLink.substring(
      trimedUserLink.indexOf("=") + 1,
      trimedUserLink.lastIndexOf("]")
    );
    return (
      <i>
        <Link key={key} href={`/user/${userName}`}>
          {userName}
        </Link>
      </i>
    );
  };

  const getSonAccountLink = (key: number) => {
    return (
      <Link key={key} href={`https://hiveblockexplorer.com/@son-account`}>
        {"son-account"}
      </Link>
    );
  };

  return (
    <>
      {stringParts.map((stringPart, index) => {
        if (stringPart.includes("userlink")) {
          return getUserLink(stringPart, index);
        } else if (stringPart.includes("son-account")) {
          return getSonAccountLink(index);
        } else {
          return <span key={index}>{stringPart}</span>;
        }
      })}
    </>
  );
};
