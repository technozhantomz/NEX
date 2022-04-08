import { FormInstance } from "../../../../../../../ui/src";

export type UseMembershipModalResult = {
  membershipModalForm: FormInstance<MembershipForm>;
};

export type MembershipForm = {
  password: string;
};
