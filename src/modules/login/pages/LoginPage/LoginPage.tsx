import { Card } from "antd";
import React from "react";

import Layout from "../../../../common/components/PageLayout/layout";

// import * as Styled from "./SignUpPage.styled";

const LoginPage: React.FC = () => {
  return (
    <Layout title="Login" type="card" heading="Log into your account">
      <Card></Card>
    </Layout>
  );
};
export default LoginPage;
