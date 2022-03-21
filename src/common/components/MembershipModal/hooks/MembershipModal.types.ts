import { FormInstance } from "antd/lib/form";

export type IUseMembershipForm = {
  membershipModalForm: FormInstance<IMembershipForm>;
};

export type IMembershipForm = {
  password: string;
};
