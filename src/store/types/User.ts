export interface IUser {
  id: number;
  login: string;
  email: string;
  avatar: number;
  about?: string;
}

export interface IUserToRegister {
  login: string;
  email: string;
  password: string;
}

export interface IUserToLogin {
  email: string;
  password: string;
}

export interface IUserVerify {
  jwtToken: "string";
  userParsed: IUser
}
