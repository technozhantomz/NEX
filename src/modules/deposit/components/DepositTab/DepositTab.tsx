import { Button } from "antd";
import React from "react";

import Styles from "../../../../styles/depositComponent.module.scss";

export const DepositTab = (): JSX.Element => {
  return (
    <div className={Styles.depositContainer}>
      <Button className={Styles.logInBtn}>
        Log in & Generate Bitcoin Address
      </Button>
    </div>
  );
};
