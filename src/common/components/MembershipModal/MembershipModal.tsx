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
};

export const MembershipModal = ({
  visible,
  onCancel,
  handleOk,
  modalText,
  confirmLoading,
}: Props): JSX.Element => {
  const { validatePassword, useResetFormOnCloseModal, passwordModalForm } =
    useMembershipForm();

  useResetFormOnCloseModal(passwordModalForm, visible);

  return (
    <>
      <Modal
        title="Warning"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
    // <Styled.MembershipModal
    //   title="Warning"
    //   visible={visible}
    //   centered={true}
    //   onOk={() => {
    //     passwordModalForm.submit();
    //   }}
    //   onCancel={onCancel}
    //   footer={null}
    // >
    //   <p>For this operations you'll have to pay 10000 TEST fee. Do you want to continue?</p>

    // </Styled.MembershipModal>
  );
};
