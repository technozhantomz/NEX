import { FormInstance } from "antd/lib/form";

export type Transfer = {
  handleTransfer: (
    form: FormInstance<any>,
    password: string,
    type?: string
  ) => Promise<any>;
};

export type SonNetworkStatus = {
  status: unknown[][];
  isSonNetworkOk: boolean;
};
