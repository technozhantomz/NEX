import { useUserContext } from "../../..";

import { DataTable } from "./useDataTable.types";

export function useDataTable(): DataTable {
  const { localStorageAccount } = useUserContext();

  return { localStorageAccount };
}
