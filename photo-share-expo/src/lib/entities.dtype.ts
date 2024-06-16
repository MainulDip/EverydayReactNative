import { Models } from "react-native-appwrite";

export type PostVideo = {
    $collectionId?: string;
    $createdAt?: Date | string;
    $databaseId?: string;
    $id?: string;
    $permissions?: any[];
    $updatedAt?: Date | string;
    prompt?: string;
    thumbnail?: string;
    title?: string;
    users?: Users;
    video?: string;
}

export interface Users {
    $collectionId?: string;
    $createdAt?: Date | string;
    $databaseId?: string;
    $id?: string;
    $permissions?: string[];
    $updatedAt?: Date | string;
    accountid?: string;
    avatar?: string;
    email?: string;
    username?: string;
}

export const PostVideoKeys = Object.freeze({
    $collectionId: "$collectionId",
    $createdAt: "$createdAt",
    $databaseId: "$databaseId",
    $id: "$id",
    $permissions: "$permissions",
    $updatedAt: "$updatedAt",
    prompt: "prompt",
    thumbnail: "thumbnail",
    title: "title",
    users: "users",
    video: "video",
});

export const UserKeys = Object.freeze({
    $collectionId: "$collectionId",
    $createdAt: "$createdAt",
    $databaseId: "$databaseId",
    $id: "$id",
    $permissions: "$permissions",
    $updatedAt: "$updatedAt",
    accountid: "accountid",
    avatar: "avatar",
    email: "email",
    username: "username",
})