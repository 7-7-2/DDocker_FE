import { authInstance } from '@/api/axiosInterceptor';

// Social Auth
export const postReport = async (postId: string, reportData: {}) => {
  try {
    await authInstance.post(`report/${postId}`, reportData);
  } catch (error) {
    console.error('Error fetching social authentication:', error);
  }
};
