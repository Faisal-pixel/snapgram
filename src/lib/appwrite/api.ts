import { ID, Query } from "appwrite";

import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

// Notice we didnt pass in the username, because we dont need the username to be in in the account service in appwrite web.
// But we pass it into saveUserToDB function because we need it in the database.
export async function createUserAccount(user: INewUser) {
    try {
        //Create a new account
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarUrl,
            username: user.username
        });

        return newUser;

    } catch (error) {
        console.error(error);
        return error
    }
}

// This saveUserToDb function saves a user to the database. Receives the user object but we want to set the types ourselves since
// username doesnt exist as a type in the INewUser interface. Because like we said, when we are authenticating, a new user doesnt
// have to have a username. But we want to save the username to the database. So we are going to set the type ourselves.
export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: string;
    username?: string;
}) {

    try {
        // So in other to let appwrite know which exact appwrite database we want to save the user to, we need to pass in the appwriteConfig.databaseId
        // also pass in the appwriteConfig.usersCollectionId. We are also passing in ID.unique() to generate a unique id for the user.
        // and then the user object
        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, ID.unique(), user)
        return newUser;
    } catch (error) {
        console.log(error);
    }

}

export async function signInAccount(user: {email: string; password: string}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getCurrentUser() {
    try {
        // We are getting the current account. That is the account that is currently logged in.
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        // Then we get the currentUsers document from the database by querying for accountId that is equal to the currentAccount.$id
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId,
            [
                Query.equal('accountId', currentAccount.$id)
            ]
        )

        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
    }
}