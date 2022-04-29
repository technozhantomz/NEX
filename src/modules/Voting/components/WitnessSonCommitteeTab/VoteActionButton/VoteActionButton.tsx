import { useVoteTable } from "../VoteTable/hooks";
import { IVoteRow } from "../VoteTable/hooks/useVoteTable.types";

import * as Styled from "./VoteActionButton.styled";

type Props = {
  txt: string;
  tableRow: IVoteRow;
};

export const VoteActionButton = ({ txt, tableRow }: Props): JSX.Element => {
  const { tableVotes, tableNotVotes, setTableVotes, setTableNotVotes } =
    useVoteTable();

  function doAction() {
    switch (txt) {
      case "ADD":
        tableNotVotes[
          tableNotVotes.findIndex((x) => x.key == tableRow.key)
        ].action = "add";
        setTableNotVotes(tableNotVotes);
        console.log(tableNotVotes);
        break;
      case "REMOVE":
        tableVotes[tableVotes.findIndex((x) => x.key == tableRow.key)].action =
          "remove";
        setTableVotes(tableVotes);
        console.log(tableVotes);
        break;
      default:
        break;
    }
  }
  return (
    <Styled.VoteActionButton type="text" onClick={() => doAction()}>
      {txt}
    </Styled.VoteActionButton>
  );
};
