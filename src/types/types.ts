import {
  RefObject,
  ChangeEvent,
  MouseEventHandler,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react';

export interface LazyRouteType {
  index: boolean;
  path: string;
}
export interface HeaderType {
  left?: string;
  text?: string;
  right?: string;
}

export interface AuthTypes {
  profileUrl?: string;
  nickname?: string;
  brand?: string;
  sum?: number;
  userId?: string;
  aboutMe?: string | null;
  visibility?: number;
}

export interface ddockerSignInType {
  accessToken?: string;
  socialEmail?: string;
}

export interface InitialformTypes extends AuthTypes {
  socialToken?: string;
}

export interface SimplifyUser {
  userId?: string | undefined;
  nickname?: string | undefined;
  caffeineSum?: number;
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
  icon?: boolean;
  message?: string | undefined;
  inputValue?: string | null;
  initValue?: string | null;
}

export interface InputProps {
  type: string;
  handleEvent?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
  inputValue?: string;
  placeholder?: string;
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
  children?: ReactNode;
  disabled?: boolean;
}

export interface EmptyUserProps {
  label: string;
  onClick?: () => void;
}

export interface WeeklyPopularListTypes {
  [key: string]: WeeklyPopularTypes[];
}
export interface WeeklyPopularTypes {
  brandName: string;
  co: number;
}

export interface CachedData {
  cacheData: string;
}

export interface TodayCoffeeInfoTypes {
  todayCaffeine: number;
  todayCups: number;
  items: [TodayCoffeeInfoItemTypes];
}

export interface TodayCoffeeInfoItemTypes {
  brandName: string;
  caffeine: number;
}

export interface CoffeeItemTypes {
  menu: string;
  brand: string;
  caffeine: number;
}

export interface TodayTakedWaterTypes {
  [key: string]: number;
}

export interface CoffeeDataTypes {
  [brand: string]: CoffeeItemTypes[];
}

export interface PostContentsTypes {
  postId: string;
  description: string | null;
  photo: string | null;
  visibility: number;
}

export interface CaffeineIntakeTypes {
  caffeine: number;
  brand: string;
  productName: string;
  size: string;
  intensity: string;
  shot: number;
  intakeId: number;
}
export interface DailyRecordsTypes {
  [key: number]: CaffeineIntakeTypes[];
}

export interface CaffeineHistoryTypes {
  summary: CalendarData[];
  details: DailyRecordsTypes;
}

export interface PostDetailTypes
  extends CaffeineIntakeTypes,
    PostContentsTypes {
  commentCount: number;
  brandId: number;
  createdAt: string;
  likeCount: number;
  profileUrl: string;
  nickname: string;
  userId: string;
  userSum: number;
}

export interface RegisterPostTypes
  extends PostContentsTypes,
    CaffeineIntakeTypes {}

export interface FavoriteMenuTypes extends CaffeineIntakeTypes {
  id: string;
  userId: string;
}

// Img
export interface ImageRegisterProps {
  setImageUrl: Dispatch<SetStateAction<string>>;
  imageUrl: string;
  setCropperEnabled: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export interface ImageCropperProps {
  aspectRatio: number;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  cropperEnabled: boolean;
  compressImage: (imageFile: File) => Promise<void | File>;
}

export interface ImageEditProps {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  setCropperEnabled: Dispatch<SetStateAction<boolean>>;
}
export interface ImageEditCropperProps {
  setImageFile: Dispatch<SetStateAction<File | null>>;
  cropperEnabled: boolean;
  compressImage: (imageFile: File) => Promise<void | File>;
  isLoading: boolean;
}

export interface UserProfileGridDataTypes {
  photo: string;
  postId: string;
  visibility: number;
}

// Post Item Types
export interface UserProfileListDataTypes {
  brand: string;
  brandId: number;
  caffeine: number;
  createdAt: string;
  description: string;
  photo: string | null;
  postId: string;
  productName: string;
  visibility: number;
}

export interface SearchPostListTypes {
  brandName: string;
  commentCount: number;
  createdAt: string;
  description: string;
  likeCount: number;
  photo: string | null;
  postId: string;
  productName: string;
}

export interface PostItemProps {
  item: UserProfileListDataTypes | SearchPostListTypes;
  search?: string;
  handleOnError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export interface UserFollowCountsTypes {
  follower: number;
  following: number;
}
export interface PostsGridProps {
  data?: UserProfileGridDataTypes[];
  postRef: React.RefObject<HTMLDivElement>;
  handleOnError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}
export interface PostsListProps {
  data?: UserProfileListDataTypes[];
  postRef: React.RefObject<HTMLDivElement>;
  handleOnError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export interface CaffeineFilterTypes {
  caffeine: number;
  menuCaffeine: number;
}

export interface EditProfileImgProps
  extends Omit<ImgRegisterProps, 'isLoading'> {
  profileImg?: string;
}

export interface DeleteCommentDataType {
  postId: string;
  commentId: number;
  replyId?: number;
}

export interface CommentType {
  profileUrl: string;
  nickname: string;
  content: string;
  createdAt: string;
  replyCount: number;
  postNum: string;
  id: number;
  userId: string;
}

export interface CommentPrototype extends Omit<CommentType, 'replyCount'> {
  comment?: boolean;
  parentCommentId?: number;
}
export type Reply = Pick<
  CommentType,
  'profileUrl' | 'nickname' | 'content' | 'createdAt' | 'id' | 'userId'
>;

export interface FollowingPost extends SimplifyUser {
  userSum: number;
  description: string;
  postId: string;
  profileUrl: string;
  createdAt: string;
  photo: string;
  caffeine: number;
  shot: number;
  productName: string;
  brand: string;
  userId: string;
  intensity: string;
  size: string;
}

export interface Fetched {
  data: FollowingPost[];
  next: number | undefined;
}

export interface InfinitePosts {
  queryKey: string[];
  queryFn: ({
    pageParam
  }: {
    pageParam: string | number | null;
  }) => Promise<Fetched>;
  initialPageParam: string | number | null;
  getNextPageParam: (
    lastPage: Fetched | FetchedFollowing
  ) => string | number | undefined | null;
}
export interface InfiniteFollowList {
  queryKey: string[];
  queryFn: ({
    pageParam
  }: {
    pageParam: string | number | null;
  }) => Promise<FetchedFollowing>;
  initialPageParam: string | number | null;
  getNextPageParam: (
    lastPage: Fetched | FetchedFollowing
  ) => string | number | undefined | null;
}

export interface InfiniteSearchList {
  queryKey: string[];
  queryFn: ({
    pageParam
  }: {
    pageParam: string | number | null;
  }) => Promise<Fetched>;
  initialPageParam: string | number | null;
  getNextPageParam: (
    lastPage: Fetched | FetchedFollowing
  ) => string | number | undefined | null;
}

export interface CommentInput {
  parentId: string | number;
  content: string;
  postId?: string;
}

export interface TabsText {
  [key: string]: string[] | string;
}

export interface CafeDetailTypes {
  brand: string;
  className?: string;
  caffeine?: string | number;
  productName?: string;
  shot?: string | number;
  posts?: boolean;
  intensity?: string;
  size?: string;
  onClick?: () => void;
}

export interface DailyTrendCardProps extends PostMetaData {
  description: string;
  nickname: string;
  photo: string;
  postId: string;
  profileUrl: string;
  userId: string;
}
export interface PostMetaData {
  commentCount: number;
  likeCount: number;
  createdAt: string;
  visibility?: number;
}

export interface FetchedFollowing {
  data: SimplifyUser[];
  next: number | undefined;
}

export interface FetchedPosts {
  data: FollowingPost[];
  next: number | undefined;
}

export interface SearchUserListProps {
  users: SimplifyUser[];
  search: string;
}
export interface SearchPostListProps {
  posts: SearchPostListTypes[];
  search: string;
  initialCursor: string;
  clickSortBtn: () => void;
}
export interface SearchListTypes {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
  clickSortBtn: () => void;
  results: SimplifyUser[] | SearchPostListTypes[];
  initialCursor: string;
  search: string;
}

export interface CalendarData {
  day: number;
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
  notificationId?: string;
  isRead?: boolean;
  type: string;
  postId?: string;
  senderId: string;
  senderNickname: string;
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

export interface EditInfoType {
  visibility?: number | undefined;
  brand?: string | undefined;
  profileUrl?: string | null;
  nickname?: string | undefined;
  aboutMe?: string | undefined;
}

export interface SEODataItemType {
  title: string;
  pageUrl: string;
  description: string;
}

export interface SEO_DATAType {
  [key: string]: SEODataItemType;
}

export interface PostBodyProps
  extends Pick<FollowingPost, 'description' | 'photo'> {
  onClick: () => void;
}

export interface MonthlyAnalysisDataTypes {
  compraison: {
    caffeine: {
      currentMonth: number;
      previousMonth: number;
      diff: number;
      trend: string;
    };
    cups: {
      currentMonth: number;
      previousMonth: number;
      diff: number;
      trend: string;
    };
  };
  weeks: MonthlyAnalysisWeeksDataType[];
}

export interface MonthlyAnalysisWeeksDataType {
  weekNum: number;
  cups: number;
  caffeineMg: number;
}

export interface circularChartSummaryDataTypes {
  intakeDates: number;
  recommended: number;
  excessive: number;
}

export type RankingDataType = [string, number[]];
