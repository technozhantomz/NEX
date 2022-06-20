import counterpart from "counterpart";
import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { Layout } from "../../../../common/components";
import { LoginForm } from "../../components";

import * as Styled from "./LoginPage.styled";

const LoginPage: NextPage = () => {
  return (
    <Layout
      title="Login"
      type="card"
      heading={counterpart.translate(`pages.login.heading`)}
    >
      <Styled.LoginFormCard>
        <LoginForm />
        <Styled.FormDisclamer>
          <span>{counterpart.translate(`pages.login.dont_have_account`)}</span>
          <Link href="/signup">
            <a>{counterpart.translate(`links.create_account`)}</a>
          </Link>
        </Styled.FormDisclamer>
      </Styled.LoginFormCard>
    </Layout>
  );
};
export default LoginPage;
