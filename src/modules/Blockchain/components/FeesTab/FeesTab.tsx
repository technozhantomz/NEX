import counterpart from "counterpart";
import { useState } from "react";

import { useViewportContext } from "../../../../common/providers";
import { List, Tag } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

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
  const { sm } = useViewportContext();
  return (
    <Styled.FeesTabWrapper>
      <Styled.Section>
        <Styled.FeeSpecificHeader>
          {counterpart.translate(`pages.blocks.fees.general`)}
        </Styled.FeeSpecificHeader>
        {sm ? (
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
                          <Tag key={item.operation} bgColor={colors.assetTag}>
                            {item.operation}
                          </Tag>
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
            {loading ? (
              ""
            ) : generalFull ? (
              <a onClick={() => setGeneralFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setGeneralFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        ) : (
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
              <a onClick={() => setGeneralFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setGeneralFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.FeeSpecificHeader>
          {counterpart.translate(`pages.blocks.fees.asset_specific`)}
        </Styled.FeeSpecificHeader>
        {sm ? (
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
                          <Tag key={item.operation} bgColor={colors.assetTag}>
                            {item.operation}
                          </Tag>
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
            {loading ? (
              ""
            ) : assetFull ? (
              <a onClick={() => setAssetFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setAssetFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        ) : (
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
              <a onClick={() => setAssetFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setAssetFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.FeeSpecificHeader>
          {counterpart.translate(`pages.blocks.fees.account_specific`)}
        </Styled.FeeSpecificHeader>
        {sm ? (
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
                          <Tag key={item.operation} bgColor={colors.assetTag}>
                            {item.operation}
                          </Tag>
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
            {loading ? (
              ""
            ) : accountFull ? (
              <a onClick={() => setAccountFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setAccountFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        ) : (
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
              <a onClick={() => setAccountFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setAccountFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.FeeSpecificHeader>
          {counterpart.translate(`pages.blocks.fees.market_specific`)}
        </Styled.FeeSpecificHeader>
        {sm ? (
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
                        <Tag key={item.operation} bgColor={colors.assetTag}>
                          {item.operation}
                        </Tag>
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
        ) : (
          <Styled.FeesTable
            bordered={false}
            dataSource={marketFeesRows}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.FeeSpecificHeader>
          {counterpart.translate(`pages.blocks.fees.business_administration`)}
        </Styled.FeeSpecificHeader>
        {sm ? (
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
                          <Tag key={item.operation} bgColor={colors.assetTag}>
                            {item.operation}
                          </Tag>
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
            {loading ? (
              ""
            ) : businessFull ? (
              <a onClick={() => setBusinessFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setBusinessFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        ) : (
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
              <a onClick={() => setBusinessFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setBusinessFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.FeeSpecificHeader>
          {counterpart.translate(`pages.blocks.fees.game_specific`)}
        </Styled.FeeSpecificHeader>
        {sm ? (
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
                          <Tag key={item.operation} bgColor={colors.assetTag}>
                            {item.operation}
                          </Tag>
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
            {loading ? (
              ""
            ) : gameFull ? (
              <a onClick={() => setGameFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setGameFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        ) : (
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
              <a onClick={() => setGameFull(false)}>
                {counterpart.translate(`pages.blocks.fees.show_less`)}
              </a>
            ) : (
              <a onClick={() => setGameFull(true)}>
                {counterpart.translate(`pages.blocks.fees.show_more`)}
              </a>
            )}
          </>
        )}
      </Styled.Section>
    </Styled.FeesTabWrapper>
  );
};
