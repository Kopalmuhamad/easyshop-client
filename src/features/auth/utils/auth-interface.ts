export interface IAuth {
  _id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  role: string;
  isVerified: boolean;
  refreshToken: string;
  emailVerifiedAt: Date;
}

export interface IAuthResponse {
  message: string;
  data: IAuth;
}
