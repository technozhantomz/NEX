import { CheckOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Login, PrivateKey } from "peerplaysjs-lib";

import { defaultToken } from "../../api/params/networkparams";
import Layout from "../../components/layout";
import { useUser } from "../../context/index";
import {
  IAccountData,
  IFullAccount,
  ILoginFormData,
} from "../../context/user/userTypes";
// import { Asset } from "../../modules/Asset/asset";
import { usePeerplaysApi } from "../../modules/peerplaysApi";

const LoginPage: NextPage = () => {
  const { dbApi, historyApi } = usePeerplaysApi();
  const { updateAccountData } = useUser();
  const router = useRouter();

  const getFullAccount = (
    name: string,
    subscription: boolean
  ): Promise<IFullAccount | undefined> =>
    dbApi("get_full_accounts", [[name], subscription])
      .then((e: unknown[][]) => (e ? e[0][1] : undefined))
      .catch(() => false);

  const getSidechainAccounts = (
    accountId: string
  ): Promise<unknown[] | undefined> =>
    dbApi("get_sidechain_addresses_by_account", [accountId])
      .then((e: string | unknown[]) => (e.length ? e : undefined))
      .catch(() => false);

  const getAccount = async (
    data: IFullAccount
  ): Promise<IAccountData | undefined> => {
    // const { account, balances, limit_orders, call_orders, votes } = data;
    const { account, limit_orders, call_orders, votes } = data;
    const { id, name, active, owner, options } = account;
    const sidechainAccounts = await getSidechainAccounts(id);
    const assets: unknown[] = []; //await Promise.all(balances.map(formAssetData));
    let contacts: unknown[] = [];
    if (account.blacklisted_accounts.length) {
      const blacklisted_accounts = await contactsInfo(
        account,
        "blacklisted_accounts",
        2
      ).then((e) => e);
      const whitelisted_accounts = await contactsInfo(
        account,
        "whitelisted_accounts",
        1
      ).then((e) => e);
      contacts = contacts.concat(blacklisted_accounts);
      contacts = contacts.concat(whitelisted_accounts);
    }
    const history = await getUserHistory(id);
    const keys = {
      active,
      owner,
      memo: { memo_key: options.memo_key },
    };

    const createdAssets: never[] = [];

    // if (data.assets) {
    //   createdAssets = await dbApi("get_assets", [data.assets]).then(
    //     (assetsList) => {
    //       return Promise.all(
    //         assetsList.map(async (el) => {
    //           const dynamicData = await dbApi("get_objects", [
    //             [el.dynamic_asset_data_id],
    //           ]);
    //           const asset = await formAssetData({
    //             ...el,
    //             amount: dynamicData[0].current_supply,
    //           });
    //           const maxSupply = asset.setPrecision(true, el.options.max_supply);
    //           let assetType = "issued";
    //           let canBeIssued = true;

    //           if (el.bitasset_data_id) {
    //             canBeIssued = false;
    //             assetType = await dbApi("get_objects", [
    //               [el.bitasset_data_id],
    //             ]).then((e) =>
    //               e[0].is_prediction_market ? "prediction" : "smart"
    //             );
    //           }

    //           return {
    //             symbol: el.symbol,
    //             supply: asset.setPrecision(true),
    //             assetType: assetType,
    //             maxSupply,
    //             actions,
    //           };
    //         })
    //       );
    //     }
    //   );
    // }

    const membership = await formMembershipData(data);

    return {
      id,
      name,
      assets,
      history,
      keys,
      limit_orders,
      call_orders,
      votes,
      membership,
      contacts,
      createdAssets,
      sidechainAccounts,
    };
  };
  // const formAssetData = async (data: {
  //   id?: string;
  //   symbol?: string;
  //   balance?: number;
  //   amount?: number;
  //   precision?: number;
  // }) => {
  //   const id = data.id;
  //   const symbol = data.symbol;
  //   const amount = data.balance || data.amount || 0;

  //   if (id && symbol && data.precision) return new Asset(data);
  //   if (id) return new Asset({ id, amount }).getAssetById();
  //   if (symbol) return new Asset({ symbol, amount }).getAssetBySymbol();

  //   return new Asset(data);
  // };

  // const formAssetData = async (data) => {
  //   const id = data.asset_type || data.asset_id || data.id;
  //   const symbol = data.symbol;
  //   const amount = data.balance || data.amount || 0;

  //   if (id && symbol && data.precision) return new Asset(data);

  //   const cacheData = getCache("assets");
  //   const { basicAsset, defaultAsset } = getGlobals();

  //   if (defaultAsset) {
  //     const dataInCache = cacheData[id] || {};
  //     let assetFromRedux = "";
  //     if (
  //       dataInCache.symbol === basicAsset.symbol ||
  //       symbol === basicAsset.symbol
  //     )
  //       assetFromRedux = basicAsset;
  //     if (
  //       dataInCache.symbol === defaultAsset.symbol ||
  //       symbol === defaultAsset.symbol
  //     )
  //       assetFromRedux = defaultAsset;
  //     if (assetFromRedux) return new Asset({ ...assetFromRedux, amount });
  //   }

  //   if (id) return new Asset({ id, amount }).getDataById();
  //   if (symbol) return new Asset({ symbol, amount }).getDataBySymbol();

  //   return new Asset(data);
  // };

  const contactsInfo = async (
    account: IAccountData,
    listed: string,
    type: number
  ) => {
    const contacts: { id: unknown; type: unknown; name: unknown }[] = [];
    if (account[listed as keyof IAccountData].length) {
      account[listed as keyof IAccountData].map(async (id: unknown) => {
        contacts.push({
          id,
          type,
          name: await getUserName(id),
        });
      });
    }

    return contacts;
  };

  const getUserName = async (id: string | string[]) => {
    let userID = id;

    if (id.includes("1.6."))
      userID = await dbApi("get_witnesses", [[id]]).then(
        (acc: unknown) => acc[0].witness_account
      );

    const userName = await dbApi("get_accounts", [[userID]]).then(
      (acc: unknown) => acc[0].name
    );

    return userName;
  };

  const getUserHistory = (userID: unknown): unknown => {
    return historyApi("get_account_history", [
      userID,
      "1.11.0",
      100,
      "1.11.9999999999",
    ]).then((history: unknown[]) => history);
  };

  const formMembershipData = async (fullAcc: {
    account: unknown;
    lifetime_referrer_name: unknown;
    referrer_name: unknown;
    registrar_name: unknown;
  }) => {
    const { account, lifetime_referrer_name, referrer_name, registrar_name } =
      fullAcc;

    const isLifetimeMember = lifetime_referrer_name === account.name;

    const networkFee = account.network_fee_percentage / 100;
    const lifetimeFee = account.lifetime_referrer_fee_percentage / 100;
    const referrerFee =
      ((100 - networkFee - lifetimeFee) * account.referrer_rewards_percentage) /
      10000;
    const registrarFee = 100 - referrerFee - networkFee - lifetimeFee;

    let date = account.membership_expiration_date;

    if (date === "1970-01-01T00:00:00") {
      date = "N/A";
    } else if (date === "1969-12-31T23:59:59") {
      date = "Never";
    }

    const allocation = {
      network: {
        percent: networkFee,
      },
      reviewer: {
        user: lifetime_referrer_name,
        percent: lifetimeFee,
      },
      registrar: {
        user: registrar_name,
        percent: registrarFee,
      },
      referrer: {
        user: referrer_name,
        percent: referrerFee,
      },
      expiration: { date },
    };

    return { isLifetimeMember, allocation };
  };

  const onLogin = async (formData: ILoginFormData) => {
    //TODO: move to doseUserExist
    const fullAcc = await getFullAccount(formData.username, false);

    if (fullAcc === undefined) {
      //TODO: add error handling
      console.log("no account");
      return false;
    }
    // console.log(fullAcc);
    const accData = fullAcc.account;
    const roles = ["active", "owner", "memo"];
    let checkPassword = false;
    let fromWif = "";

    try {
      fromWif = PrivateKey.fromWif(formData.password);
    } catch (e) {
      console.error(e);
    }

    const keys = Login.generateKeys(
      formData.username,
      formData.password,
      roles
    );

    for (const role of roles) {
      const privKey = fromWif ? fromWif : keys.privKeys[role];
      const pubKey = privKey.toPublicKey().toString(defaultToken);
      const key =
        role !== "memo"
          ? accData[role as keyof IAccountData].key_auths[0][0]
          : accData.options.memo_key;

      if (key === pubKey) {
        checkPassword = true;
        break;
      }
    }
    if (!checkPassword) {
      console.log("wrong password");
      return false;
    }

    const userData = await getAccount(fullAcc);
    updateAccountData(userData);
    console.log(userData);
    router.push("/dashboard");
  };

  const formValdation = {
    username: [{ required: true, message: "Username is required" }],
    password: [
      { required: true, message: "Password is required" },
      {
        min: 12,
        message: "Password should be at least 12 characters long",
      },
    ],
  };

  return (
    <Layout title="Login" type="card" heading="Log into your account">
      <Card>
        <Form name="loginForm" onFinish={onLogin}>
          <Form.Item name="username" rules={formValdation.username}>
            <Input placeholder="Enter username" suffix={<CheckOutlined />} />
          </Form.Item>
          <Form.Item name="password" rules={formValdation.password}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
        <p className="disclamer">
          <span>Don't have a Peerplays account? </span>
          <Link href="/signup">
            <a>Create account</a>
          </Link>
        </p>
      </Card>
    </Layout>
  );
};

export default LoginPage;
