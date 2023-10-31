import { Account, AccountLoadDetail } from "../../model/account/types";
import { getRandomName } from "../admin/admin";

export const getAccountLoadDetails = async (
  loadId: string
): Promise<AccountLoadDetail[]> => {
  return Promise.resolve(generateBulkLoadDetail(loadId, 5));
};

export const getAccounts = async (): Promise<Account[]> => {
  return Promise.resolve(generateAccounts(500));
};

/*-----------------------------------------------------*/

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const uploadStatus: string[] = ["Success", "Failed", "Pending"];
const accountType: string[] = ["Savings", "Current", "FD"];
const accountStatus: string[] = ["Active", "Inactive"];

function getRandomStatus(): string {
  return uploadStatus[getRandomInt(0, 3)];
}

function getRandomAccountType(): string {
  return accountType[getRandomInt(0, 3)];
}

function getRandomAccountStatus(): string {
  return accountStatus[getRandomInt(0, 2)];
}

const generateBulkLoadDetail = (
  loadId: string,
  count: number
): AccountLoadDetail[] => {
  const DUMMY_ACCOUNT_LOAD_DETAIL: AccountLoadDetail[] = [];
  while (DUMMY_ACCOUNT_LOAD_DETAIL.length < count) {
    DUMMY_ACCOUNT_LOAD_DETAIL.push({
      date: new Date()
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"),
      loadId: loadId,
      account: {
        phoneNumber: getRandomInt(100000, 999999).toString(),
        accountNumber: getRandomInt(100000, 999999).toString(),
        accountName: getRandomName().name,
        walletNumber: getRandomInt(100000, 999999).toString(),
        accountType: getRandomAccountType(),
        status: getRandomStatus() as "success" | "failed" | "pending",
      },
    });
  }
  return DUMMY_ACCOUNT_LOAD_DETAIL;
};

const generateAccounts = (count: number): Account[] => {
  const DUMMY_ACCOUNTS: Account[] = [];
  while (DUMMY_ACCOUNTS.length < count) {
    DUMMY_ACCOUNTS.push({
      phoneNumber: getRandomInt(100000, 999999).toString(),
      accountNumber: getRandomInt(100000, 999999).toString(),
      accountName: getRandomName().name,
      walletNumber: getRandomInt(100000, 999999).toString(),
      accountType: getRandomAccountType(),
      status: getRandomAccountStatus(),
    });
  }
  return DUMMY_ACCOUNTS;
};
