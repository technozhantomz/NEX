import { Transaction } from "../../types";

export type UseSidechainTransactionBuilderResult = {
  buildAddingSidechainTransaction: (
    payer: string,
    sidechain: string,
    sidechain_address_account: string,
    deposit_public_key: string,
    withdraw_public_key: string,
    withdraw_address: string,
    sidechain_address_id?: string,
    deposit_address?: string
  ) => Transaction;
  buildDeletingSidechainTransaction: (
    payer: string,
    sidechain: string,
    sidechain_address_id: string,
    sidechain_address_account: string
  ) => Transaction;
};
