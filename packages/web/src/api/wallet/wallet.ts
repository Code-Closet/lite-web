import { BatchLoad } from "../../model/common-types";
import { WalletLoad, WalletLoadPreview } from "../../model/wallet/types";
import axios from "../AxiosInstance";

export const getWalletLoads = async (url: string): Promise<BatchLoad> => {
  const response = await axios.get(url);
  return response.data;
};

export const getWalletLoadDetails = async (
  url: string
): Promise<WalletLoad> => {
  const response = await axios.get(url);
  return response.data;
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

const valid: { isValid: boolean; message: string }[] = [
  { isValid: true, message: "Success" },
  { isValid: false, message: "Error" },
];

function generateValidationMessage(): { isValid: boolean; message: string } {
  return valid[getRandomInt(0, 2)];
}

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
