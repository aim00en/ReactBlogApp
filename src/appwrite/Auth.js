import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
     client = new Client()
     account;
     constructor(){
        this.client.setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProId)
        this.account = new Account(this.client)
     }
     async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
  async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
        async logout(){
            try {
            return await this.account.deleteSession('current')
                
            } catch (error) {
                console.log("Appwrite Service Error:: logout():: ", error);
                
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