import { Card } from "antd";
import Link from "next/link";
import React from "react";

import FormDisclamer from "../../../../common/components/FormDisclamer";
import Layout from "../../../../common/components/PageLayout/layout";
import LoginForm from "../../components/LoginForm";

//import * as Styled from "./LoginPage.styled";

const LoginPage: React.FC = () => {
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
