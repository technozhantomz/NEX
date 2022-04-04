import { FeesColumns } from "./FeesColumns";
import * as Styled from "./FeesTab.styled";
import { useFeesTab } from "./hooks";

export const FeesTab = (): JSX.Element => {
  const {
    loading,
    generalFeesRows,
    assetFeesRows,
    accountFeesRows,
    businessFeesRows,
    gameFeesRows,
    marketFeesRows,
  } = useFeesTab();

  return (
    <Styled.FeesTabWrapper>
      <section>
        <Styled.FeeSpecificHeader>General</Styled.FeeSpecificHeader>
        <Styled.FeesTable
          bordered={false}
          dataSource={generalFeesRows}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
      <section>
        <Styled.FeeSpecificHeader>Asset Specific</Styled.FeeSpecificHeader>
        <Styled.FeesTable
          bordered={false}
          dataSource={assetFeesRows}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
      <section>
        <Styled.FeeSpecificHeader>Account Specific</Styled.FeeSpecificHeader>
        <Styled.FeesTable
          bordered={false}
          dataSource={accountFeesRows}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
      <section>
        <Styled.FeeSpecificHeader>Market Specific</Styled.FeeSpecificHeader>
        <Styled.FeesTable
          bordered={false}
          dataSource={marketFeesRows}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
      <section>
        <Styled.FeeSpecificHeader>
          Bussiness Administration
        </Styled.FeeSpecificHeader>
        <Styled.FeesTable
          bordered={false}
          dataSource={businessFeesRows}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
      <section>
        <Styled.FeeSpecificHeader>Game Specific</Styled.FeeSpecificHeader>
        <Styled.FeesTable
          bordered={false}
          dataSource={gameFeesRows}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
    </Styled.FeesTabWrapper>
  );
};
