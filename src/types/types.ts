import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions
} from '@tanstack/react-query';
import { RefObject, ChangeEvent, MouseEventHandler } from 'react';

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
  sum?: number;
  userId?: string;
  aboutMe?: string | null;
}

export interface ddockerSignInType {
  accessToken?: string;
  socialEmail?: string;
}

export interface InitialformTypes extends AuthTypes {
  useremail?: string;
  social?: string;
}

export interface SimplifyUser {
  userId?: string | undefined;
  nickname?: string | undefined;
  caffeine?: number;
  url?: string;
  keyword?: string;
}

export interface MiniProfileProps extends Omit<SimplifyUser, 'keyword'> {
  post?: boolean;
  mini?: boolean;
}

export interface SearchBarProps {
  search: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  type?: string;
  placeholder?: string;
}

export interface FollowCountProps {
  data: {
    userId: string | undefined;
    postCount: number | undefined;
  };
}

export interface LabelProps {
  label: string | undefined;
  Icon?: boolean | undefined;
  message?: string | undefined;
  inputValue?: string | undefined;
  userAboutMe?: string | null;
}

export interface InputProps {
  type: string;
  handleEvent?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
  inputValue?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface BrnadItemProps {
  brand: string;
  icon: string;
}

export interface ButtonProps {
  value?: string;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className: string;
}

export interface EmptyUserProps {
  label: string;
  onClick?: () => void;
}

export interface WeeklyPopularListTypes {
  [key: string]: WeeklyPopularTypes[];
}
export interface WeeklyPopularTypes {
  brand: string;
  co: number;
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

export interface TodayTakedWaterTypes {
  [key: string]: number;
}

export interface CoffeeDataTypes {
  [brand: string]: CoffeeItemTypes[];
}

export interface RegisterPostTypes {
  brand: string;
  menu: string;
  size: string;
  shot: number;
  intensity: string;
  caffeine: number;
  post_title: string | undefined;
  description: string | null;
  photo: string | undefined;
  postId: string;
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
  postRef: React.RefObject<HTMLDivElement>;
  refetch:
    | ((
        options?: RefetchOptions | undefined
      ) => Promise<
        QueryObserverResult<InfiniteData<FetchedFollowing, unknown>, Error>
      >)
    | undefined;
}

export interface CaffeineFilterTypes {
  caffeine: number;
  menuCaffeine: number;
}

export interface EditProfileImgProps
  extends Omit<ImgRegisterProps, 'isLoading'> {
  profileImg?: string;
}

export interface CommentType {
  profileUrl: string;
  nickname: string;
  content: string;
  created_at: string;
  reply_count: number;
  postNum: string;
  id: number;
  public_id: string;
}

export interface CommentPrototype
  extends Omit<CommentType, 'reply_count' | 'postNum'> {
  comment?: boolean;
  postNum?: string;
  parentCommentId?: number;
}
export type Reply = Pick<
  CommentType,
  'profileUrl' | 'nickname' | 'content' | 'created_at' | 'id' | 'public_id'
>;

export interface FollowingPost extends SimplifyUser {
  sum: number;
  postTitle: string;
  postId: string;
  profileUrl: string;
  createdAt: string;
  photo: string;
  caffeine: number;
  shot: number;
  menu: string;
  brand: string;
  userId: string;
  intensity: string;
  size: number;
}

export interface Fetched {
  data: FollowingPost[];
  next: number | undefined;
}

export interface InfinitePosts {
  queryKey: string[];
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<Fetched>;
  initialPageParam: number;
  getNextPageParam: (
    lastPage: Fetched | FetchedFollowing
  ) => number | undefined;
}
export interface InfiniteFollowList {
  queryKey: string[];
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<FetchedFollowing>;
  initialPageParam: number;
  getNextPageParam: (
    lastPage: Fetched | FetchedFollowing
  ) => number | undefined;
}

export interface InfiniteSearchList {
  queryKey: string[];
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<Fetched>;
  initialPageParam: number;
  getNextPageParam: (
    lastPage: Fetched | FetchedFollowing
  ) => number | undefined;
}

export interface CommentInput {
  parentId: string | number;
  content: string;
}

export interface TabsText {
  [key: string]: string[] | string;
}

export interface CafeDetailTypes {
  brand: string;
  className?: string;
  caffeine?: string | number;
  menu?: string;
  shot?: string | number;
  posts?: boolean;
  intensity?: string;
  size?: number;
  onClick?: () => void;
}

export interface DailyTrendCardProps {
  photo: string;
  brand: string;
  menu: string;
  shot: number;
  caffeine: number;
  postId: string;
}

export interface FetchedFollowing {
  data: SimplifyUser[];
  next: number | undefined;
}

export interface FetchedPosts {
  data: FollowingPost[];
  next: number | undefined;
}

export interface SearchList {
  users: SimplifyUser[];
  search: string;
}

export interface CalendarData {
  day: string;
  caffeineSum: string;
}

export interface ImgCropperProps {
  stencilType?: string;
  aspectRatio: number;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  setImageFile: (file: File) => void;
  setCropperEnabled: (enabled: boolean) => void;
  cropperEnabled: boolean;
  compressImage: (imageFile: File) => Promise<void | File>;
  isLoading: boolean;
}

export type ImgRegisterProps = Omit<
  ImgCropperProps,
  'aspectRatio' | 'setImageFile' | 'compressImage' | 'cropperEnabled'
>;

export interface Notification {
  type: string;
  postId?: string;
  senderId: string;
  nickname: string;
  time: string;
}

export interface NoImgProps {
  url: string;
  comment?: boolean;
  mini?: boolean;
  post?: boolean;
  onClick?: () => void;
  onError?: () => void;
}

export interface NoticesListData {
  postId: string;
  title: string;
  date: string;
}

export interface FAQData extends NoticesListData {
  content: string;
}

export interface NoticeDetailData {
  title: string;
  content: string;
  date: string;
}

export interface ChapterContentsType {
  title: string;
  content: string;
}

export interface ChpaterType {
  chapter: string;
  chapterContents: ChapterContentsType[];
}
