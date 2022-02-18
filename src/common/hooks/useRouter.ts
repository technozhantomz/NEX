import { NextRouter, useRouter as useNextRouter } from "next/router";

export function useRouter(): NextRouter {
  return useNextRouter();
}
