import { BatchLoad } from "../../model/common-types";
import { WalletLoad } from "../../model/wallet/types";
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

export const walletBulkLoad = async (
  financialEntityId: number,
  params: any
): Promise<any> => {
  return axios
    .post(`/api/v1/${financialEntityId}/wallets`, params)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
