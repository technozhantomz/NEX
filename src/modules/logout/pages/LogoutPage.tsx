import { Card } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";

import FormDisclamer from "../../../common/components/FormDisclamer";
import Layout from "../../../common/components/PageLayout/layout";
import { useUser } from "../../../context";

import * as Styled from "./LogoutPage.styled";

const Logout: NextPage = () => {
  const { logoutUser } = useUser();

  useEffect(() => {
    if (logoutUser) logoutUser();
  }, []);

  return (
    <Layout title="Logout" type="card" heading="Logout">
      <Styled.LogoutCard>
        <p>You have successfully logged out</p>
        <Link href="/login">
          <Styled.LogoutButton type="primary">Log in</Styled.LogoutButton>
        </Link>
        <FormDisclamer>
          <span>Don't have an account? </span>
          <Link href="/signup">
            <a>Create account</a>
          </Link>
        </FormDisclamer>
      </Styled.LogoutCard>
    </Layout>
  );
};

export default Logout;
