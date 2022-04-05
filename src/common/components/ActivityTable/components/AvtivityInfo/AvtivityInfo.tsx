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

  const getUserLink = (userLink: string) => {
    const userName = userLink.substring(
      userLink.indexOf("=") + 1,
      userLink.lastIndexOf("]")
    );
    return <Link href={`/user/${userName}`}>{userName}</Link>;
  };

  return (
    <>
      {stringParts.map((s) => {
        if (s.includes("userlink")) {
          return getUserLink(s);
        } else {
          return <span>{s}</span>;
        }
      })}
    </>
  );
};
