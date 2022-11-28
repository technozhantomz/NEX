import { Form } from "../../../../../../ui/src";

import { UseVoteFormResult, VoteForm } from "./useVoteForm.types";

export function useVoteForm(): UseVoteFormResult {
  const [voteForm] = Form.useForm<VoteForm>();

  return {
    voteForm,
  };
}
