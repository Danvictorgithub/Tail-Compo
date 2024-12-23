import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { s3_project } from 'src/configs/s3/s3';

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
}
