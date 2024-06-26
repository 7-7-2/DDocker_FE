import { authInstance, baseInstance } from '@/api/axiosInterceptor';

// 1. 유저 팔로우
export const followUser = async (userId: string) => {
  const res = await authInstance.post(`/follow/${userId}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
// 2. 유저 언팔로우
export const unfollowUser = async (userId: string) => {
  const res = await authInstance.delete(`/follow/${userId}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
// 3. 유저의 팔로잉 목록 확인
export const getFollowingList = async (userId: string, pageParam: number) => {
  const res = await baseInstance
    .get(`/follow/${userId}/following/${pageParam}`)
    .catch(e => {
      console.log(e);
    });
  const data = res && res.data;
  return {
    data: data.data.results,
    next: data.data.next
  };
};
// 4. 유저의 팔로우 목록 확인
export const getFollowerList = async (userId: string, pageParam: number) => {
  const res = await baseInstance
    .get(`/follow/${userId}/follower/${pageParam}`)
    .catch(e => {
      console.log(e);
    });
  const data = res && res.data;
  return {
    data: data.data.results,
    next: data.data.next
  };
};
// 5. 프로필 진입시 팔로잉 중인 유저인지 확인
export const checkFollowing = async (userId: string) => {
  const res = await authInstance.get(`/follow/${userId}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
// 6. 프로필 진입시 해당 유저 id로 닉네임 확인
export const getUsernameById = async (userId: string) => {
  const res = await baseInstance.get(`/follow/${userId}/username`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
