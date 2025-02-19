const conf ={
    appwriteURL: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProId: String(process.env.process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDB: String(process.env.REACT_APPWRITE_PROJECT_DATABASE_ID),
    appwriteCollId: String(process.env.REACT_APPWRITE_PROJECT_COLECTION_ID),
    appwriteBucketId: String(process.env.REACT_APPWRITE_PROJECT_BUCKET_ID),
}
export default conf;