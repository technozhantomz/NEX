import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";

import * as Styled from "./DashboardLoginButton.styled";

type Props = {
  buttonText?: string;
};

export const DashboardLoginButton = ({
  buttonText = "login",
}: Props): JSX.Element => {
  const router = useRouter();
  return (
    <Styled.LoginContainer>
      <Styled.Button
        type="primary"
        htmlType="button"
        onClick={() => {
          router.push("/login");
        }}
      >
        {buttonText}
      </Styled.Button>

      <Styled.FormDisclamer>
        <span>
          {counterpart.translate(`buttons.dont_have_peerplays_account`)}
        </span>
        <Link href="/signup">
          <a>{counterpart.translate(`links.create_account`)}</a>
        </Link>
      </Styled.FormDisclamer>
    </Styled.LoginContainer>
  );
};
