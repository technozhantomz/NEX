// import { CheckOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form } from "antd";
import React from "react";

import InfoBar from "../InfoBar";

// import * as Styled from "./SignUpForm.styled";

const SignUpForm: React.FC = () => {
  return (
    // <Form form={signUpForm} name="signUpForm" onFinish={onSignup}>
    <Form name="signUpForm">
      {/* <Form.Item
        name="username"
        rules={formValdation.username}
        validateFirst={true}
        validateTrigger="onBlur"
      >
        <Input
          placeholder="Enter username"
          suffix={validUser ? <CheckOutlined /> : ""}
        />
      </Form.Item> */}
      <p>Your auto-generated password</p>
      {/* <Form.Item
            name="password"
            rules={formValdation.password}
            validateFirst={true}
            validateTrigger="onBlur"
          >
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
          <Form.Item
            name="passwordCheck"
            rules={formValdation.passwordCheck}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input.Password
              placeholder="Re-enter your auto-generated password"
              visibilityToggle={false}
            />
          </Form.Item> */}
      <Form.Item>
        <InfoBar />
      </Form.Item>
      <Form.Item name="confirm" valuePropName="confirm">
        <Checkbox>
          I understand Peerplays cannot recover my lost password
        </Checkbox>
      </Form.Item>
      <Form.Item name="saved" valuePropName="saved">
        <Checkbox>I have securely saved my password</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
