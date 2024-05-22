import { authInstance, baseInstance } from '@/api/axiosInterceptor';

// Report
export const postReport = async (postId: string, reportData: {}) => {
  try {
    const res = await authInstance.post(`support/report/${postId}`, reportData);
    return res && res.data;
  } catch (error) {
    console.error('Error reporting this post: Unable to submit report', error);
  }
};

export const reportComment = async (commentId: number, reportData: {}) => {
  const res = await authInstance
    .post(`support/report/comment/${commentId}`, reportData)
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// Notice & FAQ
export const getSupportList = async (type: string) => {
  const res = await baseInstance.get(`support/${type}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

export const getNoticeDetail = async (postId: string) => {
  const res = await baseInstance.get(`support/notice/${postId}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
