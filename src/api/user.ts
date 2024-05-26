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

// DDocker verify membership
export const ddockerSignIn = async (code: string | null, social: string) => {
  try {
    const res = await baseInstance.get(
      `/users/${social}/redirect?code=${code}`
    );
    if (res.status === 200) {
      await useSetCacheData('user', '/accessToken', res.data.accessToken);
      return { accessToken: res.data.accessToken };
    }
    if (res.status === 201) {
      await useSetCacheData('user', '/socialEmail', res.data.socialEmail);
      await useSetCacheData('user', '/socialToken', res.data.socialToken);
      await useSetCacheData('user', '/isRegistering', 'true');
      return { socialEmail: res.data.socialEmail };
    }
  } catch (error) {
    console.error('Error fetching social authentication:', error);
  }
  return;
};

// Unlink Social Auth
export const unlinkSocialauth = async (social: string, token: string) => {
  try {
    await baseInstance.get(`/users/${social}/unlink/${token}`);
  } catch (err) {
    console.error(err);
  }
};

// Delete DDocker User Account
export const deleteUserAccount = async () => {
  try {
    await authInstance.delete('/users');
  } catch (err) {
    console.log(err);
  }
};

// DDocker SignUp
export const setUserInitInfo = async (userInfo: AuthTypes) => {
  try {
    const res = await baseInstance.post('/users', userInfo);
    await useSetCacheData('user', '/accessToken', res.data.data);
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

// UserInfo
export const getUserInfo = async (userId: string | number) => {
  try {
    const res = await baseInstance.get(`/users/${userId}/userInfo`);
    if (userId === 0) {
      await useSetCacheData('user', '/userInfo', res.data);
      return;
    }
    return res.data;
  } catch (error) {
    console.log('Error fetching social authentication:', error);
  }
};

// MyInfo
export const getMyInfo = async () => {
  try {
    const res = await authInstance.get(`/users/userInfo`);
    await useSetCacheData('user', '/userInfo', res.data);
    return res && res.data;
  } catch (error) {
    console.log('Error fetching social authentication:', error);
  }
};

// Profile page posts
export const getUserProfilePosts = async (
  userId: string | undefined,
  nextPage: number
) => {
  try {
    const res = await baseInstance.get(`/users/${userId}/posts/${nextPage}`);
    const resData = res.data;
    return { data: resData.data, next: resData.next };
  } catch (err) {
    console.log(err);
    return;
  }
};

//  Profile Follow Counts
export const getUserFollowCounts = async (userId: string) => {
  try {
    const res = await authInstance.get(`/users/${userId}/follow`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

//Profile edit
export const editProfile = async (editInfo: {}) => {
  try {
    const data = editInfo;
    await authInstance.patch('/users/userInfo', data);
  } catch (error) {
    console.log('Failed to save user initial info on DB', error);
  }
};
