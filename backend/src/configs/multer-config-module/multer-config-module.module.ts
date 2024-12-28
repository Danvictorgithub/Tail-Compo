import { s3_project } from '../s3/s3';
import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';

@Global()
@Module({
  imports: [
    MulterModule.register({
      storage: multerS3({
        s3: s3_project,
        bucket: process.env.S3_BUCKET_NAME || 'files', // Use environment variable for bucket name
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          const uniqueFileName = `${Date.now().toString()}-${file.originalname}`;
          cb(null, uniqueFileName);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the content type
      }),
    }),
  ],
  exports: [MulterModule],
})
export class MulterConfigModuleModule {}
