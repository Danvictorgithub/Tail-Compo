export function convertSupabasePublicUrlToS3Url(url: string): string {
    const supabasePrefix = `/storage/v1/object/public/${process.env.S3_BUCKET_NAME}/`;
    const s3Prefix = '/files/';

    if (url.startsWith(supabasePrefix)) {
        return url.replace(supabasePrefix, s3Prefix);
    }
    throw new Error('Invalid Supabase public URL');
}