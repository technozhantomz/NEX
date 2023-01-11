import { useBalances } from "./hooks";

export function Balances(): JSX.Element {
  const { calculateBalances } = useBalances();

  console.log(calculateBalances());
  return (
    <>
      <p>BTC</p>
      <p>PPY</p>
    </>
  );
}
