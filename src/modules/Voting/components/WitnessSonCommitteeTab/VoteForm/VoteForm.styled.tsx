import {
  Button,
  Form,
  styled,
  TableSearch,
  PrintTable as UiPrintTable,
} from "../../../../../ui/src";
import { breakpoint } from "../../../../../ui/src/breakpoints";
import { colors } from "../../../../../ui/src/colors";
import { Reset as UiReset } from "../../../../../ui/src/icons";
import { mixIns } from "../../../../../ui/src/mixins";
import { BlockchainDownloadLinks } from "../../../../Blockchain/common";

export const VoteFormWrapper = styled.div`
  margin-bottom: 25px;
  padding: 0 25px 19px;
  ${mixIns.hairline}
  ${breakpoint.sm} {
    border: none;
    padding: 0 35px;
  }
`;

export const VoteSearch = styled(TableSearch)`
  margin-bottom: 20px;
`;

export const VoteForm = styled(Form)`
  max-width: 100%;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap-reverse;
  ${breakpoint.sm} {
    justify-content: flex-end;
  }
`;

export const Publish = styled(Button)`
  min-width: 85%;
  font-size: 12px;
  ${breakpoint.sm} {
    min-width: 185px;
    font-size: 16px;
  }
`;

export const CardFormLinkButton = styled(Button)`
  font-size: 12px;
  background: none;
  border: none;
  color: ${colors.additionalBlue};
  ${breakpoint.sm} {
    font-size: 16px;
  }
`;

export const CardFormLinkButtonDisabled = styled(Button)`
  font-size: 12px;
  background: none;
  border: none;
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
  pointer-events: none;
  ${breakpoint.sm} {
    font-size: 16px;
  }
`;

export const Reset = styled(UiReset)`
  color: #b9b9b9;
  margin-right: 4px;
`;

export const DownloadLinks = styled(BlockchainDownloadLinks)``;

export const PrintTable = styled(UiPrintTable)``;
