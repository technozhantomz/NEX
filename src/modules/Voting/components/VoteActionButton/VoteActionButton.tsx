import Link from "next/link";

import * as Styled from "./VoteActionButton.styled";

type Props = {
  txt: string;
  href: string;
};

export const VoteActionButton = ({ txt, href }: Props): JSX.Element => {
  return (
    <Styled.VoteActionButton type="text">
      <Link href={href}>{txt}</Link>
    </Styled.VoteActionButton>
  );
};
