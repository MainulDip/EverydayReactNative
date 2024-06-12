import { Models } from "react-native-appwrite";

export type PostVideo = {
    $collectionId?: string;
    $createdAt?:    Date | string;
    $databaseId?:   string;
    $id?:           string;
    $permissions?:  any[];
    $updatedAt?:    Date | string;
    prompt?:        string;
    thumbnail?:     string;
    title?:         string;
    users?:         Users;
    video?:         string;
}

export interface Users {
    $collectionId?: string;
    $createdAt?:    Date | string;
    $databaseId?:   string;
    $id?:           string;
    $permissions?:  string[];
    $updatedAt?:    Date | string;
    accountid?:     string;
    avatar?:        string;
    email?:         string;
    username?:      string;
}