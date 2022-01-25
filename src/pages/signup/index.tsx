import {
  CheckOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import type { NextPage } from "next";
import Link from "next/link";

import { CopyIcon } from "../../components/icons";
import Layout from "../../components/layout";

interface SignupFormData {
  username: string;
  password: string;
}

const SignUp: NextPage = () => {
  const onLogin = (formData: SignupFormData) => {
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
    <Layout title="SignUp" type="card" heading="Create your account">
      <Card>
        <Form name="signUpForm" onFinish={onLogin}>
          <Form.Item name="username" rules={formValdation.username}>
            <Input placeholder="Enter username" suffix={<CheckOutlined />} />
          </Form.Item>
          <p>Your auto-generated password</p>
          <Form.Item name="password" rules={formValdation.password}>
            <Input.Password
              placeholder="Enter password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              suffix={<CopyIcon />}
            />
          </Form.Item>
          <Form.Item
            name="password-confermation"
            rules={formValdation.password}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <div>
            <InfoCircleOutlined />
            <p>
              <span>Keep your password safe to avoid losing any funds.</span>
              <Link href={"/"}>Download Recovery password file here</Link>
            </p>
          </div>
          <Form.Item name="confirm" valuePropName="checked">
            <Checkbox>
              I understand Peerplays cannot recover my lost password
            </Checkbox>
          </Form.Item>
          <Form.Item name="saved" valuePropName="checked">
            <Checkbox>I have securely saved my password</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create account
            </Button>
          </Form.Item>
        </Form>
        <p className="disclamer">
          <span>Already have a Peerplays account? </span>
          <Link href="/signup">
            <a>Log in</a>
          </Link>
        </p>
      </Card>
    </Layout>
  );
};

export default SignUp;
