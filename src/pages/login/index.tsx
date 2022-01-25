import { Button, Card, Form, Input } from "antd";
import type { NextPage } from "next";
import Link from "next/link";

import Layout from "../../components/layout";

interface LoginFormData {
  username: string;
  password: string;
}

const Login: NextPage = () => {
  const onLogin = (formData: LoginFormData) => {
    console.log(formData);
  };

  const formValdation = {
    username: [{ required: true, message: "Username is required" }],
    password: [
      { required: true, message: "Password is required" },
      {
        min: 12,
        message: "Password should be at least 12 characters long",
      },
    ],
  };

  return (
    <Layout title="Login" type="card" heading="Log into your account">
      <Card>
        <Form name="loginForm" onFinish={onLogin}>
          <Form.Item name="username" rules={formValdation.username}>
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item name="password" rules={formValdation.password}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
        <p className="disclamer">
          <span>Don't have a Peerplays account? </span>
          <Link href="/signup">
            <a>Create account</a>
          </Link>
        </p>
      </Card>
    </Layout>
  );
};

export default Login;
