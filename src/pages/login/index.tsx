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

  return (
    <Layout title="Login" type="card" heading="Log into your account">
      <Card>
        <Form name="loginForm" onFinish={onLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
        <p>
          Don't have a Peerplays account?
          <Link href="/signup">
            <a>Create account</a>
          </Link>
        </p>
      </Card>
    </Layout>
  );
};

export default Login;
