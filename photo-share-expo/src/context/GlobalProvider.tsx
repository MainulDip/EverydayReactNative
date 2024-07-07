import { View, Text } from 'react-native'
import { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react'
import React from 'react';
import { getCurrentUser, User } from '../lib/appwrite';
import { isLoading } from 'expo-font';
import { Models } from 'react-native-appwrite';
import { Users } from '../lib/entities.dtype';


type Props = { children: React.ReactNode };
type GlobalContextValue = {
  isLoggedIn?: boolean;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: Users;
  setUser?: React.Dispatch<React.SetStateAction<Users>>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextValue>({});

export const useGlobalContext = () => useContext<GlobalContextValue>(GlobalContext);

const GlobalProvider = ({ children }: Props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Users>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getCurrentUser()
      .then(res => {
        if (res) {
          // console.log(res, "from GlobalProvider.tsx")
          setUser({ ...res });
          setIsLoggedIn(true);
        } else {
          setIsLoading(false);
          // setUser(undefined)
          console.log(res)
          throw new Error("GlobalProvider getCurrentUser returned undefined");
        }
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])



  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
      isLoading,
      setIsLoading
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider