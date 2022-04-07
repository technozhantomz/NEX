import { useViewportContext } from "../../../../common/components";
import { List, Tag } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";

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
  const { width } = useViewportContext();
  return (
    <Styled.FeesTabWrapper>
      <section>
        <Styled.FeeSpecificHeader>General</Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={generalFeesRows}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={generalFeesRows}
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
                    <Styled.FeeTypeOrValueContainer>
                      {item.types.map((type) => (
                        <span
                          key={`${item.operation}-${type}`}
                          className="fee-info-value"
                        >
                          {type}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <Styled.FeeTypeOrValueContainer>
                      {item.fees.map((fee, index) => (
                        <span
                          key={`${item.operation}-${item.types[index]}-${fee}`}
                          className="fee-info-value"
                        >
                          {fee}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
      <section>
        <Styled.FeeSpecificHeader>Asset Specific</Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={assetFeesRows}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={assetFeesRows}
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
                    <Styled.FeeTypeOrValueContainer>
                      {item.types.map((type) => (
                        <span
                          key={`${item.operation}-${type}`}
                          className="fee-info-value"
                        >
                          {type}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <Styled.FeeTypeOrValueContainer>
                      {item.fees.map((fee, index) => (
                        <span
                          key={`${item.operation}-${item.types[index]}-${fee}`}
                          className="fee-info-value"
                        >
                          {fee}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
      <section>
        <Styled.FeeSpecificHeader>Account Specific</Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={accountFeesRows}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={accountFeesRows}
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
                    <Styled.FeeTypeOrValueContainer>
                      {item.types.map((type) => (
                        <span
                          key={`${item.operation}-${type}`}
                          className="fee-info-value"
                        >
                          {type}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <Styled.FeeTypeOrValueContainer>
                      {item.fees.map((fee, index) => (
                        <span
                          key={`${item.operation}-${item.types[index]}-${fee}`}
                          className="fee-info-value"
                        >
                          {fee}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
      <section>
        <Styled.FeeSpecificHeader>Market Specific</Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={marketFeesRows}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={marketFeesRows}
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
                    <Styled.FeeTypeOrValueContainer>
                      {item.types.map((type) => (
                        <span
                          key={`${item.operation}-${type}`}
                          className="fee-info-value"
                        >
                          {type}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <Styled.FeeTypeOrValueContainer>
                      {item.fees.map((fee, index) => (
                        <span
                          key={`${item.operation}-${item.types[index]}-${fee}`}
                          className="fee-info-value"
                        >
                          {fee}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
      <section>
        <Styled.FeeSpecificHeader>
          Bussiness Administration
        </Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={businessFeesRows}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={businessFeesRows}
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
                    <Styled.FeeTypeOrValueContainer>
                      {item.types.map((type) => (
                        <span
                          key={`${item.operation}-${type}`}
                          className="fee-info-value"
                        >
                          {type}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <Styled.FeeTypeOrValueContainer>
                      {item.fees.map((fee, index) => (
                        <span
                          key={`${item.operation}-${item.types[index]}-${fee}`}
                          className="fee-info-value"
                        >
                          {fee}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                </Styled.FeeItemContent>
              </Styled.FeeListItem>
            )}
          />
        )}
      </section>
      <section>
        <Styled.FeeSpecificHeader>Game Specific</Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <Styled.FeesTable
            bordered={false}
            dataSource={gameFeesRows}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={gameFeesRows}
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
                    <Styled.FeeTypeOrValueContainer>
                      {item.types.map((type) => (
                        <span
                          key={`${item.operation}-${type}`}
                          className="fee-info-value"
                        >
                          {type}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[2].title}
                    </span>
                    <Styled.FeeTypeOrValueContainer>
                      {item.fees.map((fee, index) => (
                        <span
                          key={`${item.operation}-${item.types[index]}-${fee}`}
                          className="fee-info-value"
                        >
                          {fee}
                        </span>
                      ))}
                    </Styled.FeeTypeOrValueContainer>
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
