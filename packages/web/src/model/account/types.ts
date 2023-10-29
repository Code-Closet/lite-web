export interface AccountLoad {
  batchId: string;
  date: string;
  totalSuccess: number;
  totalFailed: number;
}

export interface AccountLoadDetail {
  date: string;
  loadId: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  phoneNumber: string;
  status: "success" | "failed" | "pending";
}
