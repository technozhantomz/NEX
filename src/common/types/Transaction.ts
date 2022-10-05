export type Transaction = {
  type: string;
  params: {
    fee: {
      amount: number;
      asset_id: string | undefined;
    };
    from?: string;
    to?: string;
    amount?: {
      amount: number;
      asset_id: string;
    };
    memo?: {
      from: string;
      to: string;
      nonce: any;
      message: any;
    };
    payer?: string;
    sidechain_address_account?: string;
    sidechain_address_id?: string;
    sidechain?: string;
    deposit_public_key?: string;
    deposit_address?: string;
    deposit_address_data?: string;
    withdraw_public_key?: string;
    withdraw_address?: string;
  };
};
