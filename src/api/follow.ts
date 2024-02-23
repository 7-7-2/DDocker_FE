import { authInstance, baseInstance } from '@/api/axios';

const [API] = [import.meta.env.VITE_BASE_URL];

// 1. 유저 팔로우
export const followUser = async (userId: string) => {
  const res = await authInstance.post(`${API}follow/${userId}`);
  return res.data;
};
// 2. 유저 언팔로우
export const unfollowUser = async (userId: string) => {
  const res = await authInstance.delete(`${API}follow/${userId}`);
  return res.data;
};
// 3. 유저의 팔로잉 목록 확인
export const getFollowingList = async (userId: string) => {
  const res = await authInstance.get(`${API}follow/${userId}/following`);
  return res.data;
};
// 4. 유저의 팔로우 목록 확인
export const getFollowerList = async (userId: string) => {
  const res = await authInstance.get(`${API}follow/${userId}/follower`);
  return res.data;
};
// 5. 프로필 진입시 팔로잉 중인 유저인지 확인
export const checkFollowing = async (userId: string) => {
  const res = await authInstance.get(`${API}follow/${userId}`);
  return res.data;
};
