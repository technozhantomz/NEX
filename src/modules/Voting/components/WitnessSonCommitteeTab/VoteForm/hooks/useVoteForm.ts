import { Form } from "../../../../../../ui/src";

import { UseVoteFormResult } from "./useVoteForm.types";

export function useVoteForm(): UseVoteFormResult {
  const [voteForm] = Form.useForm();

  return {
    voteForm,
  };
}
