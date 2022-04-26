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
    margin-left: 10px;
    ${breakpoint.xs} {
      margin-left: 30px;
      position: relative;
      min-height: 950px;
    }
  }
`;

export const MembershipForm = styled(UiForm)`
  margin-top: 24px;
`;

export const Heading = styled(UiText)`
  text-align: left;
  font-weight: 400;
`;

export const Label = styled(UiText)``;

export const Paragraph = styled(UiParagraph)`
  text-align: left;
  width: 95%;
  ${breakpoint.xs} {
    width: 70%;
  }
`;

export const Space = styled(UiSpace)``;

export const ButtonContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${breakpoint.xs} {
    width: 50%;
  }
`;

export const Button = styled(CardFormButton)``;

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
  width: 40%;
  ${breakpoint.xs} {
    width: 20%;
  }
`;
