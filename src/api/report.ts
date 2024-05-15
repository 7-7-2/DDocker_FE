import { authInstance } from '@/api/axiosInterceptor';

// Social Auth
export const postReport = async (postId: string, reportData: {}) => {
  try {
    const res = await authInstance.post(`report/${postId}`, reportData);
    return res && res.data;
  } catch (error) {
    console.error('Error fetching social authentication:', error);
  }
};

export const reportComment = async (commentId: number, reportData: {}) => {
  const res = await authInstance
    .post(`report/comment/${commentId}`, reportData)
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};
