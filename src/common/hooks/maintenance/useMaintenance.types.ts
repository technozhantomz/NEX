export type UseMaintenanceResult = {
  getMaintenance: () => Promise<void>;
  maintenanceInterval: number;
  nextMaintenanceTime: string;
  loading: boolean;
};
