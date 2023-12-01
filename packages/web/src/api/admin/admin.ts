import { User, UserResponse } from "../../model/user/types";
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

export interface DummyUser {
  financialEntityId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;
}

export const fetchAllUsers = (url: string): Promise<UserResponse> => {
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const addUser = (
  financialEntityId: string,
  newUser: User
): Promise<any> => {
  return axiosInstance
    .post(`/api/v1/${financialEntityId}/users`, {
      ...newUser,
      financialEntityId,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateUser = (
  financialEntityId: string,
  updatedUser: User
): Promise<any> => {
  return axiosInstance
    .put(`/api/v1/${financialEntityId}/users/${updatedUser.id}`, {
      ...updatedUser,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteUser = (
  financialEntityId: string,
  user: User
): Promise<any> => {
  return axiosInstance
    .delete(`/api/v1/${financialEntityId}/users/${user.id}`)
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
      username: name,
      email: email,
      userType: getRandomRole(),
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      phoneNumber: "1234567890",
      financialEntityId: "1",
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
/*
const DUMMY_USER_RESPONSE: UserResponse = {
  totalPages: 10,
  totalElements: 100,
  size: 10,
  content: generateUsers(10),
  number: 0,
  sort: {
    empty: true,
    sorted: true,
    unsorted: true,
  },
  first: true,
  last: true,
  numberOfElements: 0,
  pageable: {
    offset: 0,
    sort: {
      empty: true,
      sorted: true,
      unsorted: true,
    },
    pageNumber: 0,
    pageSize: 0,
    paged: true,
    unpaged: true,
  },
  empty: true,
};
*/
