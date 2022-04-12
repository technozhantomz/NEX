import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { Layout } from "../../../../common/components";
import { LoginForm } from "../../components";

import * as Styled from "./LoginPage.styled";

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login" type="card" heading="Log into your account">
      <Styled.LoginFormCard>
        <LoginForm />
        <Styled.FormDisclamer>
          <span>Don't have a Peerplays account? </span>
          <Link href="/signup">
            <a>Create account</a>
          </Link>
        </Styled.FormDisclamer>
      </Styled.LoginFormCard>
    </Layout>
  );
};
export default LoginPage;
