import { S3Client } from '@aws-sdk/client-s3';
import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multerS3 from "multer-s3"

@Global()
@Module({
    imports: [
        MulterModule.register({
            storage: multerS3({
                s3: new S3Client({
                    forcePathStyle: true,
                    region: process.env.S3_REGION,
                    endpoint: process.env.S3_ENDPOINT,
                    credentials: {
                        accessKeyId: process.env.S3_ACCESS_KEY_ID,
                        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                    },
                }),
                bucket: process.env.S3_BUCKET_NAME || 'files', // Use environment variable for bucket name
                metadata: function (req, file, cb) {
                    cb(null, { fieldName: file.fieldname });
                },
                key: function (req, file, cb) {
                    const uniqueFileName = `${Date.now().toString()}-${file.originalname}`
                    const bucketName = process.env.S3_BUCKET_NAME || 'files';
                    // @ts-ignore
                    req.supabasePublicUrl = `${process.env.SUPABASE_PUBLIC_BASE_URL}/${uniqueFileName}`
                    // Include original file name
                    cb(null, uniqueFileName);
                },
                contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the content type
            }),
        }),
    ],
    exports: [MulterModule]
})
export class MulterConfigModuleModule { }
