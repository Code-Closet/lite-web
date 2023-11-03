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
