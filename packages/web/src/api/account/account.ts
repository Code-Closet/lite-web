import { AccountLoadDetail } from "../../model/account/types";

export const getAccountLoadDetails = async (
  loadId: string
): Promise<AccountLoadDetail[]> => {
  return Promise.resolve(generateBulkLoadDetail(loadId, 5));
};

/*-----------------------------------------------------*/

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const accountStatus: string[] = ["success", "failed", "pending"];
const accountType: string[] = ["savings", "current", "FD"];

function getRandomStatus(): string {
  return accountStatus[getRandomInt(0, 3)];
}

function getRandomAccountType(): string {
  return accountType[getRandomInt(0, 3)];
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
      phoneNumber: getRandomInt(100000, 999999).toString(),
      accountNumber: getRandomInt(100000, 999999).toString(),
      accountName: getRandomInt(100000, 999999).toString(),
      accountType: getRandomAccountType(),
      status: getRandomStatus() as "success" | "failed" | "pending",
    });
  }
  return DUMMY_ACCOUNT_LOAD_DETAIL;
};
