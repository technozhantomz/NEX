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
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0px;
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
  margin-bottom: 8px;
  ${breakpoint.sm} {
  }
`;

export const Label = styled.p`
   {
    font-weight: 400;
    letter-spacing: 0px;
    color: ${colors.textColor};
    margin-bottom: 0px;
    opacity: 1;
    ${breakpoint.sm} {
    }
  }
`;

export const Paragraph = styled.p`
  text-align: left;
  width: 100%;
  font-weight: 400;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  ${breakpoint.sm} {
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
  font-size: 14px;
  margin-left: 50px;
`;

export const FeeCategoryContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  width: 75%;
  ${breakpoint.sm} {
    width: 100%;
  }
`;

export const LabelContainer = styled.div`
  width: 53%;
  ${breakpoint.sm} {
    width: 15%;
  }
`;

export const PercentageContainer = styled.div`
  text-align: right;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  width: 50%;
  ${breakpoint.sm} {
    width: 20%;
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
