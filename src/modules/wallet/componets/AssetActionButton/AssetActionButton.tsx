import Link from "next/link";

import * as Styled from "./AssetActionButton.styled";

type Props = {
  txt: string;
  href: string;
};

const AssetActionButton = ({ txt, href }: Props): JSX.Element => {
  return (
    <Styled.AssetActionButton type="text">
      <Link href={href}>{txt}</Link>
    </Styled.AssetActionButton>
  );
};

export default AssetActionButton;
