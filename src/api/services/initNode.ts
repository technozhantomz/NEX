import { Apis } from "peerplaysjs-lib";

import { getPassedTime } from "../utils";

export type InstanceType = {
  init_promise: Promise<unknown>;
  url: string;
  setRpcConnectionStatusCallback: (
    callback: (status: string) => Promise<void>
  ) => void;
};

export type InitNodeOutput = {
  instance: InstanceType;
  connectTime: number;
};
export const initNode = async (
  url: string,
  actualNode = false
): Promise<boolean | InitNodeOutput> => {
  const start = new Date();

  let instance: InstanceType;

  if (actualNode) {
    if (Apis.instance().chain_id) {
      await Apis.instance().close();
    }
    instance = Apis.instance(url, true);
  } else {
    instance = Apis.instance(url, true, 1000);
  }
  instance.url = url;
  return instance.init_promise
    .then(() => ({
      instance,
      connectTime: getPassedTime(start),
    }))
    .catch((e: unknown) => {
      console.error("--error", e);
      return false;
    });
};
