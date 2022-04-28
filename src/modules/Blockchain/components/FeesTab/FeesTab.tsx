import { useState } from "react";

import { useViewportContext } from "../../../../common/providers";
import { List, Tag } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";

import { FeesColumns } from "./FeesColumns";
import * as Styled from "./FeesTab.styled";
import { useFeesTab } from "./hooks";

export const FeesTab = (): JSX.Element => {
  const [generalFull, setGeneralFull] = useState<boolean>(false);
  const [assetFull, setAssetFull] = useState<boolean>(false);
  const [accountFull, setAccountFull] = useState<boolean>(false);
  const [businessFull, setBusinessFull] = useState<boolean>(false);
  const [gameFull, setGameFull] = useState<boolean>(false);
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
                generalFull
                  ? generalFeesRows
                  : generalFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {generalFull ? (
              <a onClick={() => setGeneralFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setGeneralFull(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                generalFull
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
            {generalFull ? (
              <a onClick={() => setGeneralFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setGeneralFull(true)}>Show More</a>
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
                assetFull
                  ? assetFeesRows
                  : assetFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {assetFull ? (
              <a onClick={() => setAssetFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setAssetFull(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                assetFull
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
            {assetFull ? (
              <a onClick={() => setAssetFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setAssetFull(true)}>Show More</a>
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
                accountFull
                  ? accountFeesRows
                  : accountFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {accountFull ? (
              <a onClick={() => setAccountFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setAccountFull(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                accountFull
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
            {accountFull ? (
              <a onClick={() => setAccountFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setAccountFull(true)}>Show More</a>
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
                businessFull
                  ? businessFeesRows
                  : businessFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {businessFull ? (
              <a onClick={() => setBusinessFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setBusinessFull(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                businessFull
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
            {businessFull ? (
              <a onClick={() => setBusinessFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setBusinessFull(true)}>Show More</a>
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
                gameFull
                  ? gameFeesRows
                  : gameFeesRows.filter((item, index) => {
                      if (index < 5) return item;
                    })
              }
              columns={FeesColumns}
              loading={loading}
              pagination={false}
            />
            {gameFull ? (
              <a onClick={() => setGameFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setGameFull(true)}>Show More</a>
            )}
          </>
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={
                gameFull
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
            {gameFull ? (
              <a onClick={() => setGameFull(false)}>Show Less</a>
            ) : (
              <a onClick={() => setGameFull(true)}>Show More</a>
            )}
          </>
        )}
      </Styled.Section>
    </Styled.FeesTabWrapper>
  );
};
