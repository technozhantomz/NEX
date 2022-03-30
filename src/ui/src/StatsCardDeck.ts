import styled from "styled-components";

export const StatsCardsDeck = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 120px;
  white-space: nowrap;
  margin: 25px 0 35px;
  & > .stats-card {
    margin: 0 15px;
  }
`;
