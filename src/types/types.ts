import { TouchEventHandler, RefObject, ChangeEvent } from 'react';
import { Dayjs } from 'dayjs';

export enum Collections {
  USERS = 'users',
  POSTS = 'posts',
  COMMENTS = 'comments'
}

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
  profileUrl?: string | null;
  nickname?: string;
  brand?: string;
  gender?: string;
  sum?: number;
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
  userId?: string | undefined;
  nickname: string | undefined;
  caffeine?: number;
  url?: string;
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
  inputRef?: RefObject<HTMLInputElement>;
  inputValue?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  cacheData: { success: 'ok'; data: AuthTypes };
}

export interface CoffeeCachedData {
  cacheData: { success: 'ok'; data: CoffeeInfo };
}

export interface CoffeeInfo {
  caffeineSum: number;
  allCount: number;
  item: [CoffeeInfoItem];
}

export interface CoffeeInfoItem {
  brand: string;
  caffeine: number;
}

export interface CoffeeItem {
  brand: string;
  menu: string;
  caffeine: number;
}

export interface TodayPostTypes {
  brand: string;
  menu: string;
  size: string;
  shot: number;
  caffeine: number;
  post_title: string;
  photo: string | undefined;
}

export interface CoffeeData {
  [brand: string]: CoffeeItem[];
}

export interface caffeineFilterTypes {
  caffeine: number;
  menuCaffeine: number;
}

export interface EditProfileImgProps {
  onImageSelect: (setProfileImg: File) => void;
}

export interface Comment {
  profileUrl: string;
  nickname: string;
  content: string;
  created_at: Dayjs;
  reply_count: number;
  id: number;
}

export interface CommentProto extends Omit<Comment, 'reply_count' | 'id'> {
  comment?: boolean;
  id?: number;
}
export type Reply = Pick<
  Comment,
  'profileUrl' | 'nickname' | 'content' | 'created_at'
>;

export interface FollowingPost extends SimplifyUser {
  sum: number;
  postTitle: string;
  postId: string;
  profileUrl: string;
  createdAt: Dayjs;
  photo: string;
  caffeine: number;
  shot: number;
  menu: string;
  brand: string;
  userId: string;
}

export interface Fetched {
  data: FollowingPost[];
  next: number | undefined;
}

export interface InfinitePosts {
  queryKey: string[];
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<Fetched>;
  initialPageParam: number;
  getNextPageParam: (lastPage: Fetched) => number | undefined;
}

export interface CommentInput {
  parentId: string | number;
  content: string;
}
