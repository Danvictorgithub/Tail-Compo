export function getSupabasePublicUrl(fileLocation: string) {
  // Replace S3-style prefix with Supabase public URL prefix
  return fileLocation.replace(
    '/files/',
    `/storage/v1/object/public/${process.env.S3_BUCKET_NAME}/`,
  );
}
