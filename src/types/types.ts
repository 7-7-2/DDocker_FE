import { TouchEventHandler } from 'react';

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
  accumualted?: number;
  initialized: boolean;
  user: UserTypes;
  signIn: boolean;
}

export interface UserTypes {
  userId: string | undefined;
  email: string | null;
  name: string | null;
  profileUrl?: string | null;
  nickname?: string;
  brand?: string;
  gender?: string;
}

export interface SimplifyUser {
  userId: string | undefined;
  NickName: string | undefined;
  caffeine?: number;
}

export interface SearchBarProps {
  onSearch: () => void;
}

export interface FollowCountProps {
  icons: {
    number?: number;
    label: string;
    onTouchEnd?: (event: TouchEventHandler<HTMLDivElement>) => void;
  }[];
}

export interface LabelProps {
  label: string | undefined;
  message?: string | undefined;
  inputValue?: string | undefined;
  isAlert?: boolean | undefined;
}

export interface InputProps {
  type: string;
  handleEvent?: () => void;
}

export interface BrnadItemProps {
  brand: string;
  icon: string;
}

export interface ButtonProps {
  value?: string;
  text: string;
  onTouchEnd: TouchEventHandler<HTMLButtonElement>;
  className: string;
}

export interface testData {
  Allcaffeine: number;
  coffee: number;
  menu: testMenu[];
}
export interface testMenu {
  icon: string;
  brand: string;
  caffeine: number;
  menuName: string;
}

export interface EmptyUserProps {
  label: string;
  onTouchEnd?: () => void;
}

export interface WeeklyPopularTypes {
  ranking: number;
  brand: string;
}

export interface CachedData {
  cacheData: string;
}

export interface UserCachedData {
  cacheData: AuthTypes;
}

export interface CoffeeItem {
  brand: string;
  name: string;
  caffeine: string;
}

export interface TodayPostTypes {
  brand: string;
  name: string;
  size: string;
  shot: number;
  caffeine: number;
  title: string;
  photo: string;
}

export interface CoffeeData {
  [brand: string]: CoffeeItem[];
}

export interface caffeineFilterTypes {
  caffeine: number;
  menuCaffeine: number;
}

export enum Collections {
  USERS = 'users',
  POSTS = 'posts'
}

export interface EditProfileImgProps {
  onImageSelect: (setProfileImg: File) => void
}