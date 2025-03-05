import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class serviceDatabase{
    client = new Client()
    constructor(){
        this.client.setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProId)
        this.db = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({slug, title, content, status,featuredImage,userid}){
        try {
            return await this.db.createDocument(conf.appwriteDB, conf.appwriteCollId, slug,
                {
                    title, content, status, featuredImage, userid
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    async updatePost(slug, {title, content, status, featuredImage, userid}){
        try {
            return await this.db.updateDocument(conf.appwriteDB, conf.appwriteCollId, slug, 
                {
                    title, content, status, featuredImage, userid
                }
        )
        } catch (error) {
            throw new Error(error);
        }
    }
    async deletePost(slug){
        try {
             await this.db.deleteDocument(conf.appwriteDB, conf.appwriteCollId, slug)
             return true;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getPost(docId){
        try {
            return await this.db.getDocument(conf.appwriteDB, conf.appwriteCollId, docId)
        } catch (error) {
            throw new Error(error);
        }
    }
    async getPosts(queries =[Query.equal('status',"active")]){
        try {
            return await this.db.listDocuments(conf.appwriteDB, conf.appwriteCollId, queries)
        } catch (error) {
            throw new Error(error);
        }
    }
    async searchDocs(query){
        try {
            return await this.db.listDocuments(conf.appwriteDB, conf.appwriteCollId, query)
        } catch (error) {
            throw new Error(error);
        }
    }

    // Storage Service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(), file)
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
        } catch (error) {
            throw new Error(error);
        }
    }
     getFilePreview(fileId){
        try {
            return this.bucket.getFileView(fileId).href
        } catch (error) {
            throw new Error(error);
        }
    }


}

const Service = new serviceDatabase();
export default Service;




