import { Button, Form, styled, TableSearch } from "../../../../../ui/src";
import { breakpoint } from "../../../../../ui/src/breakpoints";
import { colors } from "../../../../../ui/src/colors";
import { Reset as UiReset } from "../../../../../ui/src/icons";

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 25px;
`;

export const VoteSearch = styled(TableSearch)`
  margin-bottom: 20px;
`;

export const VoteForm = styled(Form)`
  max-width: 705px;
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
