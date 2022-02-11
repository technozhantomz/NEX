import { Button, styled } from "../../../../ui/src/index";

export const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  flex-direction: row;
`;

export const HeaderContainerItem = styled.div`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: white;
  text-align: center;
  width: 600px;
  display: flex;
  justify-content: space-around;
  padding: 5px 5px 5px 5px;
  height: 45px;
  margin: 10px;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Btn = styled(Button)`
  height: 32px;
  background: #e3ebf8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
`;
