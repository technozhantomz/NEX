import {
  CardFormButton as button,
  Paragraph as Para,
  Space as space,
  styled,
  Text as text,
} from "../../../../ui/src";

export const MembershipCard = styled.div`
  color: var(---text-icons);
  text-align: left;
  font: normal normal medium 14px/17px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  margin-left: 30px;
  height: 856px;
  @media (max-width: 500px) {
    height: 950px;
    margin-left: 10px;
  }
`;

export const TextHeader = styled(text)`
  color: var(---text-icons);
  text-align: left;
  font: normal normal medium 14px/17px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
`;

export const Paragraph = styled(Para)`
  color: var(---text-icons);
  text-align: left;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  width: 75%;
  @media (max-width: 500px) {
    width: 95%;
  }
`;

export const Space = styled(space)``;

export const PercentageText = styled(text)`
  margin-left: 50px;
`;

export const ListDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
  color: var(---text-icons);
  text-align: left;
  font: normal normal normal 14px/20px Inter;
  letter-spacing: 0px;
  color: #212121;
`;

export const HeaderDiv = styled.div`
  width: 15%;
  @media (max-width: 500px) {
    width: 53%;
  }
`;

export const PercentageDiv = styled.div`
  width: 20%;
  text-align: right;
  @media (max-width: 500px) {
    width: 40%;
    text-align: right;
  }
`;

export const BtnDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const Button = styled(button)``;
