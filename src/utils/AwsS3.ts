import AWS from 'aws-sdk';
import multer from 'multer';

// AWS S3 configuration
AWS.config.update({
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Define the uploadToS3 function with appropriate types
const uploadToS3 = (file: Express.Multer.File, domain: string, type?: string): Promise<AWS.S3.ManagedUpload.SendData> => {
    // Construct file path with or without type
    const filePath = type ? `${domain}/${type}/-${file.originalname}-${Date.now()}` : `${domain}/desktop/-${file.originalname}-${Date.now()}`;
    
    const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: filePath,
        Body: file.buffer
    };

    return s3.upload(params).promise();
};

export { uploadToS3 };
