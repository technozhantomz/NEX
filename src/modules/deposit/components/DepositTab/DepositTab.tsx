import React, { useState } from "react";

import Styles from "../../../../styles/depositComponent.module.scss";
// import { useSidechainAccounts } from "../../components/DepositTab/hooks/useSidechainAccounts";

const Keys = {
  depositPublicKey: " ",
  withdrawPublicKey: " ",
  withdrawAddress: " ",
};

export const DepositTab = (): JSX.Element => {
  const [keys, setKeys] = useState(Keys);
  const { depositPublicKey, withdrawPublicKey, withdrawAddress } = keys;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeys((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(keys);
    setKeys(Keys);
  };
  return (
    <div className={Styles.depositContainer}>
      {/* <Button className={Styles.logInBtn}>
        Log in & Generate Bitcoin Address
      </Button> */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="depositPublicKey"
          value={depositPublicKey}
          onChange={onChange}
        />

        <input
          type="text"
          name="withdrawPublicKey"
          value={withdrawPublicKey}
          onChange={onChange}
        />

        <input
          type="text"
          name="withdrawAddress"
          value={withdrawAddress}
          onChange={onChange}
        />

        <div>
          <button>Generate</button>
        </div>
      </form>
    </div>
  );
};
