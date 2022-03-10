import { useViewportContext } from "../../../../common/components/ViewportProvider";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { AssetColumns as columns } from "../AssetColums";
import { AssetList } from "../AssetList";

import * as Styled from "./AssetsTable.styled";
import { useAssetsTable } from "./hooks";

type Props = {
  showActions?: boolean;
  fillterAsset?: string;
};

export const AssetsTable = ({
  showActions = true,
  fillterAsset = "",
}: Props): JSX.Element => {
  const { tableAssets, loading } = useAssetsTable();
  const { width } = useViewportContext();
  const assetListProps = { showActions, fillterAsset };

  return (
    <>
      {width > breakpoints.sm ? (
        <Styled.AssetsTable
          columns={
            showActions ? columns : columns.filter((item) => item.title !== "")
          }
          dataSource={
            fillterAsset === ""
              ? tableAssets
              : tableAssets.filter((item) => item.asset === fillterAsset)
          }
          loading={loading}
          pagination={false}
          size="small"
        />
      ) : (
        <AssetList {...assetListProps} />
      )}
    </>
  );
};
