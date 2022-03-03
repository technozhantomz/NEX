import { useHistory } from "./hooks/useHistory";

export const HistoryBook = (): JSX.Element => {
  const { orderHistoryRow } = useHistory();
  console.log("this is history", orderHistoryRow);
  return (
    <>
      <div></div>
    </>
  );
};
