import { useCallback, useEffect, useState } from "react";

import { useAccount } from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";

import { NFTRow, UseNFTsTableresult } from "./useNFTsTable.types";

export function useNFTsTable(): UseNFTsTableresult {
  const [loading, setLoading] = useState<boolean>(true);
  const [nftRows, setNFTRows] = useState<NFTRow[]>([]);
  const { dbApi } = usePeerplaysApiContext();
  const { id, localStorageAccount } = useUserContext();
  const { getUserNameById } = useAccount();

  const getNFTs = useCallback(async () => {
    setLoading(true);
    if (id) {
      const rawNFTs = await dbApi("nft_get_tokens_by_owner", [id]);
      if (rawNFTs.length > 0) {
        const testNFTS = await Promise.all(
          rawNFTs.map(async (nft) => {
            const nftMeta = JSON.parse(nft.token_uri);
            console.log(nftMeta);
            const nftObj = await dbApi("get_objects", [[nft.nft_metadata_id]]);
            console.log(nftObj);
            const nftQuantity = await dbApi("nft_get_total_supply", [
              nft.nft_metadata_id,
            ]);
            console.log(nftQuantity);
            //const nftMaker = await getUserNameById(nftObj.owner);
            //console.log(nftMaker);
            const nftOffers = await dbApi("get_offers_by_item", [
              "1.29.0",
              nft.id,
              10,
            ]);
            console.log(nftOffers);
            let nftOnSale = false;
            if (nftOffers.length > 0) {
              const sellOffers = nftOffers.filter(
                (offer) => offer.buying_item === false
              );
              nftOnSale = sellOffers.length > 0 ? true : false;
            }
            return {
              key: nft.id,
              img: nftMeta.image,
              name: nftMeta.name,
              maker: "nftMaker",
              collection: nftObj.name,
              quantity: nftQuantity,
              onSale: nftOnSale,
            };
          })
        );
        console.log(testNFTS);
        setNFTRows(
          rawNFTs.map(async (nft) => {
            const nftMeta = JSON.parse(nft.token_uri);
            const nftObj = await dbApi("get_objects", [[nft.nft_metadata_id]]);
            const nftQuantity = await dbApi("nft_get_total_supply", [
              nft.nft_metadata_id,
            ]);
            const nftMaker = getUserNameById(nftObj.owner);
            return {
              key: nft.id,
              img: nftMeta.image,
              name: nftMeta.name,
              maker: nftMaker,
              collection: nftObj.name,
              quantity: nftQuantity,
            };
          })
        );
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    getNFTs();
  }, [id, localStorageAccount]);

  return { loading, nftRows };
}
