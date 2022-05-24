import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { Layout } from "../../../../common/components";
import { LoginForm } from "../../components";
import counterpart from "counterpart";

import * as Styled from "./LoginPage.styled";

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login" type="card" heading={counterpart.translate(`transaction.pages.login.heading`)}>
      <Styled.LoginFormCard>
        <LoginForm />
        <Styled.FormDisclamer>
          <span>{counterpart.translate(`transaction.pages.login.disclaimer`)}</span>
          <Link href="/signup">
            <a>{counterpart.translate(`transaction.links.dontHaveAccount`)}</a>
          </Link>
        </Styled.FormDisclamer>
      </Styled.LoginFormCard>
    </Layout>
  );
};
export default LoginPage;
