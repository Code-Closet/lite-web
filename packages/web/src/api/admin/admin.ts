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

function getRandomName(): { name: string; email: string } {
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

export interface User {
  name: string;
  email: string;
  role: string;
  status: string;
}

const DUMMY_USERS: User[] = [];

export const generateUsers = (count: number): User[] => {
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
