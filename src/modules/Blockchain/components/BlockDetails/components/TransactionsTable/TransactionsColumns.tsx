import Link from "next/link";

import { TableHeading } from "../../../../../../common/components";
import { TransactionRow } from "../../hooks/useBlockDetails.types";

import * as Styled from "./TransactionsTable.styled";

export const TransactionsColumns = (
  block: number
): {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render:
    | ((rank: number) => JSX.Element)
    | ((id: string, record: TransactionRow) => JSX.Element)
    | ((expiration: string) => JSX.Element)
    | ((operations: unknown[]) => JSX.Element)
    | ((extensions: unknown[]) => JSX.Element)
    | undefined;
  filters: unknown | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter: unknown | undefined;
  sorter:
    | ((a: { rank: number }, b: { rank: number }) => number)
    | ((a: { id: string }, b: { id: string }) => number)
    | ((a: { expiration: string }, b: { expiration: string }) => number)
    | ((a: { operations: unknown[] }, b: { operations: unknown[] }) => number)
    | ((a: { refBlockPrefix: number }, b: { refBlockPrefix: number }) => number)
    | ((a: { refBlockNum: number }, b: { refBlockNum: number }) => number)
    | ((a: { extensions: unknown[] }, b: { extensions: unknown[] }) => number)
    | undefined;
}[] => {
  const headings = [
    "rank",
    "id",
    "expiration",
    "operations",
    "ref_block_prefix",
    "ref_block_num",
    "extensions",
  ];
  const keys = [
    "rank",
    "id",
    "expiration",
    "operations",
    "refBlockPrefix",
    "refBlockNum",
    "extensions",
  ];
  const renders = [
    (rank: number): JSX.Element => (
      <Link target="_blank" href={`/blockchain/${block}/${rank}`}>
        {rank}
      </Link>
    ),
    (id: string, record: TransactionRow): JSX.Element => (
      <Link target="_blank" href={`/blockchain/${block}/${record.rank}`}>
        <Styled.CenterEllipsis>
          <span className="ellipsis">{id}</span>
          <span className="indent">{id}</span>
        </Styled.CenterEllipsis>
      </Link>
    ),
    (expiration: string): JSX.Element => (
      <Styled.TimeStamp>{expiration}</Styled.TimeStamp>
    ),
    (operations: unknown[]): JSX.Element => <span>{operations.length}</span>,
    undefined,
    undefined,
    (extensions: unknown[]): JSX.Element => <span>{extensions.length}</span>,
  ];
  const filters = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const filterModes = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const filterSearch = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const onFilters = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const sorters = [
    (a: { rank: number }, b: { rank: number }) => a.rank - b.rank,
    (a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id),
    (a: { expiration: string }, b: { expiration: string }) =>
      new Date(a.expiration).getTime() - new Date(b.expiration).getTime(),
    (a: { operations: unknown[] }, b: { operations: unknown[] }) =>
      a.operations.length - b.operations.length,
    (a: { refBlockPrefix: number }, b: { refBlockPrefix: number }) =>
      a.refBlockPrefix - b.refBlockPrefix,
    (a: { refBlockNum: number }, b: { refBlockNum: number }) =>
      a.refBlockNum - b.refBlockNum,
    (a: { extensions: unknown[] }, b: { extensions: unknown[] }) =>
      a.extensions.length - b.extensions.length,
  ];

  const columns = headings.map((heading, index) => {
    return {
      title: (): JSX.Element => <TableHeading heading={heading} />,
      dataIndex: keys[index],
      key: keys[index],
      render: renders[index],
      filters: filters[index],
      filterMode: filterModes[index],
      filterSearch: filterSearch[index],
      onFilter: onFilters[index],
      sorter: sorters[index],
    };
  });

  return columns;
};

// {
//   "id": 515859,
//   "jsonrpc": "2.0",
//   "result": {
//       "previous": "0007df12371720c575b3fffe98b8e8f228628c06",
//       "timestamp": "2023-03-06T18:40:15",
//       "witness": "1.6.22",
//       "next_secret_hash": "1c81c44488bfa91101a35a93485be007bfce7cf5",
//       "previous_secret": "50def63adc95aa59f95398df5be550058e71ca6f",
//       "transaction_merkle_root": "0000000000000000000000000000000000000000",
//       "extensions": [],
//       "witness_signature": "1f3bd6346a99c09e9f134edf1059605d8b846b1f6daa7ebf99616c4483475a23430102f5401b835b7f35d4d3f710637f1d192c94978d0e72ec69f22d60254450d9",
//       "transactions": [],
//       "block_id": "0007df131103484f318105d239ad329487a86a99",
//       "signing_key": "TEST5Jnq9LjreRbeMVZrx63h71R1pEL8tr7QiNHykH8qpFRh4y6ZCW",
//       "transaction_ids": []
//   }
// }

