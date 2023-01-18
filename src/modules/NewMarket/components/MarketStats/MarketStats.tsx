import * as Styled from "./MarketStats.styled";

export function MarketStats(): JSX.Element {
  return (
    <Styled.Row gutter={40}>
      <Styled.Col span={3}>
        <Styled.LatestStatistic title={"679 PPY"} value="$30,210.60" />
      </Styled.Col>
      <Styled.Col span={3}>
        <Styled.Statistic title="Ask" value="678.9012" />
      </Styled.Col>
      <Styled.Col span={3}>
        <Styled.Statistic title="Bid" value="678.9012" />
      </Styled.Col>
      <Styled.Col span={5}>
        <Styled.Statistic title="24h Change" value="+30,210.60 (+4.49%)" />
      </Styled.Col>
      <Styled.Col span={3}>
        <Styled.Statistic title="24h High" value="712.0543" />
      </Styled.Col>
      <Styled.Col span={3}>
        <Styled.Statistic title="24h Low" value="638.8265" />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic title="24h Volume" value="2,894.2234 PPY" />
      </Styled.Col>
    </Styled.Row>
  );
}
