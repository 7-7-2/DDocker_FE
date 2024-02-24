import { authInstance } from "@/api/axiosInterceptor";

// 1. 유저 팔로우
export const followUser = async (userId: string) => {
  const res = await authInstance.post(`/follow/${userId}`);
  return res.data;
};
// 2. 유저 언팔로우
export const unfollowUser = async (userId: string) => {
  const res = await authInstance.delete(`/follow/${userId}`);
  return res.data;
};
// 3. 유저의 팔로잉 목록 확인
export const getFollowingList = async (userId: string) => {
  const res = await authInstance.get(`/follow/${userId}/following`);
  return res.data;
};
// 4. 유저의 팔로우 목록 확인
export const getFollowerList = async (userId: string) => {
  const res = await authInstance.get(`/follow/${userId}/follower`);
  return res.data;
};
// 5. 프로필 진입시 팔로잉 중인 유저인지 확인
export const checkFollowing = async (userId: string) => {
  const res = await authInstance.get(`/follow/${userId}`);
  return res.data;
};
