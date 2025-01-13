// Defaults
export interface IUser {
  uuid: string;
  email: string;
  firstname: string;
  lastname: string;
  avatarUri?: string | null;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type IBackUser = IUser & { password: string };

// Create
export interface ICreateUserPayload {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  admin?: boolean;
}
export type IUpdateUserPayload = Partial<ICreateUserPayload>;
