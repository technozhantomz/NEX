import { CardFormButton, styled, Form as UiForm } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const MembershipCard = styled.div`
  .ant-form-horizontal {
    text-align: left;
    letter-spacing: 0px;
    color: ${colors.textColor};
    margin: 20px;
    ${breakpoint.sm} {
      margin-left: 30px;
      position: relative;
    }
  }
  a {
    font: normal normal normal 12px/20px Inter;
    letter-spacing: 0px;
    ${breakpoint.sm} {
      font: normal normal normal 14px/20px Inter;
    }
  }
`;

export const MembershipForm = styled(UiForm)`
  margin-top: 24px;
`;

export const Heading = styled.h4`
  text-align: left;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  font: normal normal medium 12px/17px Inter;
  ${breakpoint.sm} {
    font: normal normal medium 14px/17px Inter;
  }
  margin-bottom: 8px;
`;

export const Label = styled.p`
   {
    font: normal normal normal 12px/17px Inter;
    letter-spacing: 0px;
    color: ${colors.textColor};
    opacity: 1;
    ${breakpoint.sm} {
      font: normal normal normal 14px/17px Inter;
    }
  }
`;

export const Paragraph = styled.p`
  text-align: left;
  width: 100%;
  font: normal normal normal 12px/17px Inter;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  ${breakpoint.sm} {
    font: normal normal normal 14px/17px Inter;
  }
`;

export const InfoContainer = styled.div`
  ${breakpoint.sm} {
    width: 70%;
  }
`;

export const ButtonContainer = styled.div`
  margin: 20px auto;
  width: 255px;
  ${breakpoint.sm} {
    width: 295px;
  }
`;

export const Button = styled(CardFormButton)`
  width: 100%;
  heigth: 35px;
  ${breakpoint.sm} {
    heigth: 45px;
  }
`;

export const PercentageText = styled.p`
  margin-left: 50px;
`;

export const FeeCategoryContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const LabelContainer = styled.div`
  width: 53%;
  ${breakpoint.sm} {
    width: 15%;
  }
`;

export const PercentageContainer = styled.div`
  text-align: left;
  font: normal normal normal 12px/17px Inter;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  width: 50%;
  ${breakpoint.sm} {
    width: 20%;
    font: normal normal normal 14px/17px Inter;
  }
`;