// {
//   "id": 515858,
//   "jsonrpc": "2.0",
//   "result": {
//       "previous": "0007df115f1e1dd10a9852e43c458882af824c36",
//       "timestamp": "2023-03-06T18:40:12",
//       "witness": "1.6.13",
//       "next_secret_hash": "9652794c59c422f7fa25451ba2d873c1328a3e45",
//       "previous_secret": "16cc8c10184869524c2f5560ff3c4e22039b0b82",
//       "transaction_merkle_root": "3b4514fc8426cc984237c95fe22992d9d5724418",
//       "extensions": [],
//       "witness_signature": "200a3891a5bf2686b96c6f0814f1ad39da80aaf07c9ef18d32f15b98a00378dac63821df52f6894606669506a6bc196ea27f11a9336148a5a8e9503d58fa755f04",
//       "transactions": [
//           {
//               "ref_block_num": 57105,
//               "ref_block_prefix": 3508346463,
//               "expiration": "2023-03-06T18:55:09",
//               "operations": [
//                   [
//                       104,
//                       {
//                           "fee": {
//                               "amount": 0,
//                               "asset_id": "1.3.0"
//                           },
//                           "son_id": "1.33.0",
//                           "owner_account": "1.2.36",
//                           "ts": "2023-03-06T18:40:10"
//                       }
//                   ]
//               ],
//               "extensions": [],
//               "signatures": [
//                   "1f14deda6a8f2a0d5c1ef9d07fc33b9eb738729208d93b4a286b9de06252d464c903d29b2f8c65dea3a78b13f9e059f4ee09233948e9ed46580f9d27c0d9959aa5"
//               ],
//               "operation_results": [
//                   [
//                       1,
//                       "1.33.0"
//                   ]
//               ]
//           },
//           {
//               "ref_block_num": 57105,
//               "ref_block_prefix": 3508346463,
//               "expiration": "2023-03-06T18:55:09",
//               "operations": [
//                   [
//                       104,
//                       {
//                           "fee": {
//                               "amount": 0,
//                               "asset_id": "1.3.0"
//                           },
//                           "son_id": "1.33.1",
//                           "owner_account": "1.2.37",
//                           "ts": "2023-03-06T18:40:10"
//                       }
//                   ]
//               ],
//               "extensions": [],
//               "signatures": [
//                   "201801b2faa32dcbe763df092dc92d26dad8a597940e42bb9aa857b8d6052609595ef3c3062ed25e8e796fe8352a318dc97c180dbb5c72cd79eea05abf717b2e07"
//               ],
//               "operation_results": [
//                   [
//                       1,
//                       "1.33.1"
//                   ]
//               ]
//           },
//           {
//               "ref_block_num": 57105,
//               "ref_block_prefix": 3508346463,
//               "expiration": "2023-03-06T18:55:09",
//               "operations": [
//                   [
//                       104,
//                       {
//                           "fee": {
//                               "amount": 0,
//                               "asset_id": "1.3.0"
//                           },
//                           "son_id": "1.33.2",
//                           "owner_account": "1.2.38",
//                           "ts": "2023-03-06T18:40:10"
//                       }
//                   ]
//               ],
//               "extensions": [],
//               "signatures": [
//                   "206a9e4193273c6559fd0971ec93a5da885d5606664e4b322f58f44bd8ae6f027a5ffb16c620ea0f047d790238ce397d165ace183fac2b9d511d5b2cf5d9061be7"
//               ],
//               "operation_results": [
//                   [
//                       1,
//                       "1.33.2"
//                   ]
//               ]
//           },
//           {
//               "ref_block_num": 57105,
//               "ref_block_prefix": 3508346463,
//               "expiration": "2023-03-06T18:55:09",
//               "operations": [
//                   [
//                       104,
//                       {
//                           "fee": {
//                               "amount": 0,
//                               "asset_id": "1.3.0"
//                           },
//                           "son_id": "1.33.3",
//                           "owner_account": "1.2.39",
//                           "ts": "2023-03-06T18:40:10"
//                       }
//                   ]
//               ],
//               "extensions": [],
//               "signatures": [
//                   "1f0933cab2eb2ac29094d4063853b3eec35fe67098e47b047a01c9c84c76fdb60a0096e23e486e0d35772b5c4ee226da6546bccd3659b861d848481e07fac61695"
//               ],
//               "operation_results": [
//                   [
//                       1,
//                       "1.33.3"
//                   ]
//               ]
//           },
//           {
//               "ref_block_num": 57105,
//               "ref_block_prefix": 3508346463,
//               "expiration": "2023-03-06T18:55:09",
//               "operations": [
//                   [
//                       104,
//                       {
//                           "fee": {
//                               "amount": 0,
//                               "asset_id": "1.3.0"
//                           },
//                           "son_id": "1.33.4",
//                           "owner_account": "1.2.40",
//                           "ts": "2023-03-06T18:40:10"
//                       }
//                   ]
//               ],
//               "extensions": [],
//               "signatures": [
//                   "2060003d29a728cb98a60502554483c482b6dcd006f1ff0c35d39e9e5e88a5f4c528667d211f488cffc686313a2b0bae94bde3225c3c47931f5198aa31d7365472"
//               ],
//               "operation_results": [
//                   [
//                       1,
//                       "1.33.4"
//                   ]
//               ]
//           }
//       ],
//       "block_id": "0007df12371720c575b3fffe98b8e8f228628c06",
//       "signing_key": "TEST8YgGjPfpnnK5rS1T21cd8CGtLxi8VvygpBCU2SvDZNBwkTApso",
//       "transaction_ids": [
//           "d668892932e5db5af90709f8515e6477bb37cb74",
//           "8f1beaf9c53ee02a5c371de69024e5a44f03a2af",
//           "37e10a7fcdd1318064c36e215cf3302b92bbf2ef",
//           "2391f0c77c63f100a7f6c40a11f75e73945f94e6",
//           "ff2186c592ed77eda39772f749856fbecbfe5474"
//       ]
//   }
// }
