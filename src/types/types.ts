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
  profileUrl?: string;
  nickname?: string;
  brand?: string;
  gender?: string;
  sum?: number;
  userId?: string;
  aboutMe?: string;
}

export interface SimplifyUser {
  userId?: string | undefined;
  nickname: string | undefined;
  caffeine?: number;
  url?: string;
}

export interface MiniProfile extends SimplifyUser {
  onClick: () => void;
}

export interface SearchBarProps {
  search: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export interface FollowCountProps {
  data: { userId: string | undefined; postCount: number | undefined };
}

export interface LabelProps {
  label: string | undefined;
  message?: string | undefined;
  inputValue?: string | undefined;
  userAboutMe?: string | undefined;
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

export interface TodayCoffeeInfoTypes {
  caffeineSum: number;
  allCount: number;
  item: [TodayCoffeeInfoItemTypes];
}

export interface TodayCoffeeInfoItemTypes {
  brand: string;
  caffeine: number;
}

export interface CoffeeItemTypes {
  brand: string;
  menu: string;
  caffeine: number;
}

export interface CoffeeDataTypes {
  [brand: string]: CoffeeItemTypes[];
}

export interface RegisterPostTypes {
  brand: string;
  menu: string;
  size: string;
  shot: number;
  caffeine: number;
  post_title: string | undefined;
  photo: string | undefined;
}

export interface UserProfileDataTypes {
  allCount: number;
  posts: UserProfilePostsTypes[];
}

export interface UserProfilePostsTypes {
  photo: string;
  postId: string;
}

export interface UserFollowCountsTypes {
  followed: number;
  following: number;
}
export interface PostsGridProps {
  data?: UserProfileDataTypes[];
}
export interface CaffeineFilterTypes {
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

export interface TabsText {
  [key: string]: string[] | string;
}

export interface CafeDetail {
  brand: string;
  className?: string;
  caffeine?: string | number;
  menu?: string;
  shot?: string | number;
  posts?: boolean;
  onTouchEnd?: () => void;
}
