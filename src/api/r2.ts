import { authInstance } from '@/api/axiosInterceptor';

//r2 cloud storage upload, e.g.) /post/${userId}/{postId}, /user/{userId}
export const getPresignedUploadUrl = async (route: string) => {
  const signedUrl = await authInstance
    .get(`/posts/presigned-upload-url/${route}`)
    .catch(e => {
      console.log(e);
    });
  return { url: signedUrl && signedUrl.data.url };
};

//r2 cloud storage delete, e.g.) /post/${userId}/{postId}, /user/{userId}
export const getPresignedDeleteUrl = async (route: string) => {
  const signedUrl = await authInstance
    .get(`/posts/presigned-delete-url/${route}`)
    .catch(e => {
      console.log(e);
    });
  return { url: signedUrl && signedUrl.data.url };
};

export const deleteAllFolderItems = async (folderPath: string) => {
  const signedUrl = await authInstance
    .get(`/posts/presigned-delete-all-url/${folderPath}`)
    .catch(e => {
      console.log(e);
    });
  return signedUrl;
};
