import { useCallback, useEffect, useState } from 'react';

import { usePeerplaysApiContext } from '../../../../../common/components/PeerplaysApiProvider';
import { useAsset, useBlockchain } from '../../../../../common/hooks';

import { WitnessData, WitnessesTab } from './useWitnessTab.types';

export function useWitnessTab(): WitnessesTab {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [witnesses, setWitnesses] = useState<WitnessData>({ data: [] });
  const { dbApi } = usePeerplaysApiContext();
  const { defaultAsset, formAssetBalanceById, setPrecision } = useAsset();
  const { getChainData, getAvgBlockTime } = useBlockchain();

  useEffect(() => {
    getWitnessData();
  }, [defaultAsset]);

  const getWitnessData = useCallback(async () => {
    if (defaultAsset) {
      const witnessesID = await dbApi('lookup_witness_accounts', [
        '',
        100,
      ]).then((e: any) => e);

      const activeUsers = await dbApi('get_global_properties').then(
        (e: any) => e
      );

      const rawWitnesses = await dbApi('get_witnesses', [
        witnessesID.map((item: any[]) => item[1]),
      ]).then(async (e: any) => {
        let allWitnesses = e.map(
          async (
            item: {
              total_votes: any;
              id: any;
              url: any;
            },
            index: number
          ) => {
            const votesAsset = await formAssetBalanceById(
              defaultAsset.id,
              Number(item.total_votes)
            );
            return {
              key: item.id,
              name: witnessesID.filter(
                (name: any[]) => name[1] === item.id
              )[0][0],
              totalVotes: `${item.total_votes} ${votesAsset.symbol}`,
              url: item.url,
            };
          }
        );

        allWitnesses = await Promise.all(allWitnesses);
        console.log(allWitnesses);
        return allWitnesses.map((item: any) => ({
          ...item,
          active: activeUsers['active_witnesses'].indexOf(item.id) >= 0,
        }));
      });

      setWitnesses({
        data: rawWitnesses,
      });
    }
  }, [witnesses, defaultAsset]);

  const addToVote = async (id: string) => {
   
  };

  const removeFromVote =  async (id:string) => {
   
  };

  const onSearch = async (name: string) => {
    setLoading(true);
    setSearchValue(name);
    setLoading(false);
  };

  return {
    loading,
    witnesses,
    searchValue,
    onSearch,
    addToVote,
    removeFromVote,
  };
}
