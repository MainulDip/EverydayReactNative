import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo"


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

// if (!publishableKey) {
//   throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
// }


function InitialLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // check is user is authenticated already, if so, route to chat page
  useEffect(() => {
    if (!isLoaded) return;
    const inTabsGroup = segments[0] === "(tabs)"
    console.log(segments)
    if (isSignedIn && !inTabsGroup) {
      router.replace("/(tabs)/chats"); // not perfect, will throw if mounted before root layout
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn])

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('(tabs)/chats');
    } else if (!isSignedIn) {

      console.log("Directing")
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!loaded) {
    return <Slot />;
  }


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ title: "signUp", headerTitleAlign: 'center' }} />
      <Stack.Screen name="signin" options={{ title: "Login", headerTitleAlign: 'center' }} />
      <Stack.Screen name="verify/[phone]" options={{ title: "Verify", headerTitleAlign: "center", headerBackTitle: "Edit" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {


  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>

  );
}
