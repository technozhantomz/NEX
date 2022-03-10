import { styled } from "../../../../ui/src";

export const DepositFormContainer = styled.div`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  // color: white;
  font-size: 25px;
  text-align: center;
  width: 600px;
  // height: 268px;
  margin: 10px;
  padding: 10px;
  .ant-input {
    height: 50px;
    width: 95%;
    background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c1c2c4;
    border-radius: 4px;
    opacity: 1;
    text-align: left;
    padding: 10px;

    @media (max-width: 500px) {
      width: 100%;
    }
  }
`;
