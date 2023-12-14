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

export interface UserProfile {
    id?: number
    loginName: string
    caffeine: number
}

export interface FollowCountProps {
    icons: {
      number?: number;
      label: string;
      onTouchEnd?: (event: TouchEvent<HTMLDivElement>) => void;
    }[];
  }