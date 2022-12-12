import { Transaction } from "../../types";

export type UseSidechainTransactionBuilderResult = {
  buildAddingSidechainTransaction: (
    user_account_id: string,
    deposit_public_key: string,
    deposit_address: string,
    withdraw_public_key: string,
    withdraw_address: string,
    sidechain: string
  ) => Transaction;
  buildDeletingSidechainTransaction: (
    user_account_id: string,
    sidechain_address_id: string,
    sidechain: string
  ) => Transaction;
};
