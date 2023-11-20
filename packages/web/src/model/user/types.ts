import { Model, Page } from "../common-types";

export interface User extends Model {
  financialEntityId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;
}

export interface UserResponse extends Page {
  content: User[];
}
