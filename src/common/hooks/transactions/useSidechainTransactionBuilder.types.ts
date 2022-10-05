import { Transaction } from "../../types";

export type UseSidechainTransactionBuilderResult = {
  buildAddingBitcoinSidechainTransaction: (
    payer: string,
    sidechain_address_account: string,
    deposit_public_key: string,
    withdraw_public_key: string,
    withdraw_address: string
  ) => Transaction;
  buildDeletingBitcoinSidechainTransaction: (
    payer: string,
    sidechain_address_id: string,
    sidechain_address_account: string
  ) => Transaction;
};
