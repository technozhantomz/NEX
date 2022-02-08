import {
  EyeInvisibleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import React from "react";

import FormDisclamer from "../../../../common/components/FormDisclamer";
import Layout from "../../../../common/components/PageLayout/layout";
import SignUpForm from "../../components/SignUpForm";

// import * as Styled from "./SignUpPage.styled";

const SignUpPage: React.FC = () => {
  return (
    <Layout title="SignUp" type="card" heading="Create your account">
      <Card>
        <SignUpForm />
        <FormDisclamer>
          <span>Already have a Peerplays account? </span>
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </FormDisclamer>
      </Card>
    </Layout>
  );
};
export default SignUpPage;
