export interface User {
  id?: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export interface AuthInfo {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}
