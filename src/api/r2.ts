import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  ObjectIdentifier
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${import.meta.env.VITE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY || ''
  }
});

//r2 cloud storage upload, e.g.) /post/${userId}/{postId}, /user/{userId}
export const getPresignedUploadUrl = async (
  instance: S3Client,
  dir: string
) => {
  const signedUrl = await getSignedUrl(
    instance,
    new PutObjectCommand({
      Bucket: import.meta.env.VITE_R2_BUCKET_NAME,
      Key: `assets/${dir}`
    }),
    { expiresIn: 20 }
  );
  return { url: signedUrl };
};

//r2 cloud storage delete, e.g.) /post/${userId}/{postId}, /user/{userId}
export const getPresignedDeleteUrl = async (
  instance: S3Client,
  dir: string
) => {
  const signedUrl = await getSignedUrl(
    instance,
    new DeleteObjectCommand({
      Bucket: import.meta.env.VITE_R2_BUCKET_NAME,
      Key: `assets/${dir}`
    }),
    { expiresIn: 20 }
  );
  return { url: signedUrl };
};

export const deleteAllFolderItems = async (
  instance: S3Client,
  folderPath: string
) => {
  const listObjectsResult = await instance.send(
    new ListObjectsV2Command({
      Bucket: import.meta.env.VITE_R2_BUCKET_NAME,
      Prefix: `assets/${folderPath}`
    })
  );
  const keys: ObjectIdentifier[] | undefined =
    listObjectsResult.Contents &&
    listObjectsResult.Contents.map(item => ({ Key: item.Key }));

  await instance.send(
    new DeleteObjectsCommand({
      Bucket: import.meta.env.VITE_R2_BUCKET_NAME,
      Delete: { Objects: keys }
    })
  );
};
