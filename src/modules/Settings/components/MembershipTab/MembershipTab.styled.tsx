import {
  CardFormButton,
  styled,
  Form as UiForm,
  Paragraph as UiParagraph,
  Space as UiSpace,
  Text as UiText,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const MembershipCard = styled.div`
  .ant-form-horizontal {
    text-align: left;
    letter-spacing: 0px;
    color: ${colors.textColor};
    min-height: 856px;
    margin: 20px;
    ${breakpoint.xs} {
      margin-left: 30px;
      position: relative;
      min-height: 950px;
    }
  }
  a {
    font: normal normal normal 12px/20px Inter;
    letter-spacing: 0px;
    ${breakpoint.xs} {
      font: normal normal normal 14px/20px Inter;
    }
  }
`;

export const MembershipForm = styled(UiForm)`
  margin-top: 24px;
`;

export const Heading = styled(UiText)`
  text-align: left;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  font: normal normal medium 12px/17px Inter;
  ${breakpoint.xs} {
    font: normal normal medium 14px/17px Inter;
  }
`;

export const Label = styled(UiText)`
   {
    font: normal normal normal 12px/17px Inter;
    letter-spacing: 0px;
    color: ${colors.textColor};
    opacity: 1;
    ${breakpoint.xs} {
      font: normal normal normal 14px/17px Inter;
    }
  }
`;

export const Paragraph = styled(UiParagraph)`
  text-align: left;
  width: 100%;
  font: normal normal normal 12px/17px Inter;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  ${breakpoint.xs} {
    width: 70%;
    font: normal normal normal 14px/17px Inter;
  }
`;

export const Space = styled(UiSpace)``;

export const ButtonContainer = styled.div`
  margin: 20px auto;
  width: 255px;
  ${breakpoint.xs} {
    width: 295px;
  }
`;

export const Button = styled(CardFormButton)`
  width: 100%;
  heigth: 35px;
  ${breakpoint.xs} {
    heigth: 45px;
  }
`;

export const PercentageText = styled(UiText)`
  margin-left: 50px;
`;

export const FeeCategoryContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const LabelContainer = styled.div`
  width: 53%;
  ${breakpoint.xs} {
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
  ${breakpoint.xs} {
    width: 20%;
    font: normal normal normal 14px/17px Inter;
  }
`;
