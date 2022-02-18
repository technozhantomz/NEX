import { Asset } from "../../types";

export type User = {
  name: string;
  id: string;
  assets: Asset[];
};
