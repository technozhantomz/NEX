import { CardFormButton, styled, Form as UiForm } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const MembershipCard = styled.div`
  .ant-form-horizontal {
    text-align: left;
    color: ${colors.textColor};
    margin: 20px;
    ${breakpoint.sm} {
      margin-left: 30px;
      position: relative;
    }
  }
  a {
    font-weight: 400;
    font-size: 14px;
  }
`;

export const MembershipForm = styled(UiForm)`
  margin-top: 24px;
`;

export const Heading = styled.h4`
  text-align: left;
  color: ${colors.textColor};
  margin-bottom: 8px;
  font-weight: 500;
`;

export const Label = styled.p`
   {
    font-weight: 400;
    color: ${colors.textColor};
    margin-bottom: 0px;
  }
`;

export const Paragraph = styled.p`
  text-align: left;
  width: 100%;
  font-weight: 400;
  color: ${colors.textColor};
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
  font-size: 14px;
  margin-left: 34px;
  ${breakpoint.sm} {
    margin-left: 50px;
  }
`;

export const FeeCategoryContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  width: 100%;
`;

export const LabelContainer = styled.div`
  width: 35%;
  ${breakpoint.sm} {
    width: 25%;
  }
`;

export const PercentageContainer = styled.div`
  text-align: left;
  color: ${colors.textColor};
  width: 65%;
  ${breakpoint.sm} {
    width: 40%;
  }
`;

export const RefferalParagraph = styled.p`
  text-align: left;
  width: 100%;
  font-weight: 400;
  color: ${colors.textColor};
  ${breakpoint.md} {
    white-space: nowrap;
  }
`;
