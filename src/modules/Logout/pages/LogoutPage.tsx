import counterpart from "counterpart";
import type { NextPage } from "next";
import Link from "next/link";
import { useLayoutEffect } from "react";

import { FormDisclamer, Layout } from "../../../common/components";
import { useAccount } from "../../../common/hooks";

import * as Styled from "./LogoutPage.styled";

const LogoutPage: NextPage = () => {
  const { removeAccount } = useAccount();

  useLayoutEffect(() => {
    removeAccount();
  }, []);

  return (
    <Layout
      title="Logout"
      type="card"
      heading={counterpart.translate(`pages.logout.heading`)}
    >
      <Styled.LogoutCard>
        <p>{counterpart.translate(`pages.logout.title`)}</p>
        <Link href="/login" passHref={true}>
          <Styled.LogoutButton type="primary">
            {counterpart.translate(`buttons.login`)}
          </Styled.LogoutButton>
        </Link>
        <FormDisclamer>
          <span>{counterpart.translate(`pages.login.dont_have_account`)}</span>
          <Link href="/signup">
            <a>{counterpart.translate(`links.create_account`)}</a>
          </Link>
        </FormDisclamer>
      </Styled.LogoutCard>
    </Layout>
  );
};

export default LogoutPage;
