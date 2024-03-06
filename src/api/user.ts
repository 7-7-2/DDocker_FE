import { authInstance, baseInstance } from '@/api/axiosInterceptor';
import { AuthTypes } from '@/types/types';
import useSetCacheData from '@/hooks/useSetCacheData';

// Social Auth
export const getSocialAuth = async (social: string) => {
  try {
    const res = await baseInstance.get(`users/signIn?social=${social}`);
    // redirect url
    window.location.href = res.data.url;
    await useSetCacheData('user', '/social', res.data.social);
  } catch (error) {
    console.error('Error fetching social authentication:', error);
  }
};

// DDocker AccessToken
export const getAccessToken = async (code: string | null, social: string) => {
  try {
    const res = await baseInstance.get(
      `/users/${social}/redirect?code=${code}`
    );
    await useSetCacheData('user', '/accessToken', res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.error('Error fetching social authentication:', error);
  }
};

// UserInfo
export const getUserInfo = async (userId: string | number) => {
  try {
    const res = await authInstance.get(`/users/${userId}/userInfo`);
    await useSetCacheData('user', '/userInfo', res.data);
  } catch (error) {
    console.log('Error fetching social authentication:', error);
  }
};

// DDocker SignUp
export const setUserInitInfo = async (userInfo: AuthTypes) => {
  try {
    const data = userInfo;
    await authInstance.post('/users', data);
  } catch (error) {
    console.log('Failed to save user initial info on DB', error);
  }
};

// Check Nickname
export const checkNickname = async (nickname: string) => {
  try {
    const res = await baseInstance.get(`/users/check?nickname=${nickname}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

// Profile page posts
export const getUserPosts = async (userId: string, nextPage: number) => {
  try {
    const res = await authInstance.get(`/users/${userId}/posts/${nextPage}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

//  ProFlie Follow Counts
export const getUserFollowCounts = async (userId: string) => {
  try {
    const res = await authInstance.get(`/users/${userId}/follow`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
