import { FormInstance } from "antd/lib/form";
import FormFinishInfo from "rc-field-form";

import { Membership } from "../../../../../common/types";

export type MembershipTabTypes = {
  handleMembershipUpgrade: (password: string) => void;
  isMembershipModalVisible: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  modalText: string;
  visible: boolean;
  onCancel: () => void;
  onFormFinish: (name: string, info: FormFinishInfo) => void;
  membershipForm: FormInstance<MembershipFormData>;
  confirm: () => void;
  hideFooter: boolean;
  name: string;
  membershipData: Membership | undefined;
};

export type MembershipFormData = {
  password: string;
};
