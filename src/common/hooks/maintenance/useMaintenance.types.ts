export type UseMaintenanceResult = {
  getMaintenance: () => Promise<
    | {
        maintenanceInterval: number;
        nextMaintenanceTime: string;
      }
    | undefined
  >;
  maintenanceInterval: number;
  nextMaintenanceTime: string;
  loading: boolean;
};
