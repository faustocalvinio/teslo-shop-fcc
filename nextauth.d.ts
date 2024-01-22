import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
   interface Session {
    user:{
        email:string;
        emailVerified?:boolean;
        id:string;
        image?:string;
        name:string;
        role:string;
    } & DefaultSession["user"];
   }
}
