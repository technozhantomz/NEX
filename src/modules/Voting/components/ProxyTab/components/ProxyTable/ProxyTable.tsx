import counterpart from "counterpart";

import { DEFAULT_PROXY_ID } from "../../../../../../api/params";
import { TableHeading } from "../../../../../../common/components/TableHeading";
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
      title: (): JSX.Element => <TableHeading heading={"name"} />,
      dataIndex: "name",
      key: "name",
    },
    {
      title: (): JSX.Element => <TableHeading heading={"action"} />,
      dataIndex: "action",
      key: "action",
      render: (_value: any, _record: any) => (
        <Styled.ProxyTableActionButton onClick={removeProxy}>
          {counterpart.translate(`buttons.remove`)}
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
                      {counterpart.translate(`buttons.remove`)}
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
