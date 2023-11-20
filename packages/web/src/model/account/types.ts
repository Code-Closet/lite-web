import { Batch, Model, Page } from "../common-types";

export interface AccountLoad {
  batchId: string;
  date: string;
  totalSuccess: number;
  totalFailed: number;
}

export interface AccountLoadDetail {
  date: string;
  loadId: string;
  account: Account;
}

export interface Account {
  firstName?: string;
  lastName?: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  phoneNumber: string;
  walletNumber?: string;
  status: string;
}

export interface AccountLoadPreview {
  accountNumber: string;
  accountName: string;
  accountType: string;
  phoneNumber: string;
  isValid: boolean;
  message: string;
}
/************************************************ */

export interface Account1 extends Model {
  extAccountId: string;
  customerId: string;
  branchId: string;
  accountName: string;
  accountType: string;
  phoneNumber: string;
  batchId: string;
}

export interface AccountBatchDetail {
  batch: Batch;
  accounts: Account1[];
  status: string;
}

export interface AccountList extends Page {
  content: Account1[];
}
