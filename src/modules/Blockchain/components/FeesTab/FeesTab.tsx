import { useState } from "react";

import { useViewportContext } from "../../../../common/providers";
import { List, Tag } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";

import { FeesColumns } from "./FeesColumns";
import * as Styled from "./FeesTab.styled";
import { useFeesTab } from "./hooks";

export const FeesTab = (): JSX.Element => {
  const [showAllGeneralFeesRows, setShowAllGeneralFeesRows] =
    useState<boolean>(false);
  const [showAllAssetFeesRows, setShowAllAssetFeesRows] =
    useState<boolean>(false);
  const [showAllAccountFeesRows, setShowAllAccountFeesRows] =
    useState<boolean>(false);
  const [showAllBusinessFeesRows, setShowAllBusinessFeesRows] =
    useState<boolean>(false);
  const [showAllGameFeesRows, setShowAllGameFeesRows] =
    useState<boolean>(false);
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
      <Styled.Section>
        <Styled.FeeSpecificHeader>General</Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <>
            <Styled.FeesTable
              bordered={false}
              dataSource={
                showAllGeneralFeesRows
                  ? generalFeesRows
                  : generalFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {showAllGeneralFeesRows ? (
              <a onClick={() => setShowAllGeneralFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllGeneralFeesRows(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                showAllGeneralFeesRows
                  ? generalFeesRows
                  : generalFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
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
            {showAllGeneralFeesRows ? (
              <a onClick={() => setShowAllGeneralFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllGeneralFeesRows(true)}>Show More</a>
            )}
          </>
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.FeeSpecificHeader>Asset Specific</Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <>
            <Styled.FeesTable
              bordered={false}
              dataSource={
                showAllAssetFeesRows
                  ? assetFeesRows
                  : assetFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {showAllAssetFeesRows ? (
              <a onClick={() => setShowAllAssetFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllAssetFeesRows(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                showAllAssetFeesRows
                  ? assetFeesRows
                  : assetFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
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
            {showAllAssetFeesRows ? (
              <a onClick={() => setShowAllAssetFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllAssetFeesRows(true)}>Show More</a>
            )}
          </>
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.FeeSpecificHeader>Account Specific</Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <>
            <Styled.FeesTable
              bordered={false}
              dataSource={
                showAllAccountFeesRows
                  ? accountFeesRows
                  : accountFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {showAllAccountFeesRows ? (
              <a onClick={() => setShowAllAccountFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllAccountFeesRows(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                showAllAccountFeesRows
                  ? accountFeesRows
                  : accountFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
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
            {showAllAccountFeesRows ? (
              <a onClick={() => setShowAllAccountFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllAccountFeesRows(true)}>Show More</a>
            )}
          </>
        )}
      </Styled.Section>
      <Styled.Section>
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
      </Styled.Section>
      <Styled.Section>
        <Styled.FeeSpecificHeader>
          Bussiness Administration
        </Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <>
            <Styled.FeesTable
              bordered={false}
              dataSource={
                showAllBusinessFeesRows
                  ? businessFeesRows
                  : businessFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {showAllBusinessFeesRows ? (
              <a onClick={() => setShowAllBusinessFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllBusinessFeesRows(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                showAllBusinessFeesRows
                  ? businessFeesRows
                  : businessFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
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
            {showAllBusinessFeesRows ? (
              <a onClick={() => setShowAllBusinessFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllBusinessFeesRows(true)}>Show More</a>
            )}
          </>
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.FeeSpecificHeader>Game Specific</Styled.FeeSpecificHeader>
        {width > breakpoints.sm ? (
          <>
            <Styled.FeesTable
              bordered={false}
              dataSource={
                showAllGameFeesRows
                  ? gameFeesRows
                  : gameFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {showAllGameFeesRows ? (
              <a onClick={() => setShowAllGameFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllGameFeesRows(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                showAllGameFeesRows
                  ? gameFeesRows
                  : gameFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
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
            {showAllGameFeesRows ? (
              <a onClick={() => setShowAllGameFeesRows(false)}>Show Less</a>
            ) : (
              <a onClick={() => setShowAllGameFeesRows(true)}>Show More</a>
            )}
          </>
        )}
      </Styled.Section>
    </Styled.FeesTabWrapper>
  );
};
