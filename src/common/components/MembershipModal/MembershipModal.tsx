import { Button, Form, Input, Modal } from "antd";
import React from "react";

import * as Styled from "./MembershipModal.styled";
import { useMembershipForm } from "./hooks";

type Props = {
  visible: boolean;
  onCancel: () => void;
  handleOk: () => void;
  modalText: string;
  hideFooter: boolean;
};

export const MembershipModal = ({
  visible,
  onCancel,
  handleOk,
  modalText,
  hideFooter,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.MembershipModal
        title="Membership"
        visible={visible}
        onOk={handleOk}
        onCancel={onCancel}
        centered={true}
        footer={
          hideFooter
            ? null
            : [
                <Button key="back" onClick={onCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                  Continue
                </Button>,
              ]
        }
      >
        <p>{modalText}</p>
      </Styled.MembershipModal>
    </>
  );
};
