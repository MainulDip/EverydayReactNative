import { Client, Account, ID, Avatars, Databases, Query, Storage, Models } from 'react-native-appwrite';
import { PostVideo, PostVideoKeys, UserKeys } from './entities.dtype';
import { VideoUploadFormFields } from '../app/(tabs)/create';
import * as DocumentPicker from 'expo-document-picker';

export const config = {
    endpoint: "http://192.168.0.9/v1",
    platform: "com.anonymous.photoshareexpo",
    projectId: "665fe9e600112c69318c",
    databaseId: "665fead10000a8557165",
    userCollectionId: "665feaf5000a29e98815",
    videoCollectionId: "665fee24002f276bb311",
    bucketId: "665fef0e003669283d7d",

}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    bucketId
} = config

// export const config = {
//     endpoint: "https://cloud.appwrite.io/v1",
//     platform: "com.anonymous.photoshareexpo",
//     projectId: "665d4c54002c80da3dd7",
//     databaseId: "665d4e9b00324416ef43",
//     userCollectionId: "665d4ed3002ee96f6904",
//     videoCollectionId: "665d4f13002aff7be551",
//     bucketId: "665d526500281896b1f6",

// }

export type User = {
    id?: string;
    username: string;
    email: string;
    password: string;
}


const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);


export const createUser = async ({ username, email, password }: User) => {
    try {
        // Register User
        const newAccount = await account.create(ID.unique(), email, password, username)

        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username);

        const session = await signIn(email, password); // Creation of a session is prohibited when a session is active

        const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
            accountid: newAccount.$id,
            email,
            username,
            avatar: avatarUrl

        });


        console.log("User Created Successfully: ", newUser);
        console.log("And User Is Logged In as Session ID: ", session.$id);

        return newUser;
    } catch (error) {
        console.log(`Error from appwrite.ts : ${(error as Error).message}`);
        throw new Error((error as Error).message); // sending ui alert message
    }

}


export async function signIn(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);

    }
}


export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error(`!currentAccount Error`);
        // console.log("currentAccount.name: ", currentAccount.name)

        const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
            Query.equal(`accountid`, currentAccount.$id)
        ])
        if (!currentUser) throw Error(`!currentUser Error`);

        // console.log(`appwrite.ts getCurrentUser returns: `, currentUser);
        return currentUser.documents[0];

    } catch (error) {
        console.log("appwrite.ts getCurrentUser Error: ", (error as Error).message)
    }
}

export async function getAllPosts(): Promise<PostVideo[]> {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId
        );
        // console.log(post.documents[0]);
        return post.documents;
    } catch (error: any) {
        throw new Error(`getAllPosts Error From Appwrite.ts: ${error}`);
    }
}

export async function getLatestPosts(): Promise<PostVideo[]> {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        );
        // console.log(post.documents[0]);
        return post.documents;
    } catch (error: any) {
        throw new Error(`getLatestPosts Error From Appwrite.ts: ${error}`);
    }
}

export async function searchPost(query: string): Promise<PostVideo[]> {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search(PostVideoKeys.title, query), Query.orderDesc(PostVideoKeys.$createdAt), Query.limit(7)]
        );
        // console.log(post.documents[0]);
        return post.documents;
    } catch (error: any) {
        throw new Error(`getLatestPosts Error From Appwrite.ts:searchPost : ${error}`);
    }
}

export async function getUserPosts(userId: string): Promise<PostVideo[]> {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal(PostVideoKeys.users, userId), Query.orderDesc(PostVideoKeys.$createdAt), Query.limit(7)]
        );
        // console.log(post.documents[0]);
        return post.documents;
    } catch (error: any) {
        throw new Error(`getLatestPosts Error From Appwrite.ts:getUserPosts : ${error}`);
    }
}

export async function logOut() {
    const session_list = await account.listSessions();
    console.log("Sessions: ", `${session_list.sessions[0].$id}`)

    // deleting all sessions
    try {
        if (session_list.total) {
            await account.deleteSessions();
            console.log("Deleting Session: ", `${session_list.sessions[0].$id}`);
            console.log("Logging out called form @appwrite.ts:logOut")
        } else {
            console.log("Not logged in yet");
        }
    } catch (error) {
        throw new Error(`Session deletion error: ${(error as Error).message}`);

    }

}


/**
 * uploading video is 2 steep process
 * 1. Add the video and thumbnail to the storage
 * 2. add database entry to `videos` table, it will require userid with video and image thumbnail url
 * @param videoUploadFormFields 
 */
export async function uploadUserVideoPost(videoUploadFormFields: VideoUploadFormFields, videoPickerInfo: DocumentPicker.DocumentPickerAsset, thumbnailImagePickerInfo: DocumentPicker.DocumentPickerAsset, userID: string) {
    console.log(videoUploadFormFields, userID);

    try {
        // add video to the storage and get the link uri
        const storedVideoInfo = await uploadMediaFileToStorage(videoPickerInfo);
        console.log("uploadUserVideoPost: ", storedVideoInfo);

        // add thumbnail to the storage and get the link uri
        // const storedThumbnailId = await uploadMediaFileToStorage(thumbnailImagePickerInfo);

        // add database entry to videos table
    } catch (error) {

        console.log(error);
    }
}

async function uploadMediaFileToStorage(fileInfo: DocumentPicker.DocumentPickerAsset): Promise<Models.File> {

    try {
        const promise = await storage.createFile(
            bucketId,
            ID.unique(),
            {
                name: fileInfo.name,
                type: fileInfo.mimeType!,
                size: fileInfo.size!,
                uri: fileInfo.uri,
            }
        );
        console.log("promise", promise);
        return promise;
    } catch (error) {
        throw new Error(`Error saving file, error: ${(error as Error).message}`);

    }

    // promise.then((response) => {
    //     console.log(response);
    //     return response
    // }, (error: Error) => {
    //     console.log("Saving File Error", error)
    //     throw new Error(`Error saving file, error: ${error.message}`);
    // })

    // return null;
}


// async function getStoredFileUir(id: string) {
//     const fileUri = await storage.getFile(bucketId, id)
//     try {
//         const fileUri = await storage.getFile(bucketId, id)
//         console.log()
//         return fileUri.$id
//     } catch (error) {
//         throw new Error((error as Error).message);
//     }
// }


// const client = new Client();

// client
//     .setEndpoint(config.endpoint) // Your Appwrite Endpoint
//     .setProject(config.projectId)
//     .setPlatform(config.platform) // YOUR application ID
//     ;

// const account = new Account(client);

// // Register User
// account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
//     .then(function (response) {
//         console.log(response);
//     }, function (error) {
//         console.log(error, ' : custom');
//     });