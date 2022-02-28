import { Button as button, styled } from "../../../ui/src";

export const Div = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 44px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;
export const Button = styled(button)`
  background: var(---primary-blue) 0% 0% no-repeat padding-box;
  background: #0148be 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  width: 70%;
  height: 44px;
  font-size: 16px;
  @media (max-width: 500px) {
    width: 80%;
    font-size: 12px;
  }
`;
