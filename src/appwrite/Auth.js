import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
     client = new Client()
    
     constructor(){
        this.client.setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProId)
        this.account = new Account(this.client)
     }
        async login(email, password){
            try {
            return await this.account.createSession(email, password)
                
            } catch (error) {
                throw new Error(error);               
            }

        }
        async logout(){
            try {
            return await this.account.deleteSession('current')
                
            } catch (error) {
                console.log("Appwrite Service Error:: logout():: ", error);
                
            }
        }
        async createAccount(email, password, name){
            try {
                const userAccount = await this.account.create(ID.unique, email, password , name);
                if (userAccount) {
                    return this.login(email, password);
                    
                } else {
                    return userAccount
                }
            } catch (error) {
                throw new Error(error);
            }
        }
        async getCurrentUser(){
            try {
            return await this.account.get()
            } catch (error) {
                console.log("Appwrite Service Error:: getCurrentUser():: ", error);
            }

        }
     
}

const authService = new AuthService();
export default authService;