import counterpart from "counterpart";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";

import { FormDisclamer, Layout } from "../../../common/components";
import { useAccount } from "../../../common/hooks";

import * as Styled from "./LogoutPage.styled";

const LogoutPage: NextPage = () => {
  const { removeAccount } = useAccount();

  useEffect(() => {
    removeAccount();
  }, []);

  return (
    <Layout
      title="Logout"
      type="card"
      heading={counterpart.translate(`transaction.pages.logout.heading`)}
    >
      <Styled.LogoutCard>
        <p>{counterpart.translate(`transaction.pages.logout.title`)}</p>
        <Link href="/login" passHref={true}>
          <Styled.LogoutButton type="primary">
            {counterpart.translate(`transaction.buttons.login`)}
          </Styled.LogoutButton>
        </Link>
        <FormDisclamer>
          <span>
            {counterpart.translate(`transaction.pages.login.disclaimer`)}
          </span>
          <Link href="/signup">
            <a>{counterpart.translate(`transaction.links.createAccount`)}</a>
          </Link>
        </FormDisclamer>
      </Styled.LogoutCard>
    </Layout>
  );
};

export default LogoutPage;
