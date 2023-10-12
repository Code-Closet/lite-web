import axios from "../AxiosInstance";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<{ user: string; isAuthenticated: boolean }> => {
  const response = await axios.post("api/auth/login", {
    username,
    password,
  });
  return response.data as { user: string; isAuthenticated: boolean };
};

export const authenticateUser1 = async (): Promise<{
  user: string;
  isAuthenticated: boolean;
}> => {
  return Promise.resolve(DUMMY_USER);
};

const DUMMY_USER = { user: "dummy", isAuthenticated: true };
