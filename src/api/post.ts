import { authInstance, baseInstance } from '@/api/axiosInterceptor';
import useSetCacheData from '@/hooks/useSetCacheData';
import { TodayPostTypes } from '@/types/types';

// Post 등록
export const setPostRegist = async (postInfo: TodayPostTypes) => {
  try {
    console.log(postInfo);
    const data = postInfo;
    await baseInstance.post('/posts/register', data);
  } catch (error) {
    console.log('Failed to regist post', error);
  }
};

// TodayCoffeeInfo
export const getTodayCoffeeInfo = async () => {
  try {
    const res = await authInstance.get('/coffee');
    await useSetCacheData('user', '/coffee', res.data[0]);
    return res.data[0];
  } catch (error) {
    console.log('Failed to get Today coffee Info', error);
  }
};
