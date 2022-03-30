import React from "react";

import * as Styled from "./DataTable.styled";

type Props = {
  approved: boolean;
};

export const DataTable = ({ approved }: Props): JSX.Element => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: () => <p>some-witness</p>,
    },
    {
      title: "Webpage",
      dataIndex: "",
      render: () => <p>https://example.com/peerplays</p>,
    },
    {
      title: "Votes",
      dataIndex: "",
      render: () => <p>1521896 PPY</p>,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>{approved ? `REMOVE` : `ADD`}</a>,
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      votes: 32,
      webpage: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      votes: 42,
      webpage: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      votes: 32,
      webpage: "Sidney No. 1 Lake Park",
    },
  ];

  const tableHeader = (
    <Styled.TableTitle strong>
      {approved ? `Approved by roger104` : `Not approved by roger104`}
      {approved ? <Styled.Check /> : <Styled.Xmark />}
    </Styled.TableTitle>
  )

  return (
    <Styled.ActionFormTabCard>
      <Styled.Table
        columns={columns}
        dataSource={data}
        size="small"
        title={() =>
          <Styled.TableTitle strong>
            {approved ? `Approved by roger104` : `Not approved by roger104`}
            {approved ? <Styled.Check /> : <Styled.Xmark />}
          </Styled.TableTitle>} />
    </Styled.ActionFormTabCard>
  );
};
