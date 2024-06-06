import { View, Text } from 'react-native'
import {createContext, useContext, useState, useEffect, ReactNode, FC} from 'react'
import React from 'react';
import { User } from '../lib/appwrite';
import { isLoading } from 'expo-font';


type Props = { children: React.ReactNode };

const GlobalContext = createContext({});
export const useGlobalContext = () => useContext(GlobalContext); 

const GlobalProvider = ({ children }: Props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [User, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    }, [])
    


  return (
    <GlobalContext.Provider value={{}}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider