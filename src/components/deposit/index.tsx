import { Button } from "antd";

import Styles from "../../styles/depositComponent.module.scss";

const Deposit = (): JSX.Element => {
  return (
    <div className={Styles.depositContainer}>
      <Button className={Styles.logInBtn}>
        Log in & Generate Bitcoin Address
      </Button>
    </div>
  );
};

export default Deposit;
