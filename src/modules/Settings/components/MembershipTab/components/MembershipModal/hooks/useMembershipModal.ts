import { Form } from "../../../../../../../ui/src";

import { UseMembershipModalResult } from "./useMembershipModal.types";

export function useMembershipForm(): UseMembershipModalResult {
  const [membershipModalForm] = Form.useForm();

  return {
    membershipModalForm,
  };
}
