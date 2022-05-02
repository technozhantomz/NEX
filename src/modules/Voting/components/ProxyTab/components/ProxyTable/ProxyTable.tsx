import { useViewportContext } from "../../../../../../common/providers";

import * as Styled from "./ProxyTable.styled";

export const ProxyTable = (): JSX.Element => {
  const { sm } = useViewportContext();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_value: any, record: any) => (
        <Styled.ProxyTableActionButton>Remove</Styled.ProxyTableActionButton>
      ),
    },
  ];
  return (
    <>
      {sm ? (
        <Styled.ProxyList
          renderItem={(item) => (
            <Styled.ProxyListItem>
              <div>
                <span>{columns[0].title}</span>
                <span>{item.name}</span>
              </div>
              <div>
                <span>{columns[1].title}</span>
                <span>
                  <Styled.ProxyTableActionButton>
                    Remove
                  </Styled.ProxyTableActionButton>
                </span>
              </div>
            </Styled.ProxyListItem>
          )}
        />
      ) : (
        <Styled.ProxyTable columns={columns} size="small" />
      )}
    </>
  );
};
