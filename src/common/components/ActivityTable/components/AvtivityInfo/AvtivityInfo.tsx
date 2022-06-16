import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  infoString: string;
};

export const AvtivityInfo = ({ infoString }: Props): JSX.Element => {
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
      <Link key={key} href={`/user/${userName}`}>
        {userName}
      </Link>
    );
  };

  return (
    <>
      {stringParts.map((stringPart, index) => {
        if (stringPart.includes("userlink")) {
          return getUserLink(stringPart, index);
        } else {
          return <span key={index}>{stringPart}</span>;
        }
      })}
    </>
  );
};
