import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: "http://192.168.0.9/v1",
    platform: "com.anonymous.photoshareexpo",
    projectId: "665fe9e600112c69318c",
    databaseId: "665fead10000a8557165",
    userCollectionId: "665feaf5000a29e98815",
    videoCollectionId: "665fee24002f276bb311",
    storageId: "665fef0e003669283d7d",

}

// export const config = {
//     endpoint: "https://cloud.appwrite.io/v1",
//     platform: "com.anonymous.photoshareexpo",
//     projectId: "665d4c54002c80da3dd7",
//     databaseId: "665d4e9b00324416ef43",
//     userCollectionId: "665d4ed3002ee96f6904",
//     videoCollectionId: "665d4f13002aff7be551",
//     storageId: "665d526500281896b1f6",

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


export const createUser = async ({ username, email, password }: User) => {
    try {
        // Register User
        const newAccount = await account.create(ID.unique(), email, password, username)

        // if (!newAccount) throw Error

        // const avatarUrl = avatars.getInitials(username);

        // const session = await signIn(email, password); // Creation of a session is prohibited when a session is active

        // const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
        //     accountid: newAccount.$id,
        //     email,
        //     username,
        //     avatar: avatarUrl

        // });

        // return newUser;
    } catch (error) {
        console.log(`Error from appwrite.ts : ${(error as Error).message}`);
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

export async function logOut() {
    const session_list = await account.listSessions();
    console.log("Sessions: ", `${session_list.sessions[0].$id}`)

    // deleting all sessions
    try {
        if (session_list.total) {
            await account.deleteSessions();
            console.log("Deleting Session: ", `${session_list.sessions[0].$id}`);
        } else {
            console.log("Not logged in yet");
        }
    } catch (error) {
        throw new Error(`Session deletion error: ${(error as Error).message}`);

    }

}



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