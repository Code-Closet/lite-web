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
  id: string;
  batchId: string;
  financialEntityId: number;
  isDuplicate: boolean;
  branch_id: string;
  customer_id: string;
  account_id: string;
  account_name: string;
  account_type: string;
  phone_number: string;
  validations: any[];
}

export interface AccountBulkLoadResponse {
  batchId: string;
  isPreview: boolean;
  wallet_loads: any;
  account_loads: AccountLoadPreview[];
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
  accounts: AccountList;
  status: string;
}

export interface AccountList extends Page {
  content: Account1[];
}
