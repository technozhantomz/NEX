//done
import { useCallback, useEffect, useState } from "react";

import { useFormDate } from "..";
import { usePeerplaysApiContext } from "../../providers";
import { BlockData, GlobalProperties } from "../../types";

import { UseMaintenanceResult } from "./useMaintenance.types";

export function useMaintenance(): UseMaintenanceResult {
  const [maintenanceInterval, setMaintenanceInterval] = useState<number>(0);
  const [nextMaintenanceTime, setNextMaintenanceTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { dbApi } = usePeerplaysApiContext();
  const { formLocalDate } = useFormDate();

  const getMaintenance = useCallback(async () => {
    try {
      const blocksData: BlockData[] = await dbApi("get_objects", [["2.1.0"]]);
      if (blocksData && blocksData.length > 0) {
        const lastBlockData = blocksData[0];
        const gpo: GlobalProperties = await dbApi("get_global_properties");
        return {
          maintenanceInterval: gpo.parameters.maintenance_interval,
          nextMaintenanceTime: formLocalDate(
            lastBlockData.next_maintenance_time,
            ["month", "date", "year", "time"]
          ),
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [dbApi, formLocalDate]);

  useEffect(() => {
    let ignore = false;
    async function setMaintenanceProperties() {
      setLoading(true);
      const maintenanceProperties = await getMaintenance();
      if (!ignore) {
        if (maintenanceProperties) {
          setMaintenanceInterval(maintenanceProperties.maintenanceInterval);
          setNextMaintenanceTime(maintenanceProperties.nextMaintenanceTime);
        }
        setLoading(false);
      }
    }
    setMaintenanceProperties();

    return () => {
      ignore = true;
    };
  }, [getMaintenance]);

  return {
    getMaintenance,
    maintenanceInterval,
    nextMaintenanceTime,
    loading,
  };
}
