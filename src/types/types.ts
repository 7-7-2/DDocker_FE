import { SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';
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

export interface AlretMessageProps {
  inputValue: string | undefined;
  type: string | undefined;
  isAlret: boolean;
}

export interface InputProps {
  type: string;
  handleEvent: () => void;
  setInputValue: SetterOrUpdater<string>;
  inputValue: string | undefined;
  btn?: boolean;
}
