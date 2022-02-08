import Link from "next/link";
import React from "react";

import * as Styled from "./Disclamer.styled";

const Disclamer: React.FC = () => {
  return (
    <Styled.Disclamer>
      <span>Already have a Peerplays account?</span>
      <Link href="/login">
        <a>Log in</a>
      </Link>
    </Styled.Disclamer>
  );
};

export default Disclamer;
