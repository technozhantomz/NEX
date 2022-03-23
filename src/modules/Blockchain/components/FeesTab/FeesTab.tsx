import { useViewportContext } from "../../../../common/components/ViewportProvider";
import { List, Tag } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";

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
  const { width } = useViewportContext();

  return (
    <Styled.FeesTabWrapper>
      <section>
        <h3>General</h3>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={genFeesTableData}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={genFeesTableData}
            loading={loading}
            renderItem={(item) => (
              <Styled.FeeListItem key={item.operation}>
                <Styled.FeeItemContent>
                  {item.operation === "" ? (
                    ""
                  ) : (
                    <div className="fee-info">
                      <span className="fee-info-title">
                        {FeesColumns[0].title}
                      </span>
                      <span className="fee-info-value">
                        <Tag key={item.operation}>{item.operation}</Tag>
                      </span>
                    </div>
                  )}
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[1].title}
                    </span>
                    <span className="fee-info-value">{item.type}</span>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <span className="fee-info-value">{item.fee}</span>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
      <section>
        <h3>Asset Specific</h3>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={assetFeesTableData}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={assetFeesTableData}
            loading={loading}
            renderItem={(item) => (
              <Styled.FeeListItem key={item.operation}>
                <Styled.FeeItemContent>
                  {item.operation === "" ? (
                    ""
                  ) : (
                    <div className="fee-info">
                      <span className="fee-info-title">
                        {FeesColumns[0].title}
                      </span>
                      <span className="fee-info-value">
                        <Tag key={item.operation}>{item.operation}</Tag>
                      </span>
                    </div>
                  )}
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[1].title}
                    </span>
                    <span className="fee-info-value">{item.type}</span>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <span className="fee-info-value">{item.fee}</span>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
      <section>
        <h3>Account Specific</h3>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={accountFeesTableData}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={accountFeesTableData}
            loading={loading}
            renderItem={(item) => (
              <Styled.FeeListItem key={item.operation}>
                <Styled.FeeItemContent>
                  {item.operation === "" ? (
                    ""
                  ) : (
                    <div className="fee-info">
                      <span className="fee-info-title">
                        {FeesColumns[0].title}
                      </span>
                      <span className="fee-info-value">
                        <Tag key={item.operation}>{item.operation}</Tag>
                      </span>
                    </div>
                  )}
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[1].title}
                    </span>
                    <span className="fee-info-value">{item.type}</span>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <span className="fee-info-value">{item.fee}</span>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
      <section>
        <h3>Bussiness Administration</h3>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={bizFeesTableData}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={bizFeesTableData}
            loading={loading}
            renderItem={(item) => (
              <Styled.FeeListItem key={item.operation}>
                <Styled.FeeItemContent>
                  {item.operation === "" ? (
                    ""
                  ) : (
                    <div className="fee-info">
                      <span className="fee-info-title">
                        {FeesColumns[0].title}
                      </span>
                      <span className="fee-info-value">
                        <Tag key={item.operation}>{item.operation}</Tag>
                      </span>
                    </div>
                  )}
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[1].title}
                    </span>
                    <span className="fee-info-value">{item.type}</span>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <span className="fee-info-value">{item.fee}</span>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
      <section>
        <h3>Game Specific</h3>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={gameFeesTableData}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={gameFeesTableData}
            loading={loading}
            renderItem={(item) => (
              <Styled.FeeListItem key={item.operation}>
                <Styled.FeeItemContent>
                  {item.operation === "" ? (
                    ""
                  ) : (
                    <div className="fee-info">
                      <span className="fee-info-title">
                        {FeesColumns[0].title}
                      </span>
                      <span className="fee-info-value">
                        <Tag key={item.operation}>{item.operation}</Tag>
                      </span>
                    </div>
                  )}
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[1].title}
                    </span>
                    <span className="fee-info-value">{item.type}</span>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <span className="fee-info-value">{item.fee}</span>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
    </Styled.FeesTabWrapper>
  );
};
