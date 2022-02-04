import {
  CheckOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAccount } from "../../common/hooks";
import { ISignupFormData } from "../../common/types";
import { CopyIcon } from "../../components/icons";
import Layout from "../../components/layout";
import { useUser } from "../../context";
import Styles from "../../styles/signup.module.scss";

const SignUp: NextPage = () => {
  const { createAccount } = useAccount();
  const { updateAccountData } = useUser();
  const [signUpForm] = Form.useForm();
  const router = useRouter();

  const onSignup = async (formData: ISignupFormData) => {
    const account = await createAccount(formData);
    updateAccountData(account);
    router.push("/dashboard");
  };

  const createPassword = () => {
    let password = "";
    const characterList =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const characterListLength = characterList.length;
    for (let i = 0; i < 52; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password += characterList.charAt(characterIndex);
    }
    return password;
  };

  const checkMatch = (_: unknown, value: { passwordCheck: string }) => {
    if (value === signUpForm.getFieldValue("password"))
      return Promise.resolve();
    return Promise.reject(new Error("Password do not match"));
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(signUpForm.getFieldValue("password"));
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
    passwordCheck: [
      { required: true, message: "This feild is required" },
      { validator: checkMatch },
    ],
  };

  useEffect(() => {
    signUpForm.setFieldsValue({
      password: createPassword(),
    });
  }, []);

  return (
    <Layout title="SignUp" type="card" heading="Create your account">
      <Card>
        <Form form={signUpForm} name="signUpForm" onFinish={onSignup}>
          <Form.Item name="username" rules={formValdation.username}>
            <Input placeholder="Enter username" suffix={<CheckOutlined />} />
          </Form.Item>
          <p>Your auto-generated password</p>
          <Form.Item name="password" rules={formValdation.password}>
            <Input.Password
              className="CopyPasswordInput"
              iconRender={(visible) =>
                visible ? (
                  <div>
                    <CopyIcon onClick={copyPassword} />
                    <EyeOutlined />
                  </div>
                ) : (
                  <div>
                    <CopyIcon onClick={copyPassword} />
                    <EyeInvisibleOutlined />
                  </div>
                )
              }
            />
          </Form.Item>
          <Form.Item name="passwordCheck" rules={formValdation.passwordCheck}>
            <Input.Password
              placeholder="Re-enter your auto-generated password"
              visibilityToggle={false}
            />
          </Form.Item>
          <Form.Item>
            <div className={Styles.InfoBar}>
              <InfoCircleOutlined className={Styles.InfoBarIcon} />
              <p className={Styles.InfoBarText}>
                <span>Keep your password safe to avoid losing any funds.</span>
                <Link href={"/"}>Download Recovery password file here</Link>
              </p>
            </div>
          </Form.Item>
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
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </p>
      </Card>
    </Layout>
  );
};

export default SignUp;
