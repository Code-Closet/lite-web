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
  name: string;
  phoneNumber: string;
  accountNumber: string;
  walletNumber: string;
  amount: number;
  isValid: boolean;
  message: string;
}
