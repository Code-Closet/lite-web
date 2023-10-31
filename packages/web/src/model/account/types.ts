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
  accountNumber: string;
  accountName: string;
  accountType: string;
  phoneNumber: string;
  walletNumber: string;
  status: string;
}
