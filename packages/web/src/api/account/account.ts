import {
  AccountBatchDetail,
  AccountList,
  AccountLoadPreview,
} from "../../model/account/types";
import { BatchLoad } from "../../model/common-types";
import axiosInstance from "../AxiosInstance";
import { getRandomName } from "../admin/admin";

export const getAccountLoadDetails = async (
  loadId: string,
  financialEntityId: number
): Promise<AccountBatchDetail> => {
  return axiosInstance
    .get(`/api/v1/${financialEntityId}/account/batch/${loadId}`)
    .then((response) => response.data);
};

export const getAccounts = async (url: string): Promise<AccountList> => {
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const fileUpload = async (
  financialEntityId: number,
  file_type: string,
  file: FormData
) => {
  return axiosInstance.post(
    `/api/v1/${financialEntityId}/batch/file?file_type=${file_type}`,
    file
  );
};
export const accountLoadPreview = async (): Promise<AccountLoadPreview[]> => {
  return Promise.resolve(generateAccountsPreview(10));
};

export const accountBulkLoad = async (url: string): Promise<BatchLoad> => {
  return axiosInstance.get(url).then((response) => response.data);
};

/*-----------------------------------------------------*/

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const accountType: string[] = ["Savings", "Current", "FD"];

function getRandomAccountType(): string {
  return accountType[getRandomInt(0, 3)];
}

const generateAccountsPreview = (count: number): AccountLoadPreview[] => {
  const DUMMY_ACCOUNTS: AccountLoadPreview[] = [];
  while (DUMMY_ACCOUNTS.length < count) {
    DUMMY_ACCOUNTS.push({
      phoneNumber: getRandomInt(100000, 999999).toString(),
      accountNumber: getRandomInt(100000, 999999).toString(),
      accountName: getRandomName().name,
      accountType: getRandomAccountType(),
      isValid: false,
      message: "Failed",
    });
  }
  return DUMMY_ACCOUNTS;
};
