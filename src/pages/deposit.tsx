import Deposit from "../components/Deposit";
import Market from "../components/Market";
import Swap from "../components/Swap";
import Withdraw from "../components/Withdraw";

const Dep = (): JSX.Element => {
  return (
    <>
      <Deposit />
      <Withdraw />
      <Market />
      <Swap />
    </>
  );
};

export default Dep;
