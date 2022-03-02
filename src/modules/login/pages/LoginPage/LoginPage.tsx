import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { FormDisclamer } from "../../../../common/components/FormDisclamer";
import { Layout } from "../../../../common/components/PageLayout";
import { Card } from "../../../../ui/src";
import { LoginForm } from "../../components/LoginForm";

//import * as Styled from "./LoginPage.styled";

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login" type="card" heading="Log into your account">
      <Card>
        <LoginForm />
        <FormDisclamer>
          <span>Don't have a Peerplays account? </span>
          <Link href="/signup">
            <a>Create account</a>
          </Link>
        </FormDisclamer>
      </Card>
    </Layout>
  );
};

export default LoginPage;
