### Install and Run the Expo application:
```bash
npm install
npx expo start
```
then press the letter as instructed in the terminal console.


### Navigation:

### Tabs (Layout):
Just by Wrapping the layout with `Tabs` will automatically pick all the pages inside of the directory or group-directory `(tabs)`.

```tsx
// (tabs)/_layout.tsx
import React from 'react'
import { Tabs } from 'expo-router'

export default function TabsLayout () {
  return (
    <>
      <Tabs>
        <Tabs.Screen name='home' /> {/* Define First Tab's Position */}
      </Tabs>
    </>
  )
}
```
### Image | React Native & Expo-Image:

### Tabs Customization:
```tsx
import { View, Image, ImageSourcePropType, Text } from 'react-native'
// import {Image, ImageSourcePropType} from ''
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../constants/icons'


const TabIcon = ({ icon, color, name, focused }: { icon: ImageSourcePropType, color: string, name: string, focused: boolean }) => {
  return (
    <View className='justify-center items-center gap-1'>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className='w-6 h-6'
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84
        }
      }}>
      </Tabs>
    </>
  )
}

export default TabsLayout
```


### SafeAreaView | StatusBar | ScrollView:
```jsx
import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'

export default function App() {
  return (
    <SafeAreaView className='bg-primary h-full'  >
      <ScrollView contentContainerStyle={{/* 'height': '100%' */}}>
        <View className="...">
        </View>
      </ScrollView>

      // will show statusbar icon as light color in the dark mode
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}
```