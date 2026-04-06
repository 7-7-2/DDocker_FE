import { authInstance } from "@/api/axiosInterceptor";

//r2 cloud storage upload
export const getPresignedUploadUrl = async (
  dir: string,
  userId: string,
  postId: string = "",
) => {
  const endpoint = `/storage/upload/${dir}/${userId}/${postId}`;

  const signedUrl = await authInstance.get(endpoint).catch((e) => {
    console.log(e);
  });
  return { url: signedUrl && signedUrl.data.data.url };
};

//r2 cloud storage delete
export const getPresignedDeleteUrl = async (
  dir: string,
  userId: string,
  postId: string = "",
) => {
  const endpoint = `/storage/delete/${dir}/${userId}/${postId}`;

  const signedUrl = await authInstance.get(endpoint).catch((e) => {
    console.log(e);
  });
  return { url: signedUrl && signedUrl.data.data.url };
};

export const deleteAllFolderItems = async (dir: string, userId: string) => {
  const res = await authInstance
    .delete(`/storage/folder/${dir}/${userId}`)
    .catch((e) => {
      console.log(e);
    });
  return res;
};
