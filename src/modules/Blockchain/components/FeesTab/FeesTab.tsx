import { FeesColumns } from "./FeesColumns";
import * as Styled from "./FeesTab.styled";
import { useFeesTab } from "./hooks";

export const FeesTab = (): JSX.Element => {
  const {
    loading,
    genFeesTableData,
    assetFeesTableData,
    accountFeesTableData,
    bizFeesTableData,
    gameFeesTableData,
  } = useFeesTab();

  return (
    <Styled.FeesTabWrapper>
      <section>
        <h3>General</h3>
        <Styled.FeesTable
          bordered={false}
          dataSource={genFeesTableData}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
      <section>
        <h3>Asset Specific</h3>
        <Styled.FeesTable
          bordered={false}
          dataSource={assetFeesTableData}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
      <section>
        <h3>Account Specific</h3>
        <Styled.FeesTable
          bordered={false}
          dataSource={accountFeesTableData}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
      <section>
        <h3>Bussiness Administration</h3>
        <Styled.FeesTable
          bordered={false}
          dataSource={bizFeesTableData}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
      <section>
        <h3>Game Specific</h3>
        <Styled.FeesTable
          bordered={false}
          dataSource={gameFeesTableData}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
      </section>
    </Styled.FeesTabWrapper>
  );
};
