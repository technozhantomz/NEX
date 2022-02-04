import { CheckOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Login, PrivateKey } from "peerplaysjs-lib";
import { useState } from "react";

import { defaultToken } from "../../api/params/networkparams";
import { useAccount } from "../../common/hooks";
import { IAccountData, IFullAccount } from "../../common/types";
import Layout from "../../components/layout";
import { useUser } from "../../context/index";

const LoginPage: NextPage = () => {
  const [validUser, setValidUser] = useState(false);
  const [fullAcc, setFullAcc] = useState<IFullAccount | undefined>(undefined);
  const { getFullAccount, formAccount } = useAccount();
  const { updateAccountData } = useUser();
  const [loginForm] = Form.useForm();
  const router = useRouter();

  const onLogin = async () => {
    loginForm.validateFields().then(async () => {
      const userData = await formAccount(fullAcc);
      updateAccountData(userData);
      router.push("/dashboard");
    });
  };

  const validateUsername = async (_: unknown, value: string) => {
    const acc = await getFullAccount(value, false);
    if (acc === undefined) return Promise.reject(new Error("User not found"));
    setFullAcc(acc);
    setValidUser(true);
    return Promise.resolve();
  };

  const validatePassword = (_: unknown, value: string) => {
    const accData = fullAcc?.account;
    const roles = ["active", "owner", "memo"];
    let checkPassword = false;
    let fromWif = "";

    try {
      fromWif = PrivateKey.fromWif(value);
    } catch (e) {
      console.error(e);
    }

    const keys = Login.generateKeys(fullAcc?.account.name, value, roles);

    for (const role of roles) {
      const privKey = fromWif ? fromWif : keys.privKeys[role];
      const pubKey = privKey.toPublicKey().toString(defaultToken);
      const key =
        role !== "memo"
          ? accData[role as keyof IAccountData].key_auths[0][0]
          : accData.options.memo_key;

      if (key === pubKey) {
        checkPassword = true;
        break;
      }
    }
    if (!checkPassword) return Promise.reject(new Error("Password incorrect"));
    return Promise.resolve();
  };

  const formValdation = {
    username: [
      { required: true, message: "Username is required" },
      { validator: validateUsername },
    ],
    password: [
      { required: true, message: "Password is required" },
      {
        min: 12,
        message: "Password should be at least 12 characters long",
      },
      { validator: validatePassword },
    ],
  };

  return (
    <Layout title="Login" type="card" heading="Log into your account">
      <Card>
        <Form form={loginForm} name="loginForm" onFinish={onLogin}>
          <Form.Item
            name="username"
            rules={formValdation.username}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="Enter username"
              suffix={validUser ? <CheckOutlined /> : ""}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={formValdation.password}
            validateFirst={true}
            validateTrigger="onSubmit"
          >
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

export default LoginPage;
