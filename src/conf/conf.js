const conf = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_PROJECT_URL || ''),
    appwriteProId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || ''),
    appwriteDB: String(import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID || ''),
    appwriteCollId: String(import.meta.env.VITE_APPWRITE_PROJECT_COLECTION_ID || ''),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_PROJECT_BUCKET_ID || ''),
};

export default conf;
