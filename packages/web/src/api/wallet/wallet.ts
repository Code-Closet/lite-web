import {
  WalletLoad,
  WalletLoadDetail,
  WalletLoadPreview,
} from "../../model/wallet/types";
//import axios from "../AxiosInstance";

export const getWalletLoads = async (): Promise<WalletLoad[]> => {
  return Promise.resolve(generateBulkLoad(100));
  //   const response = await axios.get("api/wallet/load");
  //   return response.data;
};

export const getWalletLoadDetails = async (
  loadId: string
): Promise<WalletLoadDetail[]> => {
  return Promise.resolve(generateBulkLoadDetail(loadId, 5));
};

export const getWalletLoadPreview = async (): Promise<WalletLoadPreview[]> => {
  return Promise.resolve(generateWalletsPreview(10));
};

/*----------------------------------------------*/

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const walletStatus: string[] = ["success", "failed", "pending"];
const valid: { isValid: boolean; message: string }[] = [
  { isValid: true, message: "Success" },
  { isValid: false, message: "Error" },
];

function generateValidationMessage(): { isValid: boolean; message: string } {
  return valid[getRandomInt(0, 2)];
}
function getRandomStatus(): string {
  return walletStatus[getRandomInt(0, 3)];
}

const generateBulkLoad = (count: number): WalletLoad[] => {
  const DUMMY_WALLET_LOAD: WalletLoad[] = [];
  while (DUMMY_WALLET_LOAD.length < count) {
    DUMMY_WALLET_LOAD.push({
      batchId: getRandomInt(100000, 999999).toString(),
      date: new Date()
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"),
      totalAmount: getRandomInt(100000, 999999),
      totalSuccess: getRandomInt(1, 500),
      totalFailed: getRandomInt(1, 100),
    });
  }
  return DUMMY_WALLET_LOAD;
};

const generateBulkLoadDetail = (
  loadId: string,
  count: number
): WalletLoadDetail[] => {
  const DUMMY_WALLET_LOAD_DETAIL: WalletLoadDetail[] = [];
  while (DUMMY_WALLET_LOAD_DETAIL.length < count) {
    DUMMY_WALLET_LOAD_DETAIL.push({
      date: new Date()
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"),
      loadId: loadId,
      walletId: getRandomInt(100000, 999999).toString(),
      phoneNumber: getRandomInt(100000, 999999).toString(),
      accountNumber: getRandomInt(100000, 999999).toString(),
      accountName: getRandomInt(100000, 999999).toString(),
      amount: getRandomInt(100000, 999999),
      status: getRandomStatus() as "success" | "failed" | "pending",
    });
  }
  return DUMMY_WALLET_LOAD_DETAIL;
};

const generateWalletsPreview = (count: number): WalletLoadPreview[] => {
  const DUMMY_WALLET_LOAD_PREVIEW: WalletLoadPreview[] = [];
  while (DUMMY_WALLET_LOAD_PREVIEW.length < count) {
    const valid = generateValidationMessage();
    DUMMY_WALLET_LOAD_PREVIEW.push({
      walletNumber: getRandomInt(100000, 999999).toString(),
      phoneNumber: getRandomInt(100000, 999999).toString(),
      accountNumber: getRandomInt(100000, 999999).toString(),
      name: getRandomInt(100000, 999999).toString(),
      amount: getRandomInt(100000, 999999),
      isValid: valid.isValid,
      message: valid.message,
    });
  }
  return DUMMY_WALLET_LOAD_PREVIEW;
};
