import { useNFTsTable } from "./hooks";

export const NFTsTable = (): JSX.Element => {
  const { loading, nftRows } = useNFTsTable();

  return (
    <>
      {loading ? <>loading</> : <>loaded</>}
      {nftRows.length >= 0 ? <>got rows</> : <>no rows</>}
    </>
  );
};
