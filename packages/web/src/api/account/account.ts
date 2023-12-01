import {
  AccountBatchDetail,
  AccountBulkLoadResponse,
  AccountList,
} from "../../model/account/types";
import { BatchLoad } from "../../model/common-types";
import axiosInstance from "../AxiosInstance";

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
): Promise<AccountBulkLoadResponse> => {
  return axiosInstance
    .post(
      `/api/v1/${financialEntityId}/batch/file?file_type=${file_type}`,
      file
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const accountBulkLoadPreview = async (
  url: string
): Promise<BatchLoad> => {
  return axiosInstance.get(url).then((response) => response.data);
};

export const accountBulkLoad = async (
  financialEntityId: number,
  params: any
): Promise<any> => {
  return axiosInstance
    .post(`/api/v1/${financialEntityId}/account`, params)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
