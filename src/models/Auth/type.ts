export type AuthResponseType = {
  userId: number;
  name: string;
  email: string;
  token: string;
};

export type AuthRequestType = {
  email: string;
  password: string;
};
