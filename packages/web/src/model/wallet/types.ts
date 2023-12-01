import { Model, Page } from "../common-types";

export interface WalletLoad {
  batchId: string;
  date: string;
  totalAmount: number;
  totalSuccess: number;
  totalFailed: number;
}

export interface WalletLoadDetail {
  date: string;
  loadId: string;
  walletId: string;
  phoneNumber: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  status: "success" | "failed" | "pending";
}

export interface WalletLoadPreview {
  id: string;
  account_credit_id: string;
  account_number: string;
  account_type: string;
  phone_number: string;
  transaction_type: string;
  isCritical: boolean;
  isDuplicateAmount: boolean;
  isWarning: boolean;
  is_duplicate_account: boolean;
  is_selected: boolean;
  validations: Validation[];
}

/************************************************ */
export interface WalletLoad extends Page {
  content: Wallet[];
}
export interface Wallet extends Model {
  extAccountId: string;
  walletId: string;
  extWalletId: string;
  creditAmount: string;
  fileDetail: string;
  batchId: string;
  loadType: string;
}

interface Validation {
  code: string;
  message: string;
  severity: string;
  type: string;
}
