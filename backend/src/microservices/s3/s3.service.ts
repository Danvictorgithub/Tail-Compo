import { DeleteObjectCommand, ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { s3_project } from 'src/configs/s3/s3';
import { getSupabaseFileName } from 'src/helpers/getSupabaseFileName';

@Injectable()
export class S3Service implements OnModuleInit {
    private readonly logger = new Logger(S3Service.name, { timestamp: true });

    private readonly s3Client: S3Client;
    constructor() {
        this.s3Client = s3_project;
    }
    async onModuleInit(): Promise<void> {
        try {
            // Example: Test if the S3 client can list buckets
            await this.s3Client.send(new ListBucketsCommand({}));
            this.logger.log('S3 client initialized successfully.');
        } catch (error) {
            this.logger.error('Failed to initialize S3 client.', error);
            throw new Error('S3 initialization failed. Check your configuration.');
        }
    }

    getClient(): S3Client {
        return this.s3Client;
    }

    async deleteFile(key: string): Promise<void> {
        let filename: string;
        try {
            filename = getSupabaseFileName(key);
        } catch (error) {
            this.logger.error(`Invalid Supabase URL: "${key}".`, error);
            // throw new InternalServerErrorException('Invalid Supabase URL.');
        }

        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME || 'files',
            Key: filename,
        });

        try {
            await this.s3Client.send(command);
            this.logger.log(`File with key "${key}" successfully deleted.`);
        } catch (error) {
            this.logger.error(`Failed to delete file with key "${key}".`, error);
            // throw new InternalServerErrorException('Failed to delete file from S3.');
        }
    }
}
