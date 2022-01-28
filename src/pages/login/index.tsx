import { CheckOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { Login, PrivateKey } from "peerplaysjs-lib";

import { defaultToken } from "../../api/params/networkparams";
import Layout from "../../components/layout";
import { usePeerplaysApi } from "../../modules/peerplaysApi";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const { dbApi } = usePeerplaysApi();
  const onLogin = async (formData: LoginFormData) => {
    //console.log(formData);
    //TODO: move to doseUserExist
    const fullAcc = await dbApi("get_full_accounts", [
      [formData.username],
      false,
    ])
      .then((arr: any[][]) => arr[0][1])
      .catch(() => false);

    if (!fullAcc) {
      //TODO: add error handling
      console.log("no account");
    }
    console.log(fullAcc);
    const accData = fullAcc.account;
    const roles = ["active", "owner", "memo"];
    let checkPassword = false;
    let fromWif = "";

    try {
      fromWif = PrivateKey.fromWif(formData.password);
    } catch (e) {
      console.error(e);
    }

    const keys = Login.generateKeys(
      formData.username,
      formData.password,
      roles
    );

    for (const role of roles) {
      const privKey = fromWif ? fromWif : keys.privKeys[role];
      const pubKey = privKey.toPublicKey().toString(defaultToken);
      const key =
        role !== "memo"
          ? accData[role].key_auths[0][0]
          : accData.options.memo_key;

      if (key === pubKey) {
        checkPassword = true;
        break;
      }
    }
    if (!checkPassword) {
      console.log("wrong password");
    }

    // const userData = await formAccount(
    //   accData.id,
    //   formData.username,
    //   fullAcc.balances
    // );
    // console.log(userData);
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
            <Input placeholder="Enter username" suffix={<CheckOutlined />} />
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

export default LoginPage;
