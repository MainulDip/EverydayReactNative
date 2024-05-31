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