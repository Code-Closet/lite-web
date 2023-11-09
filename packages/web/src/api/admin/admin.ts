import axiosInstance from "../AxiosInstance";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const firstNames: string[] = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Emma",
  "Fiona",
  "George",
  "Hannah",
  "Ivy",
  "Jack",
];
const lastNames: string[] = [
  "Smith",
  "Johnson",
  "Brown",
  "Davis",
  "Wilson",
  "Evans",
  "Lee",
  "Taylor",
  "Harris",
  "White",
];
const roles: string[] = [
  "Admin",
  "Customer",
  "Agent",
  "Maker",
  "L1_Approver",
  "L2_Approver",
];

const userStatus: string[] = ["Active", "Inactive", "Not logged in"];

export function getRandomName(): { name: string; email: string } {
  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  return {
    name: `${randomFirstName} ${randomLastName}`,
    email: `${randomFirstName}.${randomLastName}@domain.com`,
  };
}

function getRandomRole(): string {
  return roles[getRandomInt(0, 6)];
}

function getRandomStatus(): string {
  return userStatus[getRandomInt(0, 3)];
}

export interface DummyUser {
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface User {
  updateUser?: string | null;
  fiancialEntityId: string;
  id?: string | null;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  status: string;
}

export type JSONObject<T = any> = { [key: string]: T };

export interface UserResponse {
  pageable: JSONObject;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: JSONObject;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
  content: User[];
}

export const fetchAllUsers = (): Promise<UserResponse> => {
  return axiosInstance
    .get("/api/v1/1001/users?page=0&size=10&sort=id&sort=username")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const DUMMY_USERS: DummyUser[] = [];

export const generateUsers = (count: number): DummyUser[] => {
  while (DUMMY_USERS.length < count) {
    const { name, email } = getRandomName();
    DUMMY_USERS.push({
      name: name,
      email: email,
      role: getRandomRole(),
      status: getRandomStatus(),
    });
  }
  return DUMMY_USERS;
};

export const getRoles = (): Promise<{ value: string; label: string }[]> => {
  return Promise.resolve(DUMMY_ROLES);
};

const DUMMY_ROLES: { value: string; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "customer", label: "Customer" },
  { value: "agent", label: "Agent" },
  { value: "maker", label: "Maker" },
  { value: "l1_approver", label: "L1 Approver" },
  { value: "l2_approver", label: "L2 Approver" },
];
