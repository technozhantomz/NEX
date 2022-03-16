import {
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
`;

export const PercentageDiv = styled.div`
  width: 10%;
  text-align: right;
`;

export const BtnDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;
