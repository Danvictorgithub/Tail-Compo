export function getSupabaseFileName(supabasePublicUrlFile: string): string {
    if (!supabasePublicUrlFile) {
        throw new Error('Invalid URL');
    }

    const urlParts = supabasePublicUrlFile.split('/');
    const fileName = urlParts[urlParts.length - 1];

    if (!fileName) {
        throw new Error('File name not found in URL');
    }

    return fileName;
}