import { Workflow } from "../../model/approval/types";
import axiosInstance from "../AxiosInstance";

export const getWorkflow = (financialEntityId: number): Promise<Workflow> => {
  return axiosInstance
    .get(`/api/v1/${financialEntityId}/workflow`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
