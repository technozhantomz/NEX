import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { BlockData, GlobalProperties } from "../../types";

import { UseMaintenanceResult } from "./useMaintenance.types";

export function useMaintenace(): UseMaintenanceResult {
  const [maintenanceInterval, setMaintenanceInterval] = useState<number>(0);
  const [nextMaintenanceTime, setNextMaintenanceTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { dbApi } = usePeerplaysApiContext();

  const getMaintenance = useCallback(async () => {
    try {
      setLoading(true);
      const blocksData: BlockData[] = await dbApi("get_objects", [["2.1.0"]]);
      if (blocksData && blocksData.length > 0) {
        const lastBlockData = blocksData[0];
        const gpo: GlobalProperties = await dbApi("get_global_properties");
        setMaintenanceInterval(gpo.parameters.maintenance_interval);
        setNextMaintenanceTime(lastBlockData.next_maintenance_time);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [dbApi, setLoading, setMaintenanceInterval, setNextMaintenanceTime]);

  useEffect(() => {
    getMaintenance();
  }, [getMaintenance]);

  return {
    getMaintenance,
    maintenanceInterval,
    nextMaintenanceTime,
    loading,
  };
}
