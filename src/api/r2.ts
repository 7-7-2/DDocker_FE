import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: 'auto',

  endpoint: `https://${import.meta.env.VITE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY || ''
  }
});

//r2 cloud storage upload, e.g.) /post/${userId}/{postId}, /user/{userId}
export const getPresignedUrl = async (dir: string) => {
  console.log('Generating upload URL...');
  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: import.meta.env.VITE_R2_BUCKET_NAME,
      Key: `assets/${dir}`
    }),
    { expiresIn: 60 }
  );
  console.log('🚀 ~ uploadR2 ~ signedUrl:', signedUrl);

  console.log(`Success generating upload URL!`);
  return { url: signedUrl };
};
