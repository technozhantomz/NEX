import { useRouter } from "next/router";

import { AssetPage } from "./useAssetPage.types";

export function useAssetPage(): AssetPage {
  const router = useRouter();
  const handleAssetChange = (value: unknown) => {
    router.push(`/wallet/${value}?tab=deposit`);
  };
  return { handleAssetChange };
}
