### Install and Run the Expo application:
```bash
npm install
npx expo start
```
then press the letter as instructed in the terminal console.


### Device (Emulated) Selection:
For android use `npx expo run:android -d` to get the available device selection option. All the devices in Android Device Manager are available.

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
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  return (
    <SafeAreaView className='bg-primary h-full'  >
          <SafeAreaView className='bg-primary'  >
          // ScrollView with centered content for smaller devices
            <ScrollView className='h-full' contentContainerStyle={{ flexGrow: 1 }}>
              <View className="w-full flex-1 items-center justify-center px-4">
        </View>
      </ScrollView>

      // will show statusbar icon as light color in the dark mode
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}
```

### TypeScript Deeply nested types inline:
```ts

const FormField = ({title, value}: {title: string; value: {email: string; password: string;} }) => {
  return (
    <>
    </>
  )
}
```

### Integrating With Local Appwrite Server with docker-compose:

### NativeWind's FlexBox Layout in Expo/RN | flex vs flex-1 :
The `flex` parameter only supporting a single number/property in RN. So multiple flex property in single declaration (short-hand) will not work.

Using NativeWind, always use single declaration. Don't use `flex-1` type of classes, as it will declare multiple short-hand properties. Use  `flex-grow-$`, `flex-shrink-$` and `flex-basis-$` instead of `flex-$n` all at once to resolve potential layout bugs

Also in RN, some flex defaults are different than Web.
- `flex-direction` is `row` (not `column)
- `alignContent` defaulting to `flex-start` instead of `stretch`, `flexShrink` defaulting to `0` instead of `1`


* Note: `display: flex` is default to all Component (stated by rn docs). It only support `flex` or `none`. No other properties are supported (inline, block, ect are not supported). So specifying `display: flex` is redundant.

### ListView:

### Touchable Opacity:



### Custom Hook With TypeScript Generics:

### Animation with `react-native-animatable`:
Install using `npx expo install react-native-animatable` or `npm install react-native-animatable --save`
Docs https://github.com/oblador/react-native-animatable

### Video Player `expo-av`:
install by `npx expo install expo-av` and docs https://docs.expo.dev/versions/latest/sdk/av/

### FlatList Component:
### FlatList Horizontal and Snapping:

### useRef and useCallBack (also useMemo):
values stored in `useRef` will remain same upon rerender. useRef has an initial value and later can be set by its `current` property. ie, `const intervalRef = useRef(0);`, read the value by `intervalRef.current` and set by `intervalRef.current = something`.

useCallBack is a performance improvement hook, which will cache the result of the callback function, and recalculate again if any specified dependency is changed. But if code fails without `useCallback`, then the problem is in another places 