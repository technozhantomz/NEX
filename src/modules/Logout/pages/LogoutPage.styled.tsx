import { Card as AntdCard, CardFormButton, styled } from "../../../ui/src";

export const LogoutCard = styled(AntdCard)`
   {
    padding-top: 10px;
    max-width: 600px;
    text-align: center;
  }
  p {
    margin: 0;
  }
  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-item: center;
  }
`;
export const LogoutButton = styled(CardFormButton)`
  margin: 5% auto;
  span {
    padding: 4px 15px;
  }
`;
