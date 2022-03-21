import { Button, Form, Input, Modal } from "antd";
import React from "react";

import * as Styled from "./MembershipModal.styled";
import { useMembershipForm } from "./hooks";

type Props = {
  visible: boolean;
  onCancel: () => void;
  handleOk: () => void;
  modalText: string;
  confirmLoading: boolean;
  isEnableToPay: boolean;
};

export const MembershipModal = ({
  visible,
  onCancel,
  handleOk,
  modalText,
  confirmLoading,
  isEnableToPay,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.MembershipModal
        title="Membership"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        centered={true}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Continue
          </Button>,
        ]}
      >
        <p>{modalText}</p>
      </Styled.MembershipModal>
    </>
  );
};
