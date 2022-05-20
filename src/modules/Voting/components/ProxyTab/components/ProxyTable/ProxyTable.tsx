import { DEFAULT_PROXY_ID } from "../../../../../../api/params";
import { useViewportContext } from "../../../../../../common/providers";
import { Account, Proxy } from "../../../../../../common/types";

import * as Styled from "./ProxyTable.styled";

type Props = {
  loading: boolean;
  proxy: Proxy;
  removeProxy: () => void;
};

export const ProxyTable = ({
  loading,
  proxy,
  removeProxy,
}: Props): JSX.Element => {
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
      render: (_value: any, _record: any) => (
        <Styled.ProxyTableActionButton onClick={removeProxy}>
          Remove
        </Styled.ProxyTableActionButton>
      ),
    },
  ];
  return (
    <>
      {sm ? (
        <Styled.ProxyList
          loading={loading}
          dataSource={[proxy].filter((proxy) => proxy.id !== DEFAULT_PROXY_ID)}
          renderItem={(item) => (
            <Styled.ProxyListItem key="item.id">
              <Styled.ProxyListItemContent>
                <div className="vote-info">
                  <span className="vote-info-title">{columns[0].title}</span>
                  <span className="vote-info-value">
                    {(item as Account).name}
                  </span>
                </div>
                <div className="vote-info">
                  <span className="vote-info-title">{columns[1].title}</span>
                  <span className="vote-info-value">
                    <Styled.ProxyTableActionButton onClick={removeProxy}>
                      Remove
                    </Styled.ProxyTableActionButton>
                  </span>
                </div>
              </Styled.ProxyListItemContent>
            </Styled.ProxyListItem>
          )}
        />
      ) : (
        <Styled.ProxyTable
          columns={columns}
          dataSource={[proxy].filter((proxy) => proxy.id !== DEFAULT_PROXY_ID)}
          loading={loading}
          rowKey="id"
          pagination={false}
          size="small"
        />
      )}
    </>
  );
};
