import { TouchEvent } from 'react';

export interface LazyRouteType {
  index: boolean;
  path: string;
}
export interface HeaderType {
  logo?: boolean;
  text?: string;
  icon?: string;
}

export interface AuthTypes {
  initialized: boolean;
  user: User | null;
  signIn: boolean;
}

export interface User {
  userId: string | undefined;
  email: string | null;
  name: string | null;
  profileUrl?: string;
}

export enum Collections {
  USERS = 'users',
  CHATS = 'chats',
  MESSAGES = 'message'
}
