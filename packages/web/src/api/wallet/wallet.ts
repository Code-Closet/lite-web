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
