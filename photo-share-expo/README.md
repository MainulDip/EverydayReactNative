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

Note: Configure `expo-av` 's supplied config plugin to configure various properties that cannot be set at runtime 


```tsx
import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```


### Config Plugins:
Config Plugins are used to add/configure native modules (through `AndroidManifet.xml` and `Info.plist`) that aren't included, by default, or to add any native code that needs to be configured further. It extends the `app.config` or `app.json` and customize the prebuilt process. Docs https://docs.expo.dev/config-plugins/introduction/

* Note: The changes don't take effect until you rebuild the native project (`npx expo run:android/ios`)

Usually packages ship their own Expo config plugin  (to ensure versioning is aligned), like `expo-camera`, etc. For 3rd party plugins see https://github.com/expo/config-plugins?tab=readme-ov-file

* Example Plugin Configuration With `expo-camera` and `expo-av` package 
```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera."
        }
      ],

      [
        "expo-av",
        {
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone."
        }
      ]
    ]
  }
}
```
Create Custom Config Plugin https://docs.expo.dev/config-plugins/plugins-and-mods/

### FlatList Component:
### FlatList Horizontal and Snapping:

### useRef and useCallBack (also useMemo):
values stored in `useRef` will remain same upon rerender. useRef has an initial value and later can be set by its `current` property. ie, `const intervalRef = useRef(0);`, read the value by `intervalRef.current` and set by `intervalRef.current = something`.

useCallBack is a performance improvement hook, which will cache the result of the callback function, and recalculate again if any specified dependency is changed. But if code fails without `useCallback`, then the problem is in another places 









### Screen Orientation:
https://docs.expo.dev/versions/latest/sdk/screen-orientation/

### Expo BackgroundFetch | `npx expo install expo-background-fetch`:
A universal library that provides API for performing background fetch tasks (uses TaskManager Native API under the hood).

https://docs.expo.dev/versions/latest/sdk/background-fetch/

### Deprecated Expo BarCodeScanner | `npx expo install expo-barcode-scanner` | Use `expo-camera` form SDK 51:
It is available both as a standalone library and as an extension for Expo Camera.

https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/
* Use `expo-camera` to achieve this form SDK 51 


### Listing and freeing Already used port:
```sh
# lsof comes preinstalled
lsof -i -P -n | grep LISTEN # -n for `do not use dns name`
sudo lsof -i -P -n | grep LISTEN # will spit out root level port as well

# ss comes preinstalled | best for details and readability
sudo ss -lptn
# or
sudo ss -l -p -t -n # -l listening, -p process , -t tcp , -n numeric 

# `netstat` need to be installed first in linux, windows comes preinstalled
sudo netstat -tulpn | grep LISTEN # to list port
```

Freeing Port
```sh
lsof -i :8081
kill -15 [PID]
kill -9 [PID] # same for linux, mac, win
```

Or using `fuser` in ubuntu


